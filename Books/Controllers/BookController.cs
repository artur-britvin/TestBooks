using AutoMapper;
using Books.BLL.DTOs;
using Books.BLL.Interfaces;
using Books.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Web.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpPost]
        public async Task<IActionResult> AddBooks([FromBody] IEnumerable<BookViewModel> bookViewModels)
        {
            if (!bookViewModels.Any()) return NoContent();

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<BookViewModel, BookDTO>())
                .CreateMapper();

            var bookDTOs = mapper.Map<IEnumerable<BookViewModel>, IEnumerable<BookDTO>>(bookViewModels);

            await _bookService.AddAsync(bookDTOs);
            return Ok();
        }


        [HttpPost("{delete}")]
        public async Task<IActionResult> DeleteBook([FromBody]IEnumerable<BookViewModel> bookViewModels)
        {
            if (!bookViewModels.Any()) return NoContent();

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<BookViewModel, BookDTO>())
                .CreateMapper();
            var bookDTOs = mapper.Map<IEnumerable<BookViewModel>, IEnumerable<BookDTO>>(bookViewModels);

            await _bookService.DeleteAsync(bookDTOs);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var bookDTOs = await _bookService.GetAllAsync();
            if (!bookDTOs.Any()) return NoContent();


            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<BookDTO, BookViewModel>())
                .CreateMapper();
            var bookViewModels = mapper.Map<IEnumerable<BookDTO>, IEnumerable<BookViewModel>>(bookDTOs);
            return Ok(bookViewModels);
        }
    }
}
