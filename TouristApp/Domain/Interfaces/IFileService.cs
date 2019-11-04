using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TouristApp.DAL.Entities;

namespace TouristApp.Domain.Interfaces
{
    public interface IFileService
    {
        string UploadImage(string base64);
        string UploadAccountImage(string accountImagePath);
        bool DeleteImage(string fileName);
        void UploadAccountImageIfNotExists(DbUser user, string imagePath);
    }
}
