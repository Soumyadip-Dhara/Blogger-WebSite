using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CRUD.DAL.Entity.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

       
        public int Category { get; set; }

       
        public int? CreatedBy { get; set; }

       
        public DateTime? CreatedDate { get; set; }

        
        public bool? IsPublished { get; set; }
    }
}
