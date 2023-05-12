using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MovieRental.Models;

public partial class VideoShopContext : DbContext
{
    public VideoShopContext()
    {
    }

    public VideoShopContext(DbContextOptions<VideoShopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<RentOrder> RentOrders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Trusted_Connection=true;Database=video_shop;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__customer__CD65CB857EBD002D");

            entity.ToTable("customers");

            entity.Property(e => e.CustomerId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("customer_id");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.MovieId).HasName("PK__movies__83CDF7498E49E046");

            entity.ToTable("movies");

            entity.Property(e => e.MovieId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("movie_id");
            entity.Property(e => e.AvailableCopies).HasColumnName("available_copies");
            entity.Property(e => e.Genre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("genre");
            entity.Property(e => e.Rating)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("rating");
            entity.Property(e => e.ReleaseYear).HasColumnName("release_year");
            entity.Property(e => e.RentralPrice)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("rentral_price");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<RentOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__rent_ord__46596229F6E0EA9F");

            entity.ToTable("rent_order");

            entity.Property(e => e.OrderId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("order_id");
            entity.Property(e => e.CustomerId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("customer_id");
            entity.Property(e => e.ItemId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("item_id");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderQuantity).HasColumnName("order_quantity");

            entity.HasOne(d => d.Customer).WithMany(p => p.RentOrders)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rent_orde__custo__4D94879B");

            entity.HasOne(d => d.Item).WithMany(p => p.RentOrders)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rent_orde__item___4CA06362");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
