using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MrsFront.Model
{
    public class Membership
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UsesLeft { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Receipt> Receipts { get; set; }
    }
}
