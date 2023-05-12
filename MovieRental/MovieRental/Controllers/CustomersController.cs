using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRental.Models;

namespace MovieRental.Controllers
{
    //define to api controller level
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly VideoShopContext videoShopContext;

        //Constructor
        public CustomersController(VideoShopContext videoShopContext)
        {
            this.videoShopContext = videoShopContext;
        }


        //Get All Customers
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await videoShopContext.Customers
                .Include(c => c.RentOrders)
                .Select(c => new CustomerDTO
                {
                    CustomerId = c.CustomerId,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    Phone = c.Phone,
                    Address = c.Address,
                    RentOrders = c.RentOrders.Select(ro => new RentOrderDTO
                    {
                        OrderId = ro.OrderId,
                        OrderDate = ro.OrderDate,
                        OrderQuantity = ro.OrderQuantity
                    }).ToList()
                })
                .ToListAsync();

            return Ok(customers);
        }



        //Get Customer using GUID
        [HttpGet("getByGuid")]
        [ActionName("GetCustomerId")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var customer = await this.videoShopContext.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);
            if (customer != null)
            {
                return Ok(customer);
            }
            return NotFound("Customer not found");
        }

        //Get Customer using name
        [HttpGet("getByName")]
        public async Task<IActionResult> GetCustomerByName(string name)
        {
            var customer = await this.videoShopContext.Customers.FirstOrDefaultAsync(x => x.FirstName == name || x.LastName == name ||
            x.FirstName + " " + x.LastName == name);
            if (customer != null)
            {
                return Ok(customer);
            }
            return NotFound("Customer not found");
        }

        //Add new customer
        [HttpPost("addCustomer")]
        public async Task<IActionResult> AddNewCustomer(Customer customer)
        {
            customer.CustomerId = Guid.NewGuid();

            await videoShopContext.Customers.AddAsync(customer);
            await videoShopContext.SaveChangesAsync();
            return Ok();
        }

        //Update Customer
        [HttpPut("updateCustomer/{id}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, Customer customer)
        {

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }
            videoShopContext.Entry(customer).State = EntityState.Modified;
            await videoShopContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("deleteCustomer")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var existingCustomer = await this.videoShopContext.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);
            if (existingCustomer != null)
            {
                videoShopContext.Customers.Remove(existingCustomer);
                await videoShopContext.SaveChangesAsync();
                return Ok(existingCustomer);
            }
            return NotFound("Customer not found");
        }
    }
}
