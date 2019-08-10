using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using MyCalculation.Domain.Interfaces;
using System.Drawing;
using MyCalculation.Helpers;
using System.Drawing.Imaging;
using System.Net;

namespace MyCalculation.Domain.Services
{
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public FileService(IHostingEnvironment env, IConfiguration configuration)
        {
            _configuration = configuration;
            _env = env;
        }

        public string UploadImage(string base64)
        {
            string webRootPath = _env.ContentRootPath;
            string fileDestDir = webRootPath + _configuration.GetValue<string>("UserImagesPath");
            string name = Guid.NewGuid().ToString();

            if (!Directory.Exists(fileDestDir))
            {
                Directory.CreateDirectory(fileDestDir);
            }

            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            Image image = ImageHelper.FromBase64StringToImage(base64);
            name = Path.ChangeExtension(name, "jpg");
            string path = Path.Combine(fileDestDir, name);
            image.Save(path, ImageFormat.Jpeg);

            return name;
        }

        public string UploadFacebookImage(string facebookImagePath)
        {
            using (WebClient webClient = new WebClient())
            {
                string webRootPath = _env.ContentRootPath;
                string fileDestDir = webRootPath + _configuration.GetValue<string>("UserImagesPath");
                string name = Guid.NewGuid().ToString();

                if (!Directory.Exists(fileDestDir))
                {
                    Directory.CreateDirectory(fileDestDir);
                }

                byte[] data = webClient.DownloadData(facebookImagePath);
                MemoryStream mem = new MemoryStream(data);
                var image = Image.FromStream(mem);
                name = Path.ChangeExtension(name, "jpg");
                string path = Path.Combine(fileDestDir, name);
                image.Save(path, ImageFormat.Jpeg);

                return name;
            }
        }
    }
}
