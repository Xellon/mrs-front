using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace MrsFront.Controllers
{
    public partial class DataController : ControllerBase
    {
        [HttpGet("[action]")]
        public IEnumerable<Model.Receipt> Receipts(int? userId, bool includePayment = false)
        {
            if (userId is null)
            {
                return includePayment 
                    ? _context.Receipts.Include(r => r.Payment) 
                    : _context.Receipts.AsEnumerable();
            }
                return includePayment
                    ? _context.Receipts.Include(r => r.Payment).Where(r => r.UserId == userId)
                    : _context.Receipts.Where(r => r.UserId == userId);


            //var membershipReceipts = (
            //    from receipt in _context.Receipts
            //    join membership in _context.Memberships
            //        on receipt.MembershipId equals membership.Id
            //    where membership.Id == userId
            //    select receipt);

            //var receiptReceipts = (
            //    from receipt in _context.Receipts
            //    join recommendation in _context.Recommendations
            //        on receipt.RecommendationId equals recommendation.Id
            //    where recommendation.UserId == userId
            //    select receipt);

            //var receipts = membershipReceipts.Concat(receiptReceipts);

            //if (includePayment)
            //{
            //    //.Include() not working for some reason...
            //    return (
            //        from r in receipts
            //        join p in _context.Payments on r.PaymentId equals p.Id
            //        select new Model.Receipt()
            //        {
            //            Id = r.Id,
            //            MembershipId = r.MembershipId,
            //            PaymentAmount = r.PaymentAmount,
            //            PaymentId = r.PaymentId,
            //            ReceiptDate = r.ReceiptDate,
            //            ReceiptType = r.ReceiptType,
            //            RecommendationId = r.RecommendationId,
            //            Payment = p
            //        });
            //}

            //return receipts;
        }

        [HttpGet("[action]")]
        public async Task<Model.Receipt> Receipt(int id, bool includePayment = false)
        {
            var query = _context.Receipts.AsQueryable();

            if (includePayment)
                query = query.Include(receipt => receipt.Payment);

            return await query.FirstOrDefaultAsync(receipt => receipt.Id == id);
        }

        /// <summary>Note: It's already saved to the DB</summary>
        /// <param name="sourceId">Either recommendation or membership Id</param>
        [HttpPost("receipt")]
        public async Task<Model.Receipt> AddReceipt(int userId, int sourceId, Model.ReceiptType receiptType)
        {
            var receipt = new Model.Receipt()
            {
                ReceiptDate = System.DateTime.Now,
                ReceiptType = receiptType,
                UserId = userId,
            };

            switch (receiptType)
            {
                case Model.ReceiptType.ExtraRecommendation:
                    receipt.RecommendationId = sourceId;
                    receipt.PaymentAmount = 1.5;
                    break;
                case Model.ReceiptType.OneTimeRecommendation:
                    receipt.RecommendationId = sourceId;
                    receipt.PaymentAmount = 3;
                    break;
                case Model.ReceiptType.Membership:
                    receipt.MembershipId = sourceId;
                    receipt.PaymentAmount = 5;
                    break;
            }

            _context.Receipts.Attach(receipt);
            await _context.Receipts.AddAsync(receipt);

            await _context.SaveChangesAsync();

            return receipt;
        }

        /// <summary>Note: It's already saved to the DB</summary>
        /// <param name="sourceId">Either recommendation or membership Id</param>
        [HttpPost("receipt/pay")]
        public async Task<Model.Receipt> PayForReceipt(int id)
        {
            var payment = new Model.Payment()
            {
                PaymentDate = DateTime.Now,
                ReceiptId = id
            };

            _context.Payments.Attach(payment);
            await _context.Payments.AddAsync(payment);

            await _context.SaveChangesAsync();

            var receipt = await _context.Receipts.FirstOrDefaultAsync(r => r.Id == id);
            receipt.PaymentId = payment.Id;

            await _context.SaveChangesAsync();

            receipt.Payment = payment;
            return receipt;
        }
    }
}
