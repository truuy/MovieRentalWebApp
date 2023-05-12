using System;
using System.Collections.Generic;

namespace MovieRental.Models;

public partial class Customer
{
    public Guid CustomerId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<RentOrder> RentOrders { get; set; } = new List<RentOrder>();
}
