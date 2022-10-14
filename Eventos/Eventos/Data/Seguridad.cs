using Microsoft.ApplicationBlocks.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace veamosmty.Data
{

    public class Seguridad
    {
        Cnxn cnxn = new Cnxn();
        List<object> ListParentsMenu = new List<object>();
        List<object> ListAdminMenu = new List<object>();

        public Seguridad()
        {
            
        }


        public DataSet GetAutenticacion(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_Autenticar";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            //dyparametros["P_pass"] = Utils.EncryptarCadena(dyparametros["P_pass"].ToString());
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";
            if (ds.Tables.Count > 1) {
                ds.Tables[1].TableName = "Usuarios";
                ds.Tables[2].TableName = "Accesos";
            }
                

            return ds;
        }
        public DataSet ChangePassword(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "sysChangePassword";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            dyparametros["P_pass_Actual"] = Utils.EncryptarCadena(dyparametros["P_pass_Actual"].ToString());
            dyparametros["P_pass_Nuevo"] = Utils.EncryptarCadena(dyparametros["P_pass_Nuevo"].ToString());
            dyparametros["P_Confirmar_Password"] = Utils.EncryptarCadena(dyparametros["P_Confirmar_Password"].ToString());
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";


            return ds;
        }

        public DataSet ValidarAcceso(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            DataTable dt = Utils.SchemaDtResult_V2();
            
            string url = _DyParametros["P_Url"].ToString();
            url = url.Replace("/pagina/", "");

            dt.Rows[0]["estatusProcedimiento"] = Utils._ERROR_;
            dt.Rows[0]["mensajeProcedimiento"] = "El rol del usuario no tiene acceso a esta opción.";

            if (Sezzion.idRol == "3") {
                // Familia
                foreach (object drobj in ListParentsMenu) {

                    Dictionary<string, object> obj = (Dictionary<string, object>)drobj;

                    if (obj["Url"].ToString() == url) {
                        dt.Rows[0]["estatusProcedimiento"] = Utils._OK_;
                        dt.Rows[0]["mensajeProcedimiento"] = "Es valido.";
                        break;
                    }
                }
            }
            else
            {
                foreach (object drobj in ListAdminMenu)
                {

                    Dictionary<string, object> obj = (Dictionary<string, object>)drobj;

                    if (obj["Url"].ToString() == url)
                    {
                        dt.Rows[0]["estatusProcedimiento"] = Utils._OK_;
                        dt.Rows[0]["mensajeProcedimiento"] = "Es valido.";
                        break;
                    }
                }

            }


            dt.TableName = "ValidacionAcceso";
            ds.Tables.Add(dt.Copy());
            return ds;
        }
        public bool ValidarAcceso(string _Url)
        {

            bool esValido = false;

            DataSet ds = new DataSet();
            DataTable dt = Utils.SchemaDtResult_V2();

            try
            {
                string url = _Url;
                url = url.Replace("/paginas/", "");

                dt.Rows[0]["estatusProcedimiento"] = Utils._ERROR_;
                dt.Rows[0]["mensajeProcedimiento"] = "El rol del usuario no tiene acceso a esta opción.";

                if (url != "Inicio.aspx")
                {


                    //if (Sezzion.idRol == "3")
                    //{
                    //    // Familia
                    //    foreach (Menu mn in ListParentsMenu)
                    //    {
                    //        if (mn.Url == url)
                    //        {
                    //            esValido = true;
                    //            dt.Rows[0]["estatusProcedimiento"] = Utils._OK_;
                    //            dt.Rows[0]["mensajeProcedimiento"] = "Es valido.";
                    //            break;
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    foreach (Menu mn in ListAdminMenu)
                    //    {
                    //        if (mn.Url == url)
                    //        {
                    //            esValido = true;
                    //            dt.Rows[0]["estatusProcedimiento"] = Utils._OK_;
                    //            dt.Rows[0]["mensajeProcedimiento"] = "Es valido.";
                    //            break;
                    //        }
                    //    }

                    //}

                    if (Utils.Valida_Fuente_Datos(Sezzion.dtAccesos)) {
                        var busca = Sezzion.dtAccesos.AsEnumerable().Where(x => x.Field<string>("Url") == url);
                        if (busca.Any()) {
                            esValido = true;
                        }
                    }
                    

                }
                else
                {
                    esValido = true;
                }


                dt.TableName = "ValidacionAcceso";
                ds.Tables.Add(dt.Copy());
            }
            catch (Exception ex)
            {
                Utils.problems(ex);
            }

            return esValido;
        }


        public DataSet SetParametros(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "sistema_Set_Parametros";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            dyparametros["P_passContactos"] = Utils.EncryptarCadena(dyparametros["P_passContactos"].ToString());

            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";


            return ds;
        }
        public DataSet GetParametros(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "sistema_Get_Parametros";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Parametros";

            if(ds.Tables[0].Rows[0]["passwordContactos"] != null)
            ds.Tables[0].Rows[0]["passwordContactos"] = Utils.DesEncriptarCadena(ds.Tables[0].Rows[0]["passwordContactos"].ToString());



            return ds;
        }


    }


    public class Menu {

        public string Url { get; set; }
        public string Icono { get; set; }
        public string Descripcion { get; set; }
    }

}
