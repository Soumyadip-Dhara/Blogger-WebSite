using AutoMapper;
using CRUD.BAL.IServices;
using CRUD.DAL.Entity;
using CRUD.DAL.Entity.DTO;
using CRUD.DAL.IRepositories;
using Microsoft.Extensions.Hosting;
using System.Collections.ObjectModel;

namespace CRUD.BAL.Services
{
    public class PostService : IPostService
    {
        IMapper _mapper;
        IPostRepository _postRepo;
        public PostService(IPostRepository postrepository, IMapper mapper)
        {
            _postRepo = postrepository;
            _mapper = mapper;
        }

        public async Task<ICollection<PostDTO>> GetAllPublishedPosts(bool ispublished)
        {
            var getpublishedposts = await _postRepo.GetAllAsync(a => a.IsPublished == ispublished);
            ICollection<PostDTO> gpost = _mapper.Map<Collection<PostDTO>>(getpublishedposts);

            return gpost;
        }

        public async Task<ICollection<PostDTO>> GetAllPublishedPostsById(int id)
        {
            var getpublishedposts = await _postRepo.GetAllAsync(a => a.IsPublished == true && a.Id == id);
            ICollection<PostDTO> gpost = _mapper.Map<Collection<PostDTO>>(getpublishedposts);

            return gpost;
        }

        public async Task<bool> AddPost(PostDTO post)
        {
            if (post == null) throw new Exception();
            Post posts = _mapper.Map<Post>(post);
            _postRepo.Add(posts);
            _postRepo.SaveChangesManaged();
            return true;

        }

        public async Task<bool> UpdatePost(PostDTO post)
        {
            if (post == null) throw new Exception();
            Post posts = _mapper.Map<Post>(post);
            _postRepo.Update(posts);
            _postRepo.SaveChangesManaged();
            return true;

        }


        public async Task<bool> DeletePost(int id)
        {
            
            Post delpost = await _postRepo.GetById(id);
            if (delpost == null) return false;
            //_userRepo.Delete(users);
            //_userRepo.SaveChangesManaged();

            return await _postRepo.Delete(delpost);
        }

        public async Task<ICollection<PostDTO>> GetAllPublishedPostsByCategory(int category)
        {
            if (category == null) throw new Exception();
            var getpublishedpostsbycategory = await _postRepo.GetAllAsync(a => a.IsPublished == true && a.Category == category);
            ICollection<PostDTO> gpost = _mapper.Map<Collection<PostDTO>>(getpublishedpostsbycategory);

            return gpost;
        }

        public async Task<bool> SoftDeletePost(int id)
        {
            Post softdelpost = await _postRepo.GetById(id);

            if (softdelpost.IsPublished == true) 
            {
                softdelpost.IsPublished = false;
                _postRepo.SaveChangesManaged();
                return true;
            }
            
                return false;
        }

        public async Task<ICollection<UserPostDTO>> GetAllPublishedPostsOfActiveUsersById(int id)
        {
            var getp = await _postRepo.GetAllAsync(a => a.IsPublished == true && a.IsActive == true && a.Id == id);
            ICollection<UserPostDTO> gpost = _mapper.Map<Collection<UserPostDTO>>(getp);

            return gpost;
        }
    }
}
