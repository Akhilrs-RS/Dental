using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using J3Dental.Api.Database;
using System.Threading.Tasks;

namespace J3Dental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly J3DbContext _context;

        public CatalogController(J3DbContext context)
        {
            _context = context;
        }

        // GET: api/catalog/products
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/catalog/services
        [HttpGet("services")]
        public async Task<IActionResult> GetServices()
        {
            var services = await _context.Services.ToListAsync();
            return Ok(services);
        }
    }
}
