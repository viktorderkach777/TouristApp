using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.ViewModels
{
    public class ParametersViewModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Priority { get; set; }

        public List<ParametersViewModel> Children { get; set; }
    }
}
