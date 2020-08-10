using Books.Common.Enums;
using System;

namespace Books.BLL.DTOs
{
    public class BookDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int VolumeOfPages { get; set; }
        public string CountryOfPublication { get; set; }
        public Genre Genre { get; set; }
    }
}
