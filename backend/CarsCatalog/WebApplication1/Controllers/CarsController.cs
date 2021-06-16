using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarContext _context;

        public CarsController(CarContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<Car> GetCars()
        {
            return _context.Cars.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Car> GetCar(int id)
        {
            var Car = _context.Cars.Find(id);

            if (Car == null)
            {
                return NotFound();
            }

            return Car;
        }

        [HttpPost]
        public ActionResult<Car> PostCar(Car car)
        {
            _context.Cars.Add(car);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }

        [HttpPut("{id}")]
        public IActionResult PutCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Cars.Update(car);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCar(int id)
        {
            var Car = _context.Cars.Find(id);

            if (Car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(Car);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
