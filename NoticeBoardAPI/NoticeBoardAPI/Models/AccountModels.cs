using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NoticeBoardAPI.Models
{
    public class LoginRequestModel
    {
        public string userName { get; set; }
        public string password { get; set; }
    }
    public class LoginResponseModel
    {
        public int userId { get; set; }
        public string email { get; set; }
        public string userName { get; set; }
    }
}