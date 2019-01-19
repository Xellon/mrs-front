using Microsoft.EntityFrameworkCore;

namespace MrsFront.Model
{
    public class SQLiteContext : DbContext
    {
        public SQLiteContext(DbContextOptions<SQLiteContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserMovie>()
                .HasKey(c => new { c.MovieId, c.UserId });

            modelBuilder.Entity<UserTagWhish>()
                .HasKey(c => new { c.TagId, c.UserId });

            modelBuilder.Entity<MovieTag>()
                .HasKey(c => new { c.TagId, c.MovieId });

            modelBuilder.Entity<RecommendedMovie>()
                .HasKey(c => new { c.MovieId, c.RecommendationId });

            modelBuilder.Entity<User>()
                .HasOne(user => user.Membership)
                .WithOne(membership => membership.User)
                .HasForeignKey<Membership>(membership => membership.UserId);

            modelBuilder.Entity<Receipt>()
                .HasOne(receipt => receipt.Payment)
                .WithOne(payment => payment.Receipt)
                .HasForeignKey<Payment>(payment => payment.ReceiptId);

            modelBuilder.Entity<Receipt>()
                .HasOne(receipt => receipt.Recommendation)
                .WithOne(recommendation => recommendation.Receipt)
                .HasForeignKey<Recommendation>(recommendation => recommendation.ReceiptId);


            PopulateData(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<UserTagWhish> UserTagWhishes { get; set; }
        public DbSet<MovieTag> MovieTags { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<RecommendedMovie> RecommendedMovies { get; set; }
        public DbSet<UserMovie> UserMovies { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<UserType> UserTypes { get; set; }

        private void PopulateData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 1, Text = "Action" },
                new Tag { Id = 2, Text = "Drama" },
                new Tag { Id = 3, Text = "Horror" });

            PopulateUserData(modelBuilder);
            PopulateMovieData(modelBuilder);
        }

        private void PopulateUserData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "client", PasswordHash = "client", UserTypeId = (int)UserTypeEnum.Client },
                new User { Id = 2, Email = "admin", PasswordHash = "admin", UserTypeId = (int)UserTypeEnum.Admin },
                new User { Id = 3, Email = "finance", PasswordHash = "finance", UserTypeId = (int)UserTypeEnum.Finance },
                new User { Id = 4, Email = "random.user@gmail.com", PasswordHash = "user", UserTypeId = (int)UserTypeEnum.Client });

            modelBuilder.Entity<UserType>().HasData(
                new UserType { Id = (int)UserTypeEnum.Client, Type = "client" },
                new UserType { Id = (int)UserTypeEnum.Admin, Type = "admin" },
                new UserType { Id = (int)UserTypeEnum.Finance, Type = "finance" });

            modelBuilder.Entity<UserMovie>().HasData(
                new UserMovie { MovieId = 1, UserId = 1, Rating = 7 },
                new UserMovie { MovieId = 2, UserId = 1, Rating = 5 });


            modelBuilder.Entity<Recommendation>().HasData(
                new Recommendation { Id = 1, ReceiptId = 1, UserId = 1 },
                new Recommendation { Id = 2, ReceiptId = 2, UserId = 4 });

            modelBuilder.Entity<RecommendedMovie>().HasData(
                new RecommendedMovie { RecommendationId = 1, PossibleRating = 10, MovieId = 1 },
                new RecommendedMovie { RecommendationId = 1, PossibleRating = 9, MovieId = 2 },
                new RecommendedMovie { RecommendationId = 2, PossibleRating = 9, MovieId = 1 });

            modelBuilder.Entity<Receipt>().HasData(
                new Receipt { Id = 1, UserId = 1, RecommendationId = 1, PaymentAmount = 3.0f, PaymentId = 1, ReceiptDate = System.DateTime.Now, ReceiptType = ReceiptType.OneTimeRecommendation },
                new Receipt { Id = 2, UserId = 4, RecommendationId = 2, PaymentAmount = 1.5f, ReceiptDate = System.DateTime.Now + System.TimeSpan.FromHours(1), ReceiptType = ReceiptType.ExtraRecommendation });

            modelBuilder.Entity<Payment>().HasData(
                new Payment { Id = 1, ReceiptId = 1, PaymentDate = System.DateTime.Now + System.TimeSpan.FromHours(10) });
        }


        private void PopulateMovieData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().HasData(
                new Movie
                {
                    Id = 1,
                    Title = "Avengers",
                    AverageRating = 9,
                    ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/719SFBdxRtL._SY679_.jpg"
                },
                new Movie
                {
                    Id = 2,
                    Title = "Avengers: Infinity War",
                    AverageRating = 9.5,
                    ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg"
                });

            modelBuilder.Entity<MovieTag>().HasData(
                new MovieTag { TagId = 1, MovieId = 1 },
                new MovieTag { TagId = 1, MovieId = 2 },
                new MovieTag { TagId = 2, MovieId = 2 });
        }
    }
}
