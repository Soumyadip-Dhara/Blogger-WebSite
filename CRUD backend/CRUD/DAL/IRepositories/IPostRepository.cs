using CRUD.DAL.Entity;
using CRUD.DAL.Entity.DTO;

namespace CRUD.DAL.IRepositories
{
    public interface IPostRepository : IRepository<Post> 
    {
        public Task<ICollection<UserPostDTO>> GetAllPublishedPostsOfActiveUserById(int id);
        //Task<IEnumerable<Post>> GetByCategoryAsync(int category);
    }
}
