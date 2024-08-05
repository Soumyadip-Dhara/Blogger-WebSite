using System.Linq.Expressions;

namespace CRUD.DAL.IRepositories
{
    public interface IRepository<T>
    {

        public Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>> condition);
        public IQueryable<T> GetAllByCondition(Expression<Func<T, bool>> condition);

        public Task<T> GetSingleAysnc(Expression<Func<T, bool>> condition);
        public Task<T> GetById(int id);

        //Task<ICollection<T>> GetAllAsync();



        public bool Add(T entity);
        public bool Update(T entity);
        public Task<bool> Delete(T entity);
        public void SaveChangesManaged();

        
    }
}
