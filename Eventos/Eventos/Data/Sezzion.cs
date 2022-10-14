using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace veamosmty.Data
{
    public class Sezzion
    {
        private static String S_login = "login";
        private static String S_nombreCompleto = "nombreCompleto";
        private static String S_idRol = "idRol";
        private static String S_idUsuario = "idUsuario";
        private static String S_codigoSession = "codigoSession";

        private static String S_dtAccesos = "dtAccesos";

        public static String idUsuario
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_idUsuario] == null)
                    return String.Empty;
                else
                    return HttpContext.Current.Session[Sezzion.S_idUsuario].ToString();
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_idUsuario] = value;
            }
        }

        public static String login
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_login] == null)
                    return String.Empty;
                else
                    return HttpContext.Current.Session[Sezzion.S_login].ToString();
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_login] = value;
            }
        }
        public static String nombreCompleto
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_nombreCompleto] == null)
                    return String.Empty;
                else
                    return HttpContext.Current.Session[Sezzion.S_nombreCompleto].ToString();
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_nombreCompleto] = value;
            }
        }
        public static String codigoSession
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_codigoSession] == null)
                    return String.Empty;
                else
                    return HttpContext.Current.Session[Sezzion.S_codigoSession].ToString();
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_codigoSession] = value;
            }
        }
        public static String idRol
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_idRol] == null)
                    return String.Empty;
                else
                    return HttpContext.Current.Session[Sezzion.S_idRol].ToString();
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_idRol] = value;
            }
        }

        public static DataTable dtAccesos
        {
            get
            {
                if (HttpContext.Current.Session[Sezzion.S_dtAccesos] == null)
                    return null;
                else
                    return (DataTable)HttpContext.Current.Session[Sezzion.S_dtAccesos];
            }
            set
            {
                HttpContext.Current.Session[Sezzion.S_dtAccesos] = value;
            }
        }





        public static object getUserId()
        {
            return (string.IsNullOrEmpty(Sezzion.idUsuario) ? "1" : Sezzion.idUsuario);
        }


        public static void clearSesion() {
            Sezzion.login = null;
            Sezzion.idUsuario = null;
            Sezzion.nombreCompleto = null;
            Sezzion.codigoSession = null;
            Sezzion.idRol = null;
        } 
    }
}