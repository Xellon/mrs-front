﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MrsFront.Model
{
    public class Recommendation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool UsedForMembership { get; set; }
        public List<RecommendedMovie> RecommendedMovies { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
    }
}
