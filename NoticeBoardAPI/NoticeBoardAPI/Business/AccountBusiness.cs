using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NoticeBoardAPI.EDMX;
using NoticeBoardAPI.Models;
using NoticeBoardAPI.Utils;


namespace NoticeBoardAPI.Business
{
    public class AccountBusiness
    {
        public static LoginResponseModel Login(LoginRequestModel model)
        {
            using (var context = new NoticeBoardEntities())
            {
                User user = context.Users.FirstOrDefault(x => x.UserName == model.userName && x.Password == model.password && x.IsActive == ActiveStatus.Active);
                if (user != null)
                {
                    return new LoginResponseModel()
                    {
                        email = user.Email,
                        userId = user.UserId,
                        userName = user.UserName
                    };
                }
                else
                {
                    return null;
                }
            }
        }
    }
}