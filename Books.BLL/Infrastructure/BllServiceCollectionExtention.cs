using Books.DAL;
using Books.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace Books.BLL.Infrastructure
{
    public static class BllServiceCollectionExtention
    {
        public static IServiceCollection AddMainContext(this IServiceCollection services)
        {
            return services.AddDbContext<BooksContext>(opt => opt.UseInMemoryDatabase());
        }

        public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
        {
            return services.AddTransient<IUnitOfWork, UnitOfWork>(provider =>
                new UnitOfWork(provider.GetRequiredService<BooksContext>()));
        }
    }
}
