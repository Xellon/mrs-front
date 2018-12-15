using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class Membership
    {
        public int Id { get; set; }
        public int UsesLeft { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Receipt> Receipts { get; set; }
    }
}
