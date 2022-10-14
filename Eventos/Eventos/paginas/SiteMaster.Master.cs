using veamosmty.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace veamosmty.paginas
{
    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Sezzion.codigoSession = Guid.NewGuid().ToString();

            //if (!IsPostBack)
            //{
            //    if (string.IsNullOrEmpty(Sezzion.codigoSession))
            //    {
            //        Response.Redirect(Utils.Url_Login);
            //    }
            //    else {
            //        Seguridad dat = new Seguridad();
            //        if (!dat.ValidarAcceso(Request.FilePath)) {
            //            Response.Redirect(Utils.Url_Login);
            //        }

            //    }
            //}
        }



    }
}