using CRUD.DAL.DBContext;
using CRUD.DAL.Entity;
using CRUD.DAL.Entity.DTO;
using CRUD.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace CRUD.DAL.Repositories
{
    public class PostRepository : Repository<Post, BlogContext>, IPostRepository
    {
       private readonly BlogContext _context;

        public PostRepository(BlogContext context) : base(context)
        {
            _context = context;
        }

        
        public async Task<ICollection<UserPostDTO>> GetAllPublishedPostsOfActiveUserById(int id)
        {
            UserPostDTO upDTOs = new UserPostDTO();
            upDTOs = await (from user in _context.Users
                            where user.Id == id
                            join post in _context.Posts on user.Id equals post.CreatedBy
                            select new UserPostDTO
                            {
                                Id=user.Id,
                                Name = user.Name,
                                Password = user.Password,
                                IsActive = user.IsActive,
                                PostId = post.Id,
                                Title = post.Title,
                                Description = post.Description,
                                Category = post.Category,
                                CreatedDate = DateTime.Now,
                                IsPublished = post.IsPublished,
                            }).SingleAsync();
            return (ICollection<UserPostDTO>)upDTOs;
                            
        }
        

      
        
        
    }
}
