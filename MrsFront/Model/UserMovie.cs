using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class UserMovie
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public float Rating { get; set; }

        public Movie Movie { get; set; }
    }
}
