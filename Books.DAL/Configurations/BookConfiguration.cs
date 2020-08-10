using Books.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Books.DAL.Configurations
{
    internal class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.HasKey(opt => opt.Id);
            builder.Property(opt => opt.Id).ValueGeneratedOnAdd();
            builder.Property(opt => opt.Title).IsRequired().HasMaxLength(64);
            builder.Property(opt => opt.Author).IsRequired().HasMaxLength(64);
            builder.Property(opt => opt.VolumeOfPages).IsRequired();
            builder.Property(opt => opt.CountryOfPublication).IsRequired();
            builder.Property(opt => opt.Genre).IsRequired();
        }
    }
}
