using Books.BLL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Books.BLL.Interfaces
{
    public interface IBookService
    {
        Task AddAsync(IEnumerable<BookDTO> bookDTOs);
        Task DeleteAsync(IEnumerable<BookDTO> bookDTOs);
        Task<IEnumerable<BookDTO>> GetAllAsync();
       
    }   
}
