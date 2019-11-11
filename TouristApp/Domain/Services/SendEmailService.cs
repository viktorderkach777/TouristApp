using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TouristApp.Helpers;

namespace TouristApp.Domain.Services
{
    public static class SendEmailService
    {
        public static void SendInfoStartApp(IConfiguration configuration,
            IHostingEnvironment env)
        {
            try
            {
                string adminEmail = configuration.GetValue<string>("AdminEmail");
                string name = configuration.GetValue<string>("AdminName");
                string text = "Ваш сайт запущено. Можете тестувати.";
                string title = "Запуск сайту";
                string fileDestDir = env.ContentRootPath;
                fileDestDir = Path.Combine(fileDestDir, "EmailForms");
                string fileName = Path.Combine(fileDestDir, "InfoStartApp.html");

                string body = string.Empty;
                using (StreamReader reader = new StreamReader(fileName))
                {
                    var str = string.Empty;
                    do
                    {
                        str = reader.ReadLine();
                        body += str + " ";
                    }
                    while (str != null);
                    //body = reader.ReadToEnd();
                }
                body = body.Replace("{UserName}", name);
                body = body.Replace("{Title}", "Cайт максефект");
                body = body.Replace("{Url}", "https://touristapp.dp.ua/");
                body = body.Replace("{Description}", text);

                string command = $"echo '{body}' | " +
                    $"mail " +
                    $"-a \"Content-type: text/html;\" " +
                    $"-s \"{title} - https://touristapp.dp.ua/\" " +
                    $"{adminEmail}  -aFrom:noreply@touristapp.dp.ua";

                Console.WriteLine($"Send email to Admin {command}");
                var output = command.Bash();
            }
            catch (Exception ex)
            {
                Console.WriteLine("---problem message send Ф---" + ex.Message);
            }

        }
        public static void SendEmailUsers(string email,
            string name, string text)
        {

            //var output = "echo \"Hello\" | mail -s \"Hello Lomakin\" novakvova@gmail.com".Bash();
        }
    }
}
