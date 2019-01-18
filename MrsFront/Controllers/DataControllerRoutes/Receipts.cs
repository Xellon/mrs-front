using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {
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
    }
}
