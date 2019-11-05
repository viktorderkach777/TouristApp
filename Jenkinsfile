#!groovy

properties([disableConcurrentBuilds()])
pipeline {  
  agent none 
  parameters {
        string(name: 'TestCategory', defaultValue: '', description: 'Enter the testcategory')
  }  
  options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        timestamps()
  }
  environment { 
    IsTriggeredByGit = ''    
    IsTestCategoryLengthEqualsNull=''
    DOCKER_HUB_NAME = 'viktorderkach7777/touristapp'
    WEB_SERVER_IMAGE_NAME = 'crudcore_web:latest'
    TEST_GIT_URL = 'https://github.com/viktorderkach777/FluxDayAutomation.git'

    // Slack configuration
    SLACK_CHANNEL = '#touristapp'
    SLACK_COLOR_DANGER  = '#E01563'
    SLACK_COLOR_INFO    = '#6ECADC'
    SLACK_COLOR_WARNING = '#FFC300'
    SLACK_COLOR_GOOD    = '#3EB991'   
  }

stages {
    stage('Checkout') {
       agent { node { label 'homenode' } }
       steps {         
       script {     
               IsTriggeredByGit = (currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')).toString().equals("[]")
               IsTestCategoryLengthEqualsNull = (params.TestCategory).trim().length() == 0
          }       
          echo "TestCategory = ${params.TestCategory}"       
          echo "IsTriggeredByGit = ${IsTriggeredByGit}"      
          echo "IsTestCategoryLengthEqualsNull = ${IsTestCategoryLengthEqualsNull}"
        }
   }
   stage('Start webapp in test server with docker-compose') {
       agent { node { label 'homenode' } }
       when {           
             expression { return (IsTriggeredByGit == false) || (IsTriggeredByGit == true && (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'dev'))}
            }
       steps {                
                echo 'Start webapp in test server with docker-compose'            
                dir("CRUDCore") {
                    sh "ls -la"
                    sh "hostname"
                    sh "docker-compose up -d --build" 
                   }                                       
            }
   }
    stage('Test without Category; run all tests in test server') {
       agent { node { label 'homenode' } }
       when {                
                expression { return (IsTriggeredByGit == false && IsTestCategoryLengthEqualsNull == true) || (IsTriggeredByGit == true && (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'dev'))}
            }
       steps {
                echo '----Test without Category in master or dev; run all tests in test server-----'           
                   sh "mkdir -p Test" 
                   dir("Test"){
                   git url: "${env.TEST_GIT_URL}"
                   dir("FluxDayAutomation") {                  
                     //sh 'dotnet restore'
                     //sh "dotnet test" 
                     sh "docker build -f WithoutTestParameters/Dockerfile ."                    
                   }                 
              }      
            }
   }
   stage('Test without Category In Master; start webapp with docker-compose in production server') {
       agent { node { label 'ubuntu' } }
       when {         
                expression { return ((IsTriggeredByGit == false && IsTestCategoryLengthEqualsNull == true) || IsTriggeredByGit == true) && env.BRANCH_NAME == 'master'}
            }
       steps {
                echo '----Test without Category In Master; start webapp with docker-compose in production server-----'               
                dir("CRUDCore") {
                    sh "ls -la"
                    sh "hostname"
                    sh "docker-compose up -d --build" 
                   }                                            
            }
   } 
   stage('Test without Category In Master; pushing of the docker image') {
       agent { node { label 'ubuntu' } }
       when {         
                expression { return ((IsTriggeredByGit == false && IsTestCategoryLengthEqualsNull == true) || IsTriggeredByGit == true) && env.BRANCH_NAME == 'master'}
            }
       steps {                             
                echo '----Test without Category In Master; pushing of the docker image-----'
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                    sh """
                    docker login -u $USERNAME -p $PASSWORD
                    """
                    sh """
                    docker tag ${WEB_SERVER_IMAGE_NAME} ${DOCKER_HUB_NAME}:${BUILD_NUMBER}
                    """
                    sh """
                    docker push ${DOCKER_HUB_NAME}:${BUILD_NUMBER}
                    """
                    sh """
                    docker tag ${DOCKER_HUB_NAME}:${BUILD_NUMBER} ${DOCKER_HUB_NAME}:latest
                    """
                    sh """
                    docker push ${DOCKER_HUB_NAME}:latest
                    """
                    sh """
                    docker rmi ${DOCKER_HUB_NAME}:${BUILD_NUMBER}
                    """
                    sh """
                    docker rmi ${DOCKER_HUB_NAME}:latest
                    """
                  }
                  echo "Cleaning-up job workspace of node ubuntu"
                  sh 'docker ps -q -f status=exited | xargs --no-run-if-empty docker rm'
                  sh "docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi"
                  deleteDir()                              
            }
   }
   stage('Test with Category') {
       agent { node { label 'homenode' } }
       when {         
                expression { return IsTriggeredByGit == false && IsTestCategoryLengthEqualsNull == false}
            }
       steps {
                echo '----Test with Category-----'               
                   sh "mkdir -p Test" 
                   dir("Test"){
                   git url: "${env.TEST_GIT_URL}"
                   dir("FluxDayAutomation") {
                      echo '----test of FluxDayAutomation-----'
                      sh "ls -la"
                      sh "pwd"                      
                      //sh 'dotnet restore'
                      //sh "dotnet test --filter TestCategory=${params.TestCategory}"
                      sh "docker build --build-arg variable_name=${params.TestCategory} -f WithTestParameters/Dockerfile ."
                      echo '----end of test of FluxDayAutomation-----'
                 }
              }      
        }
   }
    stage("Clean Workspace of homenode") {
      agent { node { label 'homenode' } }
      steps {
        echo "Cleaning-up job workspace of homenode"
        sh "ls -la"
        dir("CRUDCore") { 
            sh "ls -la"
            sh "hostname"            
            sh "docker-compose down" 
        }  
        sh 'docker ps -q -f status=exited | xargs --no-run-if-empty docker rm'
        sh "docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi"
        deleteDir()
      } 
    }
}
post {
    aborted {
      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_WARNING}",
                 channel: "${env.SLACK_CHANNEL}",
                 message: "*ABORTED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}")
    }
    success {
      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_GOOD}",
                 channel: "${env.SLACK_CHANNEL}",
                 message: "*success:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}")
    } 
    failure {
      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_DANGER}",
                 channel: "${env.SLACK_CHANNEL}",
                 message: "*FAILED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}")
    }    
  }
}
