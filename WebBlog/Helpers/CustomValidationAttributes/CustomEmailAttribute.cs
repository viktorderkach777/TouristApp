using Microsoft.AspNetCore.Identity;
using MyCalculation.DAL.Entities;
using System.ComponentModel.DataAnnotations;

namespace MyCalculation.Helpers.CustomValidationAttributes
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
}
