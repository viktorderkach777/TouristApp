using System;
using System.ComponentModel.DataAnnotations;

namespace MyCalculation.Helpers.CustomValidationAttributes
{
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
