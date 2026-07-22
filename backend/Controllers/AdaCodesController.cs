using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/ada-codes")]
public class AdaCodesController : ControllerBase
{
    private readonly DentalDbContext _context;

    public AdaCodesController(DentalDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AdaCode>>> GetAdaCodes()
    {
        return await _context.AdaCodes.ToListAsync();
    }
}
