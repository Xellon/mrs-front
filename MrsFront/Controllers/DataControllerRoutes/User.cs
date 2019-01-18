using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {
        [HttpGet("user/all")]
        public IEnumerable<Model.User> Users(Model.UserTypeEnum? userType)
        {
            if (userType is null)
                return _context.Users;

            return _context.Users.Where(u => u.UserTypeId == (int)userType);
        }

        [HttpGet("user")]
        public Model.User GetUser(int userId)
        {
            return _context.Users.FirstOrDefault(u => u.Id == userId);
        }

        [HttpGet("user/movies")]
        public IEnumerable<Model.UserMovie> GetUserMovies(int userId)
        {
            return _context.UserMovies.Where(m => m.UserId == userId);
        }

        [HttpPost("user/movies")]
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

        [HttpDelete("user/movies")]
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
    }
}
