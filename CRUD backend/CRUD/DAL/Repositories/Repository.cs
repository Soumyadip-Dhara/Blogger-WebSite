using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;
using CRUD.DAL.IRepositories;

namespace CRUD.DAL.Repositories
{
    public class Repository<T, Tcontext> : IRepository<T> where T : class where Tcontext : DbContext
    {
        private readonly Tcontext _DbContext;

        public Repository(Tcontext context) 
        {
            _DbContext = context;
        }

        

        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>>? condition)
        {
            IQueryable<T> result = _DbContext.Set<T>();
            if (condition != null)
            {
                result = result.Where(condition);
            }
            return await result.ToListAsync();
        }

       /* public async Task<ICollection<T>> GetAllAsync()
        {
            IQueryable<T> result = this.DbContext.Set<T>();
            return await result.ToListAsync();
        }*/
        public async Task<T> GetUserByIdAsync(int id)
        {
            return await _DbContext.Set<T>().FindAsync(id);
        }

        public IQueryable<T> GetAllByCondition(Expression<Func<T, bool>> condition)
        {
            IQueryable<T> result = _DbContext.Set<T>();
            if (condition != null)
            {
                result = result.Where(condition);
            }

            return result;
        }

        public async Task<T> GetSingleAysnc(Expression<Func<T, bool>> condition)
        {
            return await _DbContext.Set<T>().Where(condition).SingleAsync();

        }

        
        public bool Add(T entity)
        {
            _DbContext.Set<T>().Add(entity);
            return true;
        }

        public async Task<bool> Delete(T entity)
        {
            _DbContext.Set<T>().Remove(entity);
            _DbContext.SaveChanges();

            return true;
        }


        public bool Update(T entity)
        {
            _DbContext.Entry(entity).State = EntityState.Modified;
            return true;
        }

        public void SaveChangesManaged()
        {
            _DbContext.SaveChanges();
        }

        public async Task<T> GetById(int id)
        {
            return await _DbContext.Set<T>().FindAsync(id);
        }


        

    }
}
