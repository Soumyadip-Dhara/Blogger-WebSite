using System.Net;

namespace CRUD.Helper
{
    public class ApiResponse<T>
    {
        public T? Result { get; set; }
        public HttpStatusCode? StatusCode { get; set; } = HttpStatusCode.InternalServerError;
        public string? ErrorMessage { get; set; }
    }
}

