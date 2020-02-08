using NoticeBoardAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NoticeBoardAPI.Business;
using NoticeBoardAPI.Utils;
using System.Collections;

namespace NoticeBoardAPI.Controllers
{
    public class AccountController : Controller
    {
        public String APITest()
        {
            return "Hello world";
        }
        public JsonResult Login(LoginRequestModel model)
        {
            try
            {
                var result = AccountBusiness.Login(model);
                var data = new ApiRespnoseWrapper() { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult() { Data = data };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}