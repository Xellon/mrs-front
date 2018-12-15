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

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "client", PasswordHash = "client", UserTypeId = (int)UserTypeEnum.Client },
                new User { Id = 2, Email = "admin", PasswordHash = "admin", UserTypeId = (int)UserTypeEnum.Admin },
                new User { Id = 3, Email = "finance", PasswordHash = "finance", UserTypeId = (int)UserTypeEnum.Finance });

            modelBuilder.Entity<UserType>().HasData(
                new UserType { Id = (int)UserTypeEnum.Client, Type = "client"},
                new UserType { Id = (int)UserTypeEnum.Admin, Type = "admin" },
                new UserType { Id = (int)UserTypeEnum.Finance, Type = "finance" });

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
