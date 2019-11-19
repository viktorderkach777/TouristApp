
namespace TouristApp.ViewModels
{
    public class KursModel
    {
        public string Ccy { get; set; }
        public string Base_Ccy { get; set; }
        public string Buy { get; set; }
        public string Sale { get; set; }
    }

    public class KursListModel
    {
        public double RUR { get; set; }
        public double USD { get; set; }
        public double EUR { get; set; }
    }
}
