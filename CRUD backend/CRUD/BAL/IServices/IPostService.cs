using CRUD.DAL.Entity.DTO;

namespace CRUD.BAL.IServices
{
    public interface IPostService
    {
        public  Task<ICollection<PostDTO>> GetAllPublishedPosts(bool ispublished);
        public Task<ICollection<PostDTO>> GetAllPublishedPostsById(int id);
        public Task<bool> AddPost(PostDTO post);
        public Task<bool> UpdatePost(PostDTO post);
        public Task<bool> DeletePost(int id);
        public Task<ICollection<PostDTO>> GetAllPublishedPostsByCategory(int category);
        public Task<bool> SoftDeletePost(int id);
        public Task<ICollection<UserPostDTO>> GetAllPublishedPostsOfActiveUsersById(int id);
    }
}
