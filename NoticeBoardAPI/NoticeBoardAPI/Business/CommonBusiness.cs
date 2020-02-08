using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NoticeBoardAPI.Models;
using NoticeBoardAPI.Utils;

namespace NoticeBoardAPI.Business
{
    public class CommonBusiness
    {
        public static System.Web.Mvc.JsonResult GetErrorResponse(string errorMessage = "")
        {
            return new System.Web.Mvc.JsonResult
            {
                Data = new ApiRespnoseWrapper
                {
                    status = ApiRespnoseStatus.Failed,
                    errorMessage = errorMessage
                }
            };
        }
        public static int GetPages(int count)
        {
            int recordsPerPage = 4;
            return count % recordsPerPage == 0 ? count / recordsPerPage - 1 : count / recordsPerPage;
        }
    }
}