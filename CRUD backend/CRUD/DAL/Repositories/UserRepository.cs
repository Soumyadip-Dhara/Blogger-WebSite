using CRUD.DAL.DBContext;
using CRUD.DAL.Entity;
using CRUD.DAL.IRepositories;

namespace CRUD.DAL.Repositories
{
    public class UserRepository :Repository<User, BlogContext>, IUserRepository
    {
        public UserRepository(BlogContext context) : base(context)
        {
        }

        
    }
}
