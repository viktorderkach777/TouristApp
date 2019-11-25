using TouristApp.Domain.Models.UserProfileGetModels;

namespace TouristApp.Domain.Interfaces
{
    public interface IUserService
    {
        //void AddUserProfile(string id, CustomRegisterModel model);
        UserProfileModel GetUserProfile(long id);
        string GetImageUser(long id);
        string GetPathImage(string imageName);
    }
}
