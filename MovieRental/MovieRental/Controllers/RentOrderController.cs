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

        // GET api/orders/movie/{movieId}
        [HttpGet("movie/{movieId}")]
        public IActionResult GetOrdersByMovie(Guid movieId)
        {
            // Code for retrieving orders by movie
            var ordersForMovie = videoShopContext.RentOrders.Where(order => order.ItemId == movieId).ToList();
            return Ok(ordersForMovie);

        }

        // GET api/orders/customer/{customerId}
        [HttpGet("customer/{customerId}")]
        public IActionResult GetOrdersByCustomer(Guid customerId)
        {
            // Code for retrieving orders by customer ID
            var ordersForCustomer = videoShopContext.RentOrders.Where(order => order.CustomerId == customerId).ToList();
            return Ok(ordersForCustomer);
        }

        // POST api/orders
        [HttpPost]
        public IActionResult CreateOrder(OrderDTO orderModel)
        {
            if (ModelState.IsValid)
            {
                // Create a new RentOrder instance
                var newOrder = new RentOrder
                {
                    OrderId = Guid.NewGuid(),
                    ItemId = orderModel.ItemId,
                    CustomerId = orderModel.CustomerId,
                    OrderDate = DateTime.Now,
                    OrderQuantity = orderModel.OrderQuantity
                };

                // Save the new order to the database
                videoShopContext.RentOrders.Add(newOrder);
                videoShopContext.SaveChanges();

                return Ok(newOrder);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
