using AutoMapper;
using Books.BLL.DTOs;
using Books.BLL.Interfaces;
using Books.Common.Exceptions;
using Books.DAL.Entities;
using Books.DAL.UnitOfWork;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.BLL.Services
{
    public class BookService : IBookService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BookService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddAsync(IEnumerable<BookDTO> bookDTOs)
        {
            var mapper = new MapperConfiguration(cfg =>
                cfg.CreateMap<BookDTO, Book>())
                .CreateMapper();

            var books = mapper.Map<IEnumerable<BookDTO>, IEnumerable<Book>>(bookDTOs);

            _unitOfWork.Repository<Book>().AddRange(books);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(IEnumerable<BookDTO> bookDTOs)
        {
            var mapper = new MapperConfiguration(cfg =>
                cfg.CreateMap<BookDTO, Book>())
                .CreateMapper();

            var books = mapper.Map<IEnumerable<BookDTO>, IEnumerable<Book>>(bookDTOs);

            _unitOfWork.Repository<Book>().RemoveRange(books);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<BookDTO>> GetAllAsync()
        {
            var books = await _unitOfWork.Repository<Book>()
                .GetAllAsync();

            var mapper = new MapperConfiguration(cfg =>
                 cfg.CreateMap<Book, BookDTO>())
                 .CreateMapper();

            var bookDTOs = mapper.Map<IEnumerable<Book>, IEnumerable<BookDTO>>(books);

            return bookDTOs;
        }
    }
}
