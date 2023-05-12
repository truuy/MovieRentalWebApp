using System;
using System.Collections.Generic;

namespace MovieRental.Models;

public partial class Movie
{
    public Guid MovieId { get; set; }

    public string Title { get; set; } = null!;

    public int ReleaseYear { get; set; }

    public string? Genre { get; set; }

    public string? Rating { get; set; }

    public decimal RentralPrice { get; set; }

    public int AvailableCopies { get; set; }

    public virtual ICollection<RentOrder> RentOrders { get; set; } = new List<RentOrder>();
}
