using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public enum ReceiptType: int
    {
        OneTimeRecommendation,
        Membership,
        ExtraRecommendation,
    }

    public class Receipt
    {
        public int Id { get; set; }

        public int MembershipId { get; set; }
        public Membership Membership { get; set; }

        public int PaymentId { get; set; }
        public Payment Payment { get; set; }

        public int RecommendationId { get; set; }
        public Recommendation Recommendation { get; set; }

        public DateTime ReceiptDate { get; set; }
        public double PaymentAmount { get; set; }
        public ReceiptType ReceiptType { get; set; }
    }
}
