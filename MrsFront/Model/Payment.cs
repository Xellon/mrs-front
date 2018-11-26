using System;

namespace MrsFront.Model
{
    public class Payment
    {
        public int Id { get; set; }
        public int ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}