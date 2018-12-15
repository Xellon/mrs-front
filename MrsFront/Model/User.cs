using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public List<UserMovie> UserMovies { get; set; }
        public List<Recommendation> Recommendations { get; set; }
        public List<UserTagWhish> TagWhishes { get; set; }

        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

        public int? MembershipId { get; set; }
        public Membership Membership { get; set; }
    }
}
