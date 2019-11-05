using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using TouristApp.Domain.Interfaces;
using System.Drawing;
using TouristApp.Helpers;
using System.Drawing.Imaging;
using System.Net;
using TouristApp.DAL.Entities;
using System.Collections.Generic;

namespace TouristApp.Domain.Services
{
    public class FileService : IFileService
    {
        const string USER_IMAGE_PATH = "UserImagesPath";

        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        private readonly EFContext _context;
        private readonly string _fileDestDir;

        public FileService(IHostingEnvironment env, IConfiguration configuration, EFContext context)
        {
            _configuration = configuration;
            _env = env;
            _context = context;
            _fileDestDir = _env.ContentRootPath + _configuration.GetValue<string>(USER_IMAGE_PATH);
        }

        



        public string UploadImage(string base64)
        {           
            string name = Guid.NewGuid().ToString();

            if (!Directory.Exists(_fileDestDir))
            {
                Directory.CreateDirectory(_fileDestDir);
            }

            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            Image image = ImageHelper.FromBase64StringToImage(base64);
            name = Path.ChangeExtension(name, "jpg");
            string path = Path.Combine(_fileDestDir, name);
            image.Save(path, ImageFormat.Jpeg);

            return name;
        }

        public string UploadAccountImage(string accountImagePath)
        {
            using (WebClient webClient = new WebClient())
            {               
                string name = Guid.NewGuid().ToString();

                if (!Directory.Exists(_fileDestDir))
                {
                    Directory.CreateDirectory(_fileDestDir);
                }

                byte[] data = webClient.DownloadData(accountImagePath);
                MemoryStream mem = new MemoryStream(data);
                var image = Image.FromStream(mem);
                name = Path.ChangeExtension(name, "jpg");
                string path = Path.Combine(_fileDestDir, name);
                image.Save(path, ImageFormat.Jpeg);

                return name;
            }
        }

        public void UploadAccountImageIfNotExists(DbUser user, string imagePath)
        {           
            string name = user.AvatarUrl;
            string filePath = Path.Combine(_fileDestDir, name);
            FileInfo fileInf = new FileInfo(filePath);

            if (!fileInf.Exists)
            {
                string pathPicture = UploadAccountImage(imagePath);
                user.AvatarUrl = pathPicture;
                _context.Users.Update(user);
                _context.SaveChanges();
            }
        }

        public bool DeleteImage(string fileName)
        {            
            string path = Path.Combine(_fileDestDir, fileName);
            FileInfo fileInf = new FileInfo(path);

            if (fileInf.Exists)
            {
                fileInf.Delete();                
            }

            return fileInf.Exists;
        }
    }
}
