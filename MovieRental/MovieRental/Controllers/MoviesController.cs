using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieRental.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace MovieRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : Controller
    {

        private readonly VideoShopContext videoShopContext;

        public MoviesController(VideoShopContext videoShopContext)
        {
            this.videoShopContext = videoShopContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await videoShopContext.Movies.ToListAsync();
            return Ok(movies);
        }

        //Get Movie using GUID
        [HttpGet("guid")]
        [ActionName("GetMovieId")]
        public async Task<IActionResult> GetMovieById(Guid id)
        {
            var movie = await this.videoShopContext.Movies.FirstOrDefaultAsync(x => x.MovieId == id);
            if (movie != null)
            {
                return Ok(movie);
            }
            return NotFound("Movie not found");
        }

        //Get movie using title
        [HttpGet("title")]
        public async Task<IActionResult> FilterMovieByName(string title)
        {
            var filteredMovie = await this.videoShopContext.Movies.Where(p => p.Title.Contains(title)).ToListAsync();
            return Ok(filteredMovie);
        }

        //Get movie using genre
        [HttpGet("genre")]
        public async Task<IActionResult> FilterMovieByGenre(string genre)
        {
            var filteredMovie = await this.videoShopContext.Movies.Where(p => p.Genre.Contains(genre)).ToListAsync();
            return Ok(filteredMovie);
        }

        //Add new movie
        [HttpPost("addMovie")]
        public async Task<IActionResult> AddNewMovie(Movie movie)
        {
            movie.MovieId = Guid.NewGuid();

            await videoShopContext.Movies.AddAsync(movie);
            await videoShopContext.SaveChangesAsync();
            return Ok();
        }

        //Update Movie details
        [HttpPut("updateMovie/{id}")]
        public async Task<IActionResult> UpdateMovie(Guid id, Movie movie)
        {

            if (id != movie.MovieId)
            {
                return BadRequest();
            }
            videoShopContext.Entry(movie).State = EntityState.Modified;
            await videoShopContext.SaveChangesAsync();
            return NoContent();
        }

        //Delete movie
        [HttpDelete("deleteMovie")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var existingMovie = await this.videoShopContext.Movies.FirstOrDefaultAsync(x => x.MovieId == id);
            if (existingMovie != null)
            {
                videoShopContext.Movies.Remove(existingMovie);
                await videoShopContext.SaveChangesAsync();
                return Ok(existingMovie);
            }
            return NotFound("Customer not found");
        }
    }
}
