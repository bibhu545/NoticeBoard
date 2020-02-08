using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NoticeBoardAPI.Models
{
    public class NoticeModel
    {
        public int noticeId { get; set; }
        public int userId { get; set; }
        public UserModel userData { get; set; }
        public string title { get; set; }
        public string body { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime lastUpdatedOn { get; set; }
        public int IsActive { get; set; }
    }
    public class NoticeFilterModel
    {
        public int pageNo { get; set; }
        public string sortBy { get; set; }
    }
}