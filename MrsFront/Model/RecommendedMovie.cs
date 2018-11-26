using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public class RecommendedMovie
    {
        public int RecommendationId { get; set; }
        public int MovieId { get; set; }
        public double PossibleRating { get; set; }

        public Movie Movie { get; set; }
        public Recommendation Recommendation { get; set; }
    }
}
