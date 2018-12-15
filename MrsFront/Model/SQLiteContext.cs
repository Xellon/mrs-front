using Microsoft.EntityFrameworkCore;

namespace MrsFront.Model
{
    public class SQLiteContext : DbContext
    {
        public SQLiteContext(DbContextOptions<SQLiteContext> options)
            : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserMovie>().HasKey(c => new { c.MovieId, c.UserId });
            modelBuilder.Entity<UserTagWhish>().HasKey(c => new { c.TagId, c.UserId });
            modelBuilder.Entity<MovieTag>().HasKey(c => new { c.TagId, c.MovieId });
            modelBuilder.Entity<RecommendedMovie>().HasKey(c => new { c.MovieId, c.RecommendationId });

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

        private void PopulateData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 0, Text = "Action" },
                new Tag { Id = 1, Text = "Drama" },
                new Tag { Id = 2, Text = "Horror" });
        }
    }
}
