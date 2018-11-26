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
        public List<Payment> Payments { get; set; }
    }
}
