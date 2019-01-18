namespace MrsFront.Model
{
    public class UserTagWhish
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }

    }
}
