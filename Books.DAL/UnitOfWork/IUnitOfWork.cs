using Books.DAL.Repository;
using System;
using System.Threading.Tasks;

namespace Books.DAL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> Repository<TEntity>() where TEntity : class;
        Task<int> SaveChangesAsync();
    }
}
