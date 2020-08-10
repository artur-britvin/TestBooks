using Books.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Web.ViewModels
{
    public class BookViewModel
    {
        public long? Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int VolumeOfPages { get; set; }
        public string CountryOfPublication { get; set; }
        public Genre Genre { get; set; }
    }
}
