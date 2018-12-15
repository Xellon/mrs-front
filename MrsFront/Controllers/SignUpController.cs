using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MrsFront.Controllers
{
    [Route("api/[controller]")]
    public class SignUpController : ControllerBase
    {
        private Model.SQLiteContext _context;

        public SignUpController(Model.SQLiteContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Index([FromBody]SentUser user)
        {
            if (!(_context.Users.FirstOrDefault(u => u.Email == user.Email) is null))
            {
                Response.StatusCode = 400;
                return Content("User already exists");
            }

            var entry = _context.Users.Add(new Model.User
            {
                Email = user.Email,
                PasswordHash = user.Password,
                UserTypeId = (int)Model.UserTypeEnum.Client,
            });
            
            if(!(user.Movies is null))
            {
                foreach (var movie in user.Movies)
                {
                    _context.UserMovies.Add(new Model.UserMovie
                    {
                        UserId = entry.Entity.Id,
                        MovieId = movie.Id,
                        Rating = movie.Rating,
                    });
                }
            }

            try
            {
                _context.SaveChanges();
            } 
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return new StatusCodeResult(500);
            }
            
            return Ok();
        }

        public struct SentUser
        {
            public string Email;
            public string Password;
            public List<SentMovie> Movies;
        }

        public struct SentMovie
        {
            public int Id;
            public int Rating;
        }
    }
}