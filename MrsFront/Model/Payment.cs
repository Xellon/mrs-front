using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MrsFront.Model
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ReceiptId { get; set; }
        [JsonIgnore]
        public Receipt Receipt { get; set; }

        public DateTime PaymentDate { get; set; }
    }
}