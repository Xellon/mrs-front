using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace MrsFront.Controllers
{
    [Route("api/[controller]")]
    public partial class DataController : ControllerBase
    {
        private Model.SQLiteContext _context;

        public DataController(Model.SQLiteContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Movie> Movies()
        {
            return _context.Movies;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model.Tag> Tags()
        {
            return _context.Tags;
        }
    }
}
