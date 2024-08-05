using CRUD.BAL.IServices;
using CRUD.BAL.Services;
using CRUD.DAL.Entity.DTO;
using CRUD.Helper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using static CRUD.Helper.AppConstants;
using System.Net;

namespace CRUD.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        
        private readonly IPostService _pservice;
        private readonly ILogger _logger;
        public PostController(IPostService service, ILogger<PostController> logger)
        {
            _pservice = service;
            _logger = logger;
        }

        [HttpGet("FetchAllPublishedPosts")]

        public async Task<ApiResponse<ICollection<PostDTO>>> GetAllPublishedPosts(bool ispublished)
        {
            ApiResponse<ICollection<PostDTO>> response = new ApiResponse<ICollection<PostDTO>>();
            
            try
            {
                response.Result = await _pservice.GetAllPublishedPosts(ispublished);
                response.StatusCode = HttpStatusCode.OK;
                response.ErrorMessage = StatusMessages.Got_Post;
            }
            catch (Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [GetAllPublishedPosts]: " + ex.Message);
            }
            return response;
        }

        [HttpGet("FetchAllPublishedPostsByID/{id}")]

        public async Task <ApiResponse<ICollection<PostDTO>>> GetAllPublishedPostsById(int id)
        {
            ApiResponse<ICollection<PostDTO>> response = new ApiResponse<ICollection<PostDTO>>();
            
            try
            {
                response.Result = await _pservice.GetAllPublishedPostsById(id);
                response.StatusCode = HttpStatusCode.OK;
                response.ErrorMessage = StatusMessages.Got_Post;
            }
            catch (Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [GetAllPublishedPostsById]: " + ex.Message);
            }
            return response;
        }

        [HttpGet("FetchAllPublishedPostsOfActiveUsersByID/{id}")]

        public async Task<ApiResponse<ICollection<UserPostDTO>>> GetAllPublishedPostsOfActiveUsersById(int id)
        {
            ApiResponse<ICollection<UserPostDTO>> response = new ApiResponse<ICollection<UserPostDTO>>();

            try
            {
                response.Result = await _pservice.GetAllPublishedPostsOfActiveUsersById(id);
                response.StatusCode = HttpStatusCode.OK;
                response.ErrorMessage = StatusMessages.Got_Post;
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [GetAllPublishedPostsById]: " + ex.Message);
            }
            return response;
        }

        [HttpGet("FetchAllPublishedPostsByCategory/{category}")]

        public async Task<ApiResponse<ICollection<PostDTO>>> GetAllPublishedPostsByCategory(int category)
        {
            ApiResponse<ICollection<PostDTO>> response = new ApiResponse<ICollection<PostDTO>>();
            try
            {

                response.Result = await _pservice.GetAllPublishedPostsByCategory(category);
                response.StatusCode = HttpStatusCode.OK;
                response.ErrorMessage = StatusMessages.Got_Post;
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [GetAllPublishedPostsByCategory]: " + ex.Message);
            }
            return response;
        }

        [HttpPost("AddPost")]
        public async Task<ApiResponse<bool>> AddPosts([FromBody] PostDTO post)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();
            try
            {
                response.Result = await _pservice.AddPost(post);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.Post_Added;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage = ErrorMessages.Bad_Request;
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [AddPost]: " + ex.Message);
            }
            return response;
        }

        [HttpPut("UpdatePost")]
        public async Task<ApiResponse<bool>> UpdatePosts([FromBody] PostDTO post)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();
            try
            {
                response.Result = await _pservice.UpdatePost(post);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.Post_Updated;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage = ErrorMessages.Bad_Request;
                }
            }
            catch (Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [UpdatePost]: " + ex.Message);
            }
            return response;
        }

        [HttpDelete("DeletePost/{id}")]
        public async Task<ApiResponse<bool>> DeletePosts(int id)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();
            try
            {
                response.Result = await _pservice.DeletePost(id);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.Post_Deleted;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage = ErrorMessages.Bad_Request;
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [DeletePost]: " + ex.Message);
            }
            return response;



        }
        [HttpDelete("SoftDeletePost")]
        public async Task<ApiResponse<bool>> SoftDeletePost(int id)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();
            try
            {
                response.Result = await _pservice.SoftDeletePost(id);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.Post_Soft_Deleted;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage = ErrorMessages.Bad_Request;
                }
            }
            catch (Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Postcontroller [SoftDeletePost]: " + ex.Message);
            }
            return response;
        }



    }
}
