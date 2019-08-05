using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCalculation.Domain.Interfaces
{
    public interface IFileService
    {
        string UploadImage(string base64);
    }
}
