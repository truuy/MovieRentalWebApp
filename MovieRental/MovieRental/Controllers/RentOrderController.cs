using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRental.Models;

namespace MovieRental.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly VideoShopContext videoShopContext;

        public OrdersController(VideoShopContext videoShopContext)
        {
            this.videoShopContext = videoShopContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await videoShopContext.RentOrders
                .Include(ro => ro.Customer) // Include the Customer entity
                .Include(ro => ro.Item) // Include the Movie entity
                .ToListAsync();

            var orderData = orders.Select(order => new
            {
                order.OrderId,
                order.OrderDate,
                order.OrderQuantity,
                CustomerName = order.Customer.FirstName + " " + order.Customer.LastName,
                MovieTitle = order.Item.Title
            });

            return Ok(orderData);
        }



        // GET api/orders/movie/{movieId}
        [HttpGet("movie/{movieId}")]
        public async Task<IActionResult> GetOrdersByMovie(Guid movieId)
        {
            // Code for retrieving orders by movie
            var ordersForMovie = await videoShopContext.RentOrders.Where(order => order.ItemId == movieId).ToListAsync();
            return Ok(ordersForMovie);

        }

        // GET api/orders/customer/{customerId}
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomer(Guid customerId)
        {
            // Code for retrieving orders by customer ID
            var ordersForCustomer = await videoShopContext.RentOrders.Where(order => order.CustomerId == customerId).ToListAsync();
            return Ok(ordersForCustomer);
        }

        public class OrderPayload
        {
            public List<OrderDTO> orderModels { get; set; }
        }

        [HttpPost("addOrder")]
        public IActionResult CreateOrder([FromBody] OrderPayload payload)
        {
            if (payload == null || payload.orderModels == null || !payload.orderModels.Any())
            {
                return BadRequest("Invalid order data");
            }

            var newOrders = new List<RentOrder>();

            foreach (var orderModel in payload.orderModels)
            {
                // Validate and process each order
                if (orderModel.ItemId == Guid.Empty || orderModel.CustomerId == Guid.Empty || orderModel.OrderQuantity <= 0)
                {
                    return BadRequest("Invalid order data");
                }

                var newOrder = new RentOrder
                {
                    OrderId = Guid.NewGuid(),
                    ItemId = orderModel.ItemId,
                    CustomerId = orderModel.CustomerId,
                    OrderDate = DateTime.Now,
                    OrderQuantity = orderModel.OrderQuantity
                };

                newOrders.Add(newOrder);
            }

            videoShopContext.RentOrders.AddRange(newOrders);
            videoShopContext.SaveChanges();

            // Decrease the available copies of the rented movies
            foreach (var orderModel in payload.orderModels)
            {
                var movie = videoShopContext.Movies.FirstOrDefault(m => m.MovieId == orderModel.ItemId);
                if (movie != null)
                {
                    movie.AvailableCopies -= orderModel.OrderQuantity;
                }
            }

            videoShopContext.SaveChanges();

            return Ok(newOrders);
        }





        // PUT api/orders/{orderId}
        [HttpPut("updateOrder/{orderId}")]
        public async Task<IActionResult> EditOrder(Guid orderId, OrderDTO orderModel)
        {
            var existingOrder = videoShopContext.RentOrders.FirstOrDefault(order => order.OrderId == orderId);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Update the existing order
            existingOrder.ItemId = orderModel.ItemId;
            existingOrder.CustomerId = orderModel.CustomerId;
            existingOrder.OrderQuantity = orderModel.OrderQuantity;

            // Save the changes to the database
            videoShopContext.SaveChanges();

            return Ok(existingOrder);
        }

        // DELETE api/orders
        [HttpDelete("deleteOrder")]
        public async Task<IActionResult> DeleteOrders([FromBody] List<Guid> orderIds)
        {
            var existingOrders = videoShopContext.RentOrders
                .Include(order => order.Item) // Include the Item (Movie) entity
                .Where(order => orderIds.Contains(order.OrderId))
                .ToList();

            if (existingOrders.Count == 0)
            {
                return NotFound();
            }

            // Get the movie IDs from the existing orders
            var movieIds = existingOrders.Select(order => order.Item.MovieId).Distinct().ToList();

            // Remove the orders from the database
            videoShopContext.RentOrders.RemoveRange(existingOrders);

            // Increment the available copies for each movie
            foreach (var movieId in movieIds)
            {
                var movie = videoShopContext.Movies.FirstOrDefault(m => m.MovieId == movieId);
                if (movie != null)
                {
                    movie.AvailableCopies++; // Increment available copies
                }
            }

            videoShopContext.SaveChanges();

            return Ok();
        }


    }
}
