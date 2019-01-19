using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {

        [HttpGet("user/membership")]
        public async Task<Model.Membership> Membership(int userId)
        {
            return await _context.Memberships
                .Include(m => m.Receipts)
                .FirstOrDefaultAsync(m => m.UserId == userId);
        }

        [HttpGet("user/isMember")]
        public bool IsUserMember(int userId)
        {
            var count = _context.Memberships.Where(m => m.UserId == userId).Count();

            return count > 0 ? true : false;
        }

        [HttpPost("user/membership")]
        public async Task<Model.Membership> AddMembership(int userId)
        {
            if (IsUserMember(userId))
            {
                Response.StatusCode = 400;
                return null;
            }
                

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

            // Add receipt for membership
            var receipt = await AddReceipt(userId, membership.Id, Model.ReceiptType.Membership);

            membership.Receipts.Add(receipt);
            return membership;
        }

        [HttpDelete("user/membership")]
        public async Task<IActionResult> DeleteMembership(int userId)
        {
            if (!IsUserMember(userId))
                return BadRequest();

            var membership = await _context.Memberships.Include(m => m.Receipts).FirstOrDefaultAsync(m => m.UserId == userId);

            foreach (var receipt in membership.Receipts)
            {
                _context.Receipts.Attach(receipt);
                _context.Receipts.Remove(receipt);
            }

            _context.Memberships.Attach(membership);
            _context.Memberships.Remove(membership);

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            user.MembershipId = null;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
