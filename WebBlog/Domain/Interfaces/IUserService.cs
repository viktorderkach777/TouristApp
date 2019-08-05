using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyCalculation.Domain.Models;
using MyCalculation.ViewModels;

namespace MyCalculation.Domain.Interfaces
{
    public interface IUserService
    {
        //void AddUserProfile(string id, CustomRegisterModel model);
        UserProfileModel GetUserProfile(string id);
        string GetImageUser(string id);
        string GetPathImage(string imageName);
    }
}
