using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TouristApp.DAL.Entities
{
    [Table("tblRefreshTokens")]
    public class RefreshToken
    {
        [Key, ForeignKey("User")]
        public long Id { get; set; }

        [Required, StringLength(128)]
        public string Token { get; set; }
        public virtual DbUser User { get; set; }
    }
}
