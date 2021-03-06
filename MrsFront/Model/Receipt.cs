﻿using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public int? MembershipId { get; set; }
        [JsonIgnore]
        public Membership Membership { get; set; }

        public int? PaymentId { get; set; }
        public Payment Payment { get; set; }

        public int? RecommendationId { get; set; }
        [JsonIgnore]
        public Recommendation Recommendation { get; set; }

        public DateTime ReceiptDate { get; set; }
        public double PaymentAmount { get; set; }
        public ReceiptType ReceiptType { get; set; }
    }
}
