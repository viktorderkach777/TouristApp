using TouristApp.Domain.Models.UserProfileGetModels;

namespace TouristApp.Domain.Interfaces
{
    public interface IUserService
    {
        //void AddUserProfile(string id, CustomRegisterModel model);
        UserProfileModel GetUserProfile(string id);
        string GetImageUser(string id);
        string GetPathImage(string imageName);
    }
}
