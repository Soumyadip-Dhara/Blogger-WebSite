using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CRUD.DAL.Entity.DTO
{
    public class UserDTO
    {
        
        public int Id { get; set; }

        
        public string Name { get; set; }

      
        public string Password { get; set; }

       
        public bool? IsActive { get; set; }

        
    }
}
