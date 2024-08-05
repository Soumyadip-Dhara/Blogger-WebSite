using CRUD.DAL.Entity.DTO;
using System.Collections.ObjectModel;

namespace CRUD.BAL.IServices
{
    public interface IUserService
    {
        public Task<ICollection<UserDTO>> GetAllActiveUser(bool isactive);
        public  Task<ICollection<UserDTO>> GetUserById(int id);
        public Task<ICollection<UserDTO>> GetAllUser();
        public Task<bool> UpdateUser(UserDTO user);
        public Task<bool> AddUser(UserDTO user);
        
        public Task<bool> DeleteUser(int id);
        public Task<bool> SoftDeleteUser(int id);
    }
}
