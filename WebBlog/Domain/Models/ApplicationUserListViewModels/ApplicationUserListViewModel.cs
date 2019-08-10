using System.Collections.Generic;

namespace MyCalculation.Domain.Models.ApplicationUserListViewModels
{
    public class ApplicationUserListViewModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public IEnumerable<RoleItemViewModel> Roles { get; set; }

        public string FullName { get; set; }

        public string UserImage { get; set; }
    }
}
