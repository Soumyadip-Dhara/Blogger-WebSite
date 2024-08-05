using AutoMapper;
using CRUD.BAL.IServices;
using CRUD.DAL.Entity;
using CRUD.DAL.Entity.DTO;
using CRUD.DAL.IRepositories;
using CRUD.Helper;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Collections.ObjectModel;

namespace CRUD.BAL.Services
{
    public class UserService : IUserService
    {

        IMapper _mapper;
        IUserRepository _userRepo;
        public UserService(IUserRepository userrepository, IMapper mapper)
        {
            _userRepo = userrepository;
            _mapper = mapper;
        }

        public async Task<ICollection<UserDTO>> GetAllActiveUser(bool isactive)
        {
            var getuser = await _userRepo.GetAllAsync(a => a.IsActive == isactive);
            ICollection<UserDTO> guser = _mapper.Map<Collection<UserDTO>>(getuser);

            return guser;
        }

        public async Task<ICollection<UserDTO>> GetUserById(int id)
        {
            var getuser = await _userRepo.GetAllAsync(a => a.Id == id);
            ICollection<UserDTO> guser = _mapper.Map<Collection<UserDTO>>(getuser);

            return guser;
        }

       /* public async Task<ICollection<UserDTO>> GetUserById(int id)
        {
            var getuserbyid = await _userRepo.GetById(id);
            ICollection<UserDTO> guser1 = _mapper.Map<Collection<UserDTO>>(getuserbyid);

            return guser1;
        }*/

        public async Task<ICollection<UserDTO>> GetAllUser()
        {
            var getuser = await _userRepo.GetAllAsync(null);
            ICollection<UserDTO> guser = _mapper.Map<Collection<UserDTO>>(getuser);

            return guser;
        }

        public async Task<bool> UpdateUser(UserDTO user)
        {
            if (user == null) throw new Exception();
            User users = _mapper.Map<User>(user);
            _userRepo.Update(users);
            _userRepo.SaveChangesManaged();
            return true;

        }
        public async Task<bool> AddUser(UserDTO user)
        {
            if (user == null) throw new Exception();
            User users = _mapper.Map<User>(user);
            _userRepo.Add(users);
            _userRepo.SaveChangesManaged();
            return true;

        }

        public async Task<bool> DeleteUser(int id)
        {

            User deluser = await _userRepo.GetById(id);
            if (deluser == null) return false;
            //_userRepo.Delete(users);
            //_userRepo.SaveChangesManaged();

            return await _userRepo.Delete(deluser);
        }

        public async Task<bool> SoftDeleteUser(int id)
        {
            User softdeluser = await _userRepo.GetById(id);

            if (softdeluser.IsActive == true)
            {
                softdeluser.IsActive = false;
                _userRepo.SaveChangesManaged();
                return true;
            }

                return false;
        }
    }
}
