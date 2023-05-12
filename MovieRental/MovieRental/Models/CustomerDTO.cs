namespace MovieRental.Models
{
    public class CustomerDTO
    {
        public Guid CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<RentOrderDTO> RentOrders { get; set; }
    }

    public class RentOrderDTO
    {
        public Guid OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? OrderQuantity { get; set; }
    }

}
