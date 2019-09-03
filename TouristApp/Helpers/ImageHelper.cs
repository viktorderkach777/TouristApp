using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace TouristApp.Helpers
{
    public static class ImageHelper
    {
        public static Image FromBase64StringToImage(this string base64String)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            MemoryStream memoryStream = new MemoryStream(byteBuffer)
            {
                Position = 0
            };
            Image imgReturn;
            imgReturn = Image.FromStream(memoryStream);
            memoryStream.Close();
            byteBuffer = null;
            memoryStream = null;
            return imgReturn;
        }
    }
}
