using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {
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

        [HttpPost("[action]")]
        public IActionResult GenerateRecommendations([FromBody]IEnumerable<int> tagIds, int userId)
        {
            var recommendedMovies = (
                from movies in _context.Movies
                join tags in _context.MovieTags on movies.Id equals tags.MovieId
                where tagIds.Contains(tags.TagId)
                select new { movies.Id, Rating = movies.AverageRating, }
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
