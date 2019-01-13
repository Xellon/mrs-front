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
                .Where(m => m.UserId == userId)
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
                    MovieId = movie.Id
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
    }
}
