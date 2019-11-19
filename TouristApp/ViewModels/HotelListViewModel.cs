using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.ViewModels
{
    public class ImageItemViewModel
    {
        public int Id { get; set; }
        public string BigImage { get; set; }
        public string SmallImage { get; set; }
    }

    public class SelectViewModel
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public class FilterItemCheckViewModel
    {
        public string Id { get; set; }
        public string Value { get; set; } 
        public bool isChecked { get; set; }
    }

    public class FilterItemViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<FilterItemCheckViewModel> Data { get; set; }
    }

   


    public class HotelListViewModel
    {

        public string Id { get; set; }

        public int Class { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    
        public int RoomsCount { get; set; }
               
        public string Region { get; set; }

        public string Country { get; set; }

        public string СityDeparture { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }

        public DateTime? FromData { get; set; }
        public string Date { get; set; }

        public int? DaysCount { get; set; }

    }

    public class HotelSelectListViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
    }

    public class TourAddViewModel
    {
        
        public string HotelId { get; set; }

        public decimal? Price { get; set; }

        public int? DaysCount { get; set; }

        public DateTime? FromData { get; set; }

        public string CityDepartureId { get; set; }
    }

    public class TourListViewModel
    {

        public string Id { get; set; }

        public int Class { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int RoomsCount { get; set; }

        public string Region { get; set; }

        public string Country { get; set; }

        public string СityDeparture { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }

        public DateTime? FromData { get; set; }
        public string Date { get; set; }

        public int? DaysCount { get; set; }
                
        public string ImagePath { get; set; }
    }
        public class HotelPhotoViewModel
        {
            
            public string Id { get; set; }
            public string original { get; set; }
            public string thumbnail { get; set; }

    }


        public class HotelAddViewModel
    {

        
        public string Name { get; set; }

        public string Description { get; set; }

        public string RegionId { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }

        public int? RoomsCount { get; set; }

        public int Class { get; set; }

        public double? Longtitude { get; set; }

        public double? Latitude { get; set; }

    }
    public class HotelAddPhotoViewModel
    {


        public string HotelId { get; set; }

        public string imageBase64 { get; set; }

    }

    public class ImageItemViewModelNext2
    {
        public string Id { get; set; }
        public string original { get; set; }
        public string thumbnail { get; set; }
    }


    public class ToursViewModel
    {
        public List<TourListViewModel> Tours { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }

        public int CountItem { get; set; }
        //public string sortOrder { get; set; }
        //public SearchCountryViewModel Search { get; set; }

    }

    public class ToursListViewModel
    {
        public int CurrentPage { get; set; }
        public string sortOrder { get; set; }
        public string[] filters { get; set; }
        public string searchString { get; set; }

    }
    public class SingleTourViewModel
    {
        public string Id { get; set; }

        public int Class { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int RoomsCount { get; set; }

        public string Region { get; set; }

        public string Country { get; set; }

        public string СityDeparture { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }

        public DateTime? FromData { get; set; }
        public string Date { get; set; }

        public int? DaysCount { get; set; }

        public List<HotelPhotoViewModel> Images {get; set; }

        public List<ParametersViewModel> HotelParametries { get; set; }
    }
    public class SearchModel
    {
        public string typeOfSort { get; set; }
        public string sortByAscending { get; set; }
        

    }
    public class CountriesViewModel
    {

        public string Id { get; set; }
        public string Name { get; set; }

    }


    public class CountriesAddViewModel
    {
        public string Name { get; set; }

    }


    public class CountriesEditViewModel
    {
        public string Name { get; set; }

    }
    public class RegionViewModel
    {

        public string Id { get; set; }
        public string Name { get; set; }

    }
}
