using System;
using System.Collections.Generic;


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
        public long Value { get; set; }
        public string Label { get; set; }
    }

    public class FilterItemCheckViewModel
    {
        public long Id { get; set; }
        public string Value { get; set; }
        public bool isChecked { get; set; }
    }

    public class FilterItemViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<FilterItemCheckViewModel> Data { get; set; }
    }

    public class HotelListViewModel
    {
        public long Id { get; set; }
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
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
    }

    public class TourAddViewModel
    {
        public long HotelId { get; set; }
        public decimal? Price { get; set; }
        public int? DaysCount { get; set; }
        public DateTime? FromData { get; set; }
        public long CityDepartureId { get; set; }
    }

    public class TourListViewModel
    {
        public long Id { get; set; }
        public int Class { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
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
        public long Id { get; set; }
        public string original { get; set; }
        public string thumbnail { get; set; }
    }

    public class HotelAddViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long RegionId { get; set; }
        public double? Rate { get; set; }
        public decimal? Price { get; set; }
        public int? RoomsCount { get; set; }
        public int Class { get; set; }
        public double? Longtitude { get; set; }
        public double? Latitude { get; set; }
    }

    public class HotelAddPhotoViewModel
    {
        public long HotelId { get; set; }
        public string imageBase64 { get; set; }
    }

    public class ImageItemViewModelNext2
    {
        public long Id { get; set; }
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
        public long[] filters { get; set; }
        public string searchString { get; set; }
    }

    public class SingleTourViewModel
    {
        public long Id { get; set; }
        public int Class { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
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
        public List<HotelPhotoViewModel> Images { get; set; }
    }
    public class SearchModel
    {
        public string typeOfSort { get; set; }
        public string sortByAscending { get; set; }
    }

    public class CountriesViewModel
    {
        public long Id { get; set; }
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
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
