using PersonalTools.BLL;
using PersonalTools.Data;
using PersonalTools.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PersonalTools.AspNet4.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            var bll = new IdentityBLL();
            await bll.Insert(new IdentityEntity() { ThirdPartyName = "aasdf" });
            await bll.FindAll();

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}