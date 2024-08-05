using AutoMapper;
using CRUD.DAL.Entity;
using CRUD.DAL.Entity.DTO;

namespace CRUD.Helper
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Post, PostDTO>().ReverseMap();
            

        }
    }
}

