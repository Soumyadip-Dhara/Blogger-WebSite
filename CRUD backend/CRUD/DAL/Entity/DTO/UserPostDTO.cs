namespace CRUD.DAL.Entity.DTO
{
    public class UserPostDTO
    {
        public int Id { get; set; }


        public string Name { get; set; }


        public string Password { get; set; }


        public bool? IsActive { get; set; }

        public int PostId { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }


        public int Category { get; set; }


        


        public DateTime? CreatedDate { get; set; }


        public bool? IsPublished { get; set; }
    }
}
