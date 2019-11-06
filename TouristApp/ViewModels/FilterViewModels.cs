using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.ViewModels
{
    public class FValueViewModel
    {
        public string Id { get; set; }
        public string Value { get; set; }
    }
    public class FNameGetViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Children { get; set; }
    }

    public class FNameViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<FValueViewModel> Children { get; set; }
    }

    public class FilterVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class FilterDeleteVM
    {
        public string Id { get; set; }
    }
}
