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
    public class IdentityController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}