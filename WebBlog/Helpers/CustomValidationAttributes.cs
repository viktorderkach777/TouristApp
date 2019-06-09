using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebBlog.DAL.Entities;

namespace WebBlog.Helpers
{
    public class CustomEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var service = (UserManager<DbUser>)validationContext
                       .GetService(typeof(UserManager<DbUser>));

            var user = service.FindByEmailAsync(value.ToString()).Result;

            // var context = (EFDbContext)validationContext
            //        .GetService(typeof(EFDbContext));

            if (user != null)
            {
                return new ValidationResult(null);
            }
            return ValidationResult.Success;
        }
    }

    public class CustomDateTimeAttribute
    : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            value = (DateTime)value;
            if (DateTime.Parse("1/1/1900").CompareTo(value) <= 0 && DateTime.Now.CompareTo(value) >= 0)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult("Date is out of Range.");
            }
        }
    }

}
