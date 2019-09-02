using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.Helpers
{
    public class InitStaticFiles
    {
        public static string CreateFolderServer(IHostingEnvironment env,
            IConfiguration configuration, string[] settings)
        {
            string fileDestDir = env.ContentRootPath;
            foreach (var pathConfig in settings)
            {
                fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
                if (!Directory.Exists(fileDestDir))
                {
                    Directory.CreateDirectory(fileDestDir);
                }
            }
            return fileDestDir;
        }
    }
}
