﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MrsFront.Model;

namespace MrsFront.Migrations
{
    [DbContext(typeof(SQLiteContext))]
    partial class SQLiteContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("MrsFront.Model.Membership", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserId");

                    b.Property<int>("UsesLeft");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Memberships");
                });

            modelBuilder.Entity("MrsFront.Model.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AverageRating");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Movies");

                    b.HasData(
                        new { Id = 1, AverageRating = 9.0, ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/719SFBdxRtL._SY679_.jpg", Title = "Avengers" },
                        new { Id = 2, AverageRating = 9.5, ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg", Title = "Avengers: Infinity War" }
                    );
                });

            modelBuilder.Entity("MrsFront.Model.MovieTag", b =>
                {
                    b.Property<int>("TagId");

                    b.Property<int>("MovieId");

                    b.HasKey("TagId", "MovieId");

                    b.HasIndex("MovieId");

                    b.ToTable("MovieTags");

                    b.HasData(
                        new { TagId = 1, MovieId = 1 },
                        new { TagId = 1, MovieId = 2 },
                        new { TagId = 2, MovieId = 2 }
                    );
                });

            modelBuilder.Entity("MrsFront.Model.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("PaymentDate");

                    b.Property<int>("ReceiptId");

                    b.HasKey("Id");

                    b.HasIndex("ReceiptId")
                        .IsUnique();

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("MrsFront.Model.Receipt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("MembershipId");

                    b.Property<double>("PaymentAmount");

                    b.Property<int?>("PaymentId");

                    b.Property<DateTime>("ReceiptDate");

                    b.Property<int>("ReceiptType");

                    b.Property<int?>("RecommendationId");

                    b.HasKey("Id");

                    b.HasIndex("MembershipId");

                    b.ToTable("Receipts");
                });

            modelBuilder.Entity("MrsFront.Model.Recommendation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ReceiptId");

                    b.Property<bool>("UsedForMembership");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ReceiptId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Recommendations");
                });

            modelBuilder.Entity("MrsFront.Model.RecommendedMovie", b =>
                {
                    b.Property<int>("MovieId");

                    b.Property<int>("RecommendationId");

                    b.Property<double>("PossibleRating");

                    b.HasKey("MovieId", "RecommendationId");

                    b.HasIndex("RecommendationId");

                    b.ToTable("RecommendedMovies");
                });

            modelBuilder.Entity("MrsFront.Model.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.ToTable("Tags");

                    b.HasData(
                        new { Id = 1, Text = "Action" },
                        new { Id = 2, Text = "Drama" },
                        new { Id = 3, Text = "Horror" }
                    );
                });

            modelBuilder.Entity("MrsFront.Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<int?>("MembershipId");

                    b.Property<string>("PasswordHash");

                    b.Property<int>("UserTypeId");

                    b.HasKey("Id");

                    b.HasIndex("UserTypeId");

                    b.ToTable("Users");

                    b.HasData(
                        new { Id = 1, Email = "client", PasswordHash = "client", UserTypeId = 1 },
                        new { Id = 2, Email = "admin", PasswordHash = "admin", UserTypeId = 2 },
                        new { Id = 3, Email = "finance", PasswordHash = "finance", UserTypeId = 3 }
                    );
                });

            modelBuilder.Entity("MrsFront.Model.UserMovie", b =>
                {
                    b.Property<int>("MovieId");

                    b.Property<int>("UserId");

                    b.Property<float>("Rating");

                    b.HasKey("MovieId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserMovies");
                });

            modelBuilder.Entity("MrsFront.Model.UserTagWhish", b =>
                {
                    b.Property<int>("TagId");

                    b.Property<int>("UserId");

                    b.HasKey("TagId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTagWhishes");
                });

            modelBuilder.Entity("MrsFront.Model.UserType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("UserTypes");

                    b.HasData(
                        new { Id = 1, Type = "client" },
                        new { Id = 2, Type = "admin" },
                        new { Id = 3, Type = "finance" }
                    );
                });

            modelBuilder.Entity("MrsFront.Model.Membership", b =>
                {
                    b.HasOne("MrsFront.Model.User", "User")
                        .WithOne("Membership")
                        .HasForeignKey("MrsFront.Model.Membership", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.MovieTag", b =>
                {
                    b.HasOne("MrsFront.Model.Movie", "Movie")
                        .WithMany("Tags")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MrsFront.Model.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.Payment", b =>
                {
                    b.HasOne("MrsFront.Model.Receipt", "Receipt")
                        .WithOne("Payment")
                        .HasForeignKey("MrsFront.Model.Payment", "ReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.Receipt", b =>
                {
                    b.HasOne("MrsFront.Model.Membership", "Membership")
                        .WithMany("Receipts")
                        .HasForeignKey("MembershipId");
                });

            modelBuilder.Entity("MrsFront.Model.Recommendation", b =>
                {
                    b.HasOne("MrsFront.Model.Receipt", "Receipt")
                        .WithOne("Recommendation")
                        .HasForeignKey("MrsFront.Model.Recommendation", "ReceiptId");

                    b.HasOne("MrsFront.Model.User")
                        .WithMany("Recommendations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MrsFront.Model.RecommendedMovie", b =>
                {
                    b.HasOne("MrsFront.Model.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MrsFront.Model.Recommendation", "Recommendation")
                        .WithMany("RecommendedMovies")
                        .HasForeignKey("RecommendationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.User", b =>
                {
                    b.HasOne("MrsFront.Model.UserType", "UserType")
                        .WithMany()
                        .HasForeignKey("UserTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.UserMovie", b =>
                {
                    b.HasOne("MrsFront.Model.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MrsFront.Model.User", "User")
                        .WithMany("UserMovies")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MrsFront.Model.UserTagWhish", b =>
                {
                    b.HasOne("MrsFront.Model.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MrsFront.Model.User", "User")
                        .WithMany("TagWhishes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
