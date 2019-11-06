FROM microsoft/dotnet:2.2-sdk AS builder
WORKDIR /source
EXPOSE 80
#EXPOSE 443

#RUN apk --no-cache add nodejs nodejs-npm
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY *.csproj .
RUN dotnet restore
COPY ./ ./

RUN dotnet publish "./TouristApp.csproj" --output "./dist" --configuration Release --no-restore
FROM microsoft/dotnet:2.2-aspnetcore-runtime

WORKDIR /app
COPY --from=builder /source/dist .
ENTRYPOINT ["dotnet", "TouristApp.dll"]