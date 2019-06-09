using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebBlog.Domain.Interfaces;
using System.Drawing;
using WebBlog.Helpers;
using System.Drawing.Imaging;

namespace WebBlog.Domain.Services
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
    }
}
