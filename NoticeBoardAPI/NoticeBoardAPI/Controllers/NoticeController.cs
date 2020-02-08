using NoticeBoardAPI.Business;
using NoticeBoardAPI.Models;
using NoticeBoardAPI.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NoticeBoardAPI.Controllers
{
    public class NoticeController : Controller
    {
        public JsonResult GetNotices(NoticeFilterModel model)
        {
            try
            {
                int recordsCount = 0;
                var result = NoticeBusiness.GetNotices(model, ref recordsCount);
                var pages = CommonBusiness.GetPages(recordsCount);
                var data = new ApiRespnoseWrapper() { status = ApiRespnoseStatus.Success, results = new ArrayList() { result, pages } };
                return new JsonResult() { Data = data };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult GetNoticeDetails(int id)
        {
            try
            {
                var result = NoticeBusiness.GetNoticeDetails(id);
                var data = new ApiRespnoseWrapper() { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult() { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult AddOrUpdateNotice(NoticeModel model)
        {
            try
            {
                var result = NoticeBusiness.AddOrUpdateNotice(model);
                var data = new ApiRespnoseWrapper() { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult() { Data = data };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult DeleteNotice(int id)
        {
            try
            {
                var result = NoticeBusiness.DeleteNotice(id);
                var data = new ApiRespnoseWrapper() { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult() { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}