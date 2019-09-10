using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.Domain.Interfaces
{
    public interface IFileService
    {
        string UploadImage(string base64);
        string UploadFacebookImage(string facebookPath);
        bool DeleteImage(string fileName);
    }
}
