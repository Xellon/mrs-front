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
            return _context.Tags;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Receipt> Receipts(int? userId)
        {
            if (userId is null)
                return _context.Receipts;

            var membershipReceipts = _context.Memberships
                .Where(m => m.UserId == userId)
                .Select(m => m.Receipts).ToArray()
                .Aggregate(new List<Model.Receipt>(), (r1, r2) => r1.Concat(r2).ToList());

            var recommendationReceipts = _context.Recommendations
                .Where(m => m.UserId == userId && m.Receipt != null)
                .Select(m => m.Receipt);

            return membershipReceipts.Concat(recommendationReceipts);
        }

        [HttpGet("[action]")]
        public Model.Receipt Receipt(int id)
        {
            return _context.Receipts.FirstOrDefault(r => r.Id == id);
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Movie> Movies()
        {
            return _context.Movies;
        }

        [HttpGet("[action]")]
        public Model.Membership Membership(int userId)
        {
            return _context.Memberships.FirstOrDefault(m => m.UserId == userId);
        }

        [HttpGet("recommendedmovies")]
        public IEnumerable<Model.RecommendedMovie> RecommendedMovies(int userId)
        {
            return _context.Recommendations.Where(r => r.UserId == userId)
                .Join(_context.RecommendedMovies, 
                    r => r.Id,
                    m => m.RecommendationId,
                    (r, m) => m);
        }

        [HttpGet("recommendedmovies/{id}")]
        public IEnumerable<Model.RecommendedMovie> RecommendedMovies([FromRoute]int id, int userId)
        {
            return _context.Recommendations.Where(r => r.UserId == userId && r.Id == id)
                .Join(_context.RecommendedMovies,
                    r => r.Id,
                    m => m.RecommendationId,
                    (r, m) => m);
        }

        [HttpGet("recommendedmovies/latest")]
        public IEnumerable<Model.RecommendedMovie> LatestRecommendedMovies(int userId)
        {
            // TODO: change max id to max date
            var recommendations = _context.Recommendations.Where(r => r.UserId == userId);

            if (!recommendations.Any())
                return new Model.RecommendedMovie[0];

            return _context.RecommendedMovies.Where(m => m.RecommendationId == recommendations.Max(r => r.Id));
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.User> Users(Model.UserTypeEnum? userType)
        {
            if(userType is null)
                return _context.Users;

            return _context.Users.Where(u => u.UserTypeId == (int)userType);
        }

        [HttpGet("usermovies")]
        public IEnumerable<Model.UserMovie> GetUserMovies(int userId)
        {
            return _context.UserMovies.Where(m => m.UserId == userId);
        }

        [HttpPost("usermovies")]
        public IActionResult PostUserMovies([FromBody]IEnumerable<SentUserMovie> userMovies, int userId)
        {
            foreach (var movie in userMovies)
            {
                _context.UserMovies.Add(new Model.UserMovie()
                {
                    UserId = userId,
                    Rating = movie.Rating,
                    MovieId = movie.MovieId
                });
            }

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("usermovies")]
        public IActionResult DeleteUserMovies([FromBody]IEnumerable<SentUserMovie> userMovies, int userId)
        {
            foreach (var movie in userMovies)
            {
                var userMovie = new Model.UserMovie()
                {
                    UserId = userId,
                    MovieId = movie.MovieId
                };

                _context.UserMovies.Attach(userMovie);
                _context.UserMovies.Remove(userMovie);
            }

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult GenerateRecommendations([FromBody]IEnumerable<int> tagIds, int userId)
        {
            var recommendedMovies = (
                from movies in _context.Movies
                join tags in _context.MovieTags on movies.Id equals tags.MovieId
                where tagIds.Contains(tags.TagId)
                select new { movies.Id, Rating = movies.AverageRating,  }
                ).Distinct().OrderByDescending(movie => movie.Rating).Take(10);

            if (recommendedMovies.Count() == 0)
                return BadRequest();

            var recommendation = new Model.Recommendation()
            {
                UserId = userId,
                UsedForMembership = true,
            };
           
            _context.Recommendations.Attach(recommendation);
            _context.Recommendations.Add(recommendation);
            _context.SaveChanges();

            foreach (var movie in recommendedMovies)
            {
                var recommendedMovie = new Model.RecommendedMovie()
                {
                    MovieId = movie.Id,
                    PossibleRating = movie.Rating,
                    RecommendationId = recommendation.Id,
                };

                _context.RecommendedMovies.Attach(recommendedMovie);
                _context.RecommendedMovies.Add(recommendedMovie);
            }

            _context.SaveChanges();

            return Ok(recommendation.Id);
        }
    }
}
