﻿using Microsoft.AspNetCore.Http;
using System.Linq;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using TouristApp.Domain.Models.UserProfileGetModels;

namespace TouristApp.Domain.Services
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

        //public void AddUserProfile(string id, CustomRegisterModel model)
       // {
            //string path = _fileService.UploadImage(model.ImageBase64);
            //var userImage = new UserImage
            //{
            //    Id = id,
            //    Path = path
            //};
            //_context.UserImages.Add(userImage);
            //_context.SaveChanges();

            //var userProfile = new UserProfile
            //{
            //    Id = id,
            //    FirstName = model.FirstName,
            //    MiddleName = model.MiddleName,
            //    LastName = model.LastName,
            //    DateOfBirth = model.DateOfBirth
            //};
            //_context.UserProfiles.Add(userProfile);
           // _context.SaveChanges();
        //}

        public UserProfileModel GetUserProfile(string id)
        {
           //var profile = _context.UserProfiles.Where(x => x.Id == id).Select(p => new UserProfileModel
              var profile = _context.Users.Where(x => x.Id == id).Select(p => new UserProfileModel
              {
                DateOfBirth = p.DateOfBirth.ToShortDateString(),
                FirstName = p.FirstName,
                MiddleName = p.MiddleName,
                LastName = p.LastName,
                Email = p.Email
                  //Email = p.User.Email
              }).Single();
            profile.UserImage = GetImageUser(id);
            return profile;
        }
        public string GetImageUser(string id)
        {
            // var image = _context.UserImages.SingleOrDefault(p => p.Id == id);
            var image = _context.Users.SingleOrDefault(p => p.Id == id);
            var imageName = "";
            if (image != null)
                imageName = image.AvatarUrl;
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