using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WebBlog.Domain.Models
{
    public class ApplicationUserListViewModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<RoleItemViewModel> Roles { get; set; }
        public string FullName { get; set; }
        public string UserImage { get; set; }
    }


    public class RoleItemViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

}