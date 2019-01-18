using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {

        [HttpGet("user/membership")]
        public Model.Membership Membership(int userId)
        {
            return _context.Memberships.FirstOrDefault(m => m.UserId == userId);
        }

        [HttpGet("user/isMember")]
        public bool IsUserMember(int userId)
        {
            var count = _context.Memberships.Where(m => m.UserId == userId).Count();

            return count > 0 ? true : false;
        }

        [HttpPost("user/isMember")]
        public async Task<IActionResult> AddMembership(int userId)
        {
            if (IsUserMember(userId))
                return BadRequest();

            var membership = new Model.Membership()
            {
                UserId = userId,
                UsesLeft = 0
            };

            _context.Memberships.Attach(membership);
            await _context.Memberships.AddAsync(membership);

            await _context.SaveChangesAsync();

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            user.MembershipId = membership.Id;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("user/isMember")]
        public async Task<IActionResult> DeleteMembership(int userId)
        {
            if (!IsUserMember(userId))
                return BadRequest();

            var membership = _context.Memberships.FirstOrDefault(m => m.UserId == userId);

            _context.Memberships.Attach(membership);
            _context.Memberships.Remove(membership);

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            user.MembershipId = null;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
