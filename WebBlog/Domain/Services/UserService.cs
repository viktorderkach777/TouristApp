using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBlog.DAL.Entities;
using WebBlog.Domain.Interfaces;
using WebBlog.Domain.Models;
using WebBlog.ViewModels;

namespace WebBlog.Domain.Services
{
    public class UserService : IUserService
    {
        readonly EFContext _context;
        readonly IFileService _fileService;
        public UserService(IFileService fileService,
            EFContext context)
        {
            _fileService = fileService;
            _context = context;
        }
        public void AddUserProfile(string id, CustomRegisterModel model)
        {
            string path = _fileService.UploadImage(model.ImageBase64);
            var userImage = new UserImage
            {
                Id = id,
                Path = path
            };
            _context.UserImages.Add(userImage);
            _context.SaveChanges();

            var userProfile = new UserProfile
            {
                Id = id,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                DateOfBirth = model.DateOfBirth
            };
            _context.UserProfiles.Add(userProfile);
            _context.SaveChanges();
        }
        public UserProfileModel GetUserProfile(string id)
        {
            var profile = _context.UserProfiles.Where(x => x.Id == id).Select(p => new UserProfileModel
            {
                DateOfBirth = p.DateOfBirth.ToShortDateString(),
                FirstName = p.FirstName,
                MiddleName = p.MiddleName,
                LastName = p.LastName,
                Email = p.User.Email
            }).Single();
            profile.UserImage = GetImageUser(id);
            return profile;
        }
        public string GetImageUser(string id)
        {
            var image = _context.UserImages.SingleOrDefault(p => p.Id == id);
            var imageName = "";
            if (image != null)
                imageName = image.Path;
            HttpContextAccessor httpContext = new HttpContextAccessor();
            var Current = httpContext.HttpContext;
            var path = $"{Current.Request.Scheme}://{Current.Request.Host}{Current.Request.PathBase}" + "/UserImages/" + imageName;
            return path;
        }

        public string GetPathImage(string imageName)
        {
            if (imageName==null)
            {
                imageName = "no_image.jpg";
            }
            HttpContextAccessor httpContext = new HttpContextAccessor();
            var Current = httpContext.HttpContext;
            var path = $"{Current.Request.Scheme}://{Current.Request.Host}{Current.Request.PathBase}" + "/UserImages/" + imageName;
            return path;
        }
    }
}