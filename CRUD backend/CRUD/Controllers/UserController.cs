using CRUD.BAL.IServices;
using CRUD.BAL.Services;
using CRUD.DAL.Entity.DTO;
using CRUD.Helper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using System.Net;
using static CRUD.Helper.AppConstants;

namespace CRUD.Controllers
{
    [Route("API/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserService _uservice;
        private readonly ILogger _logger;


        public UserController(IUserService service, ILogger<UserController> logger)
        {
            _uservice = service;
            _logger = logger;
        }

        /*[HttpGet("FetchAllActiveUsers/{isactive}")]
        public async Task<ICollection<UserDTO>> GetActiveUsers(bool isactive)
        {
            Collection<UserDTO> userDTOs = new Collection<UserDTO>();
            try
            {
                userDTOs = (Collection<UserDTO>)await _uservice.GetAllActiveUser(isactive);
            }
            catch
            {

            }
            return userDTOs;
        }*/

        /* [HttpGet("FetchUsersById/{id}")]
         public async Task<ApiResponse<ICollection<UserDTO>>> GetSingleUsersById(int id)
         {
             ApiResponse<ICollection<UserDTO>> response = new ApiResponse<ICollection<UserDTO>>();
             try
             {
                 response.Result = await _uservice.GetUserById(id);
                 response.StatusCode = HttpStatusCode.Found;
             }
             catch (Exception ex)
             {
                 {
                     response.ErrorMessage = ErrorMessages.Bad_Request;
                     response.StatusCode = HttpStatusCode.InternalServerError;
                     _logger.LogError(ex, "AddressCaptureController [GetSubDivision]: " + ex.Message);
                 }

             }
         }*/

        [HttpGet("FetchAllUsers")]
        public async Task<ApiResponse<ICollection<UserDTO>>> GetUsers()
        {
            ApiResponse<ICollection<UserDTO>> response = new ApiResponse<ICollection<UserDTO>>();
            try
            {
                response.Result = await _uservice.GetAllUser();
                
                response.StatusCode = HttpStatusCode.OK;
                response.ErrorMessage = StatusMessages.Got_All_User;
            }
            catch (Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Usercontroller [GetAllUser]: " + ex.Message);


            }
            return response;
        }

        [HttpPut("UpdateUser")]
        public async Task <ApiResponse<bool>> UpdateUsers([FromBody] UserDTO user)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();

            try
            {
                response.Result = await _uservice.UpdateUser(user);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.User_Updated;
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
                _logger.LogError(ex, "Usercontroller [UpdateUser]: " + ex.Message);
            }
            return response;
        }

        [HttpPost("AddUser")]
        public async Task<ApiResponse<bool>> AddUsers([FromBody] UserDTO user)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();

            try
            {
                response.Result = await _uservice.AddUser(user);
                if(response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.User_Added;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage= ErrorMessages.Bad_Request;
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Usercontroller [AddUser]: " + ex.Message);
            }
            return response;
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<ApiResponse<bool>> DeleteUsers(int id)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();

            try
            {
                response.Result = await _uservice.DeleteUser(id);
                if (response.Result == true)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.User_Deleted;
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.ErrorMessage = ErrorMessages.Bad_Request;
                }
            }
            catch(Exception ex) 
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Usercontroller [DeleteUser]: " + ex.Message);
            }
            return response;
        }

        [HttpDelete("SoftDeleteUser")]
        public async Task<ApiResponse<bool>> SoftDeleteUser(int id)
        {
            ApiResponse<bool> response = new ApiResponse<bool>();
            try
            {
                response.Result = await _uservice.SoftDeleteUser(id);
                if (response.Result == true)
                {

                    response.StatusCode = HttpStatusCode.OK;
                    response.ErrorMessage = StatusMessages.User_Soft_Deleted;
                }
                else
                {
                    {
                        response.StatusCode = HttpStatusCode.BadRequest;
                        response.ErrorMessage = ErrorMessages.Bad_Request;
                    }
                }
            }
            catch (Exception ex)
            {
                

                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = ErrorMessages.Internal_Server_Error;
                _logger.LogError(ex, "Usercontroller [SoftDeleteUser]: " + ex.Message);
                
                
            }
            return response;
        }
    }
}

