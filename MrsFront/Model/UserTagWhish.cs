using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class UserTagWhish
    {
        public int UserId { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
        public User User { get; set; }
    }
}
