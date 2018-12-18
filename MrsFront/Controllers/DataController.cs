using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MrsFront.Controllers
{
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private Model.SQLiteContext _context;

        public DataController(Model.SQLiteContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Tag> Tags()
        {
            return _context.Tags.ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Movie> Movies()
        {
            return _context.Movies.ToList();
        }

        [HttpGet("[action]")]
        public Model.Membership Membership(int userId)
        {
            return _context.Memberships.FirstOrDefault(m => m.UserId == userId);
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.RecommendedMovie> RecommendedMovies()
        {
            // return _context.RecommendedMovies.ToList();
            return new List<Model.RecommendedMovie>()
            {
                new Model.RecommendedMovie()
                {
                    Movie = new Model.Movie()
                    {
                        Title = "Boy adventures",
                        AverageRating = 5
                    },
                    PossibleRating = 9
                    
                },
                new Model.RecommendedMovie()
                {
                    Movie = new Model.Movie()
                    {
                        Title = "Tiny avengers",
                        AverageRating = 9
                    },
                    PossibleRating = 10

                }
            };
        }
    }
}
