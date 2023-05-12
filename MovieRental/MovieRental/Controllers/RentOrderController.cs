﻿using System;
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

        // GET api/orders
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await videoShopContext.RentOrders.ToListAsync();
            return Ok(orders);
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

        // POST api/orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDTO orderModel)
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

        // PUT api/orders/{orderId}
        [HttpPut("{orderId}")]
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

        // DELETE api/orders/{orderId}
        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(Guid orderId)
        {
            var existingOrder = videoShopContext.RentOrders.FirstOrDefault(order => order.OrderId == orderId);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Remove the order from the database
            videoShopContext.RentOrders.Remove(existingOrder);
            videoShopContext.SaveChanges();

            return Ok();
        }
    }
}
