using System;
using System.Collections.Generic;

namespace MovieRental.Models;

public partial class RentOrder
{
    public Guid OrderId { get; set; }

    public Guid ItemId { get; set; }

    public Guid CustomerId { get; set; }

    public DateTime? OrderDate { get; set; }

    public int? OrderQuantity { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Movie Item { get; set; } = null!;
}
