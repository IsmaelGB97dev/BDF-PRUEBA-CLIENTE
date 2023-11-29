using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Test.Controllers
{
    public class CatalogosController : Controller
    {
        // GET: Catalogos
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Direccion()
        {
            return View();
        }

        public ActionResult TipoIdentificacion()
        {
            return View();
        }
        public ActionResult TipoPrestamo()
        {
            return View();
        }
        public ActionResult Moneda()
        {
            return View();
        }
    }
}