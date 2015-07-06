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
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var bll = new IdentityBLL();

            var identities = await bll.FindAll();

            return View(identities);
        }

        [HttpPost]
        public async Task<JsonResult> Save(IdentityEntity entity)
        {
            var bll = new IdentityBLL();

            if (string.IsNullOrEmpty(entity.Id))
            {
                await bll.Insert(entity);
            }
            else
            {
                await bll.Update(entity);
            }

            return Json(entity.Id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task Delete(string Id)
        {
            var bll = new IdentityBLL();

            await bll.Delete(Id);
        }
    }
}