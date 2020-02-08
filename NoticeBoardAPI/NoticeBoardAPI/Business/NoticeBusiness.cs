using NoticeBoardAPI.EDMX;
using NoticeBoardAPI.Models;
using NoticeBoardAPI.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NoticeBoardAPI.Business
{
    public class NoticeBusiness
    {
        public static List<NoticeModel> GetNotices(NoticeFilterModel model, ref int recordsCount)
        {
            using (var context = new NoticeBoardEntities())
            {
                List<NoticeModel> notices = context.Notices.Where(x => x.IsActive == ActiveStatus.Active).Join(context.Users, n => n.UserId, u => u.UserId, (n, u) => new NoticeModel
                {
                    noticeId = n.NoticeId,
                    userId = n.UserId,
                    title = n.Title,
                    body = n.Body,
                    IsActive = n.IsActive,
                    lastUpdatedOn = n.LastUpdatedOn,
                    postedOn = n.PostedOn,
                    userData = new UserModel()
                    {
                        email = u.Email,
                        isActive = u.IsActive,
                        userName = u.UserName,
                        userId = u.UserId
                    },
                }).ToList();

                recordsCount = notices.Count;

                switch (model.sortBy)
                {
                    case "postedBy":
                        notices = notices.OrderBy(x => x.userData.email).ToList();
                        break;
                    case "title":
                        notices = notices.OrderBy(x => x.title).ToList();
                        break;
                    default:
                        notices = notices.OrderByDescending(x => x.postedOn).ToList();
                        break;
                }

                return AddPaginationToNotices(notices, model);
            }
        }
        public static List<NoticeModel> AddPaginationToNotices(List<NoticeModel> notices, NoticeFilterModel model)
        {
            int totalPages = CommonBusiness.GetPages(notices.Count);
            int recordsPerPage = 4, totalRecords = notices.Count;
            if (model.pageNo < 0 || model.pageNo > totalPages)
            {
                model.pageNo = 0;
            }
            int startIndex = model.pageNo * recordsPerPage;
            List<NoticeModel> filteredNotices = new List<NoticeModel>();
            for (int i = startIndex; i < startIndex + recordsPerPage; i++)
            {
                if (i < totalRecords)
                {
                    filteredNotices.Add(notices[i]);
                }
            }
            return filteredNotices;
        }
        public static NoticeModel GetNoticeDetails(int noticeId)
        {
            using (var context = new NoticeBoardEntities())
            {
                return context.Notices.Join(context.Users, n => n.UserId, u => u.UserId, (n, u) => new NoticeModel
                {
                    noticeId = n.NoticeId,
                    userId = n.UserId,
                    title = n.Title,
                    body = n.Body,
                    IsActive = n.IsActive,
                    lastUpdatedOn = n.LastUpdatedOn,
                    postedOn = n.PostedOn,
                    userData = new UserModel()
                    {
                        email = u.Email,
                        isActive = u.IsActive,
                        userName = u.UserName,
                        userId = u.UserId
                    },
                }).FirstOrDefault(x => x.noticeId == noticeId);
            }
        }
        public static bool AddOrUpdateNotice(NoticeModel model)
        {
            using (var context = new NoticeBoardEntities())
            {
                if (model.noticeId == 0)
                {
                    context.Notices.Add(new Notice()
                    {
                        Title = model.title,
                        Body = model.body,
                        IsActive = ActiveStatus.Active,
                        PostedOn = DateTime.UtcNow,
                        LastUpdatedOn = DateTime.UtcNow,
                        UserId = model.userId
                    });
                    context.SaveChanges();
                    return true;
                }
                else
                {
                    Notice notice = context.Notices.FirstOrDefault(x => x.NoticeId == model.noticeId && x.UserId == model.userId);
                    if (notice == null)
                    {
                        return false;
                    }
                    else
                    {
                        notice.Title = model.title;
                        notice.Body = model.body;
                        notice.LastUpdatedOn = DateTime.UtcNow;
                        context.SaveChanges();
                        return true;
                    }
                }
            }
        }
        public static bool DeleteNotice(int id)
        {
            using (var context = new NoticeBoardEntities())
            {
                var notice = context.Notices.FirstOrDefault(x => x.NoticeId == id);
                if (notice != null)
                {
                    notice.IsActive = ActiveStatus.Deleted;
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }
    }
}