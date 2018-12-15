using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class Recommendation
    {
        public int Id { get; set; }
        public bool UsedForMembership { get; set; }
        public List<RecommendedMovie> RecommendedMovies { get; set; }

        public int? ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
    }
}
