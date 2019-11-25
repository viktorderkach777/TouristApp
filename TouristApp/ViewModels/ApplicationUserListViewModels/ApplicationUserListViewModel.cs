using System.Collections.Generic;

namespace TouristApp.Domain.Models.ApplicationUserListViewModels
{
    public class ApplicationUserListViewModel
    {
        public long Id { get; set; }

        public string Email { get; set; }

        public IEnumerable<RoleItemViewModel> Roles { get; set; }

        public string FullName { get; set; }

        public string UserImage { get; set; }
    }
}
