using veamosmty.Data;
using LitJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace veamosmty.Services
{
    /// <summary>
    /// Summary description for WSSeguridad
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WSSeguridad : System.Web.Services.WebService
    {
        Seguridad dat = new Seguridad();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAutenticacion(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetAutenticacion(obj_parametros);

                if (Utils.Result_OK(ds.Tables["Result"]))
                {
                    Sezzion.login = ds.Tables["Usuarios"].Rows[0]["nombreUsuario"].ToString();
                    Sezzion.nombreCompleto = ds.Tables["Usuarios"].Rows[0]["nombreCompleto"].ToString();
                    Sezzion.idUsuario = ds.Tables["Usuarios"].Rows[0]["idUsuario"].ToString();
                    Sezzion.codigoSession = Guid.NewGuid().ToString();
                    Sezzion.dtAccesos = ds.Tables["Accesos"];

                }


                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetConexion(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                //DataSet ds = dat.GetAutenticacion(obj_parametros);

                Dictionary<string, object> obj_result = new Dictionary<string, object>();

                if (!string.IsNullOrEmpty(Sezzion.idUsuario))
                {
                    obj_result.Add("login", Sezzion.login);
                    obj_result.Add("nombreCompleto", Sezzion.nombreCompleto);


                    obj_result.Add("DashName", "");

                    ms.Str_Respuesta_1 = JsonConvert.SerializeObject(obj_result);
                    ms.Str_Respuesta_3 = JsonConvert.SerializeObject(Sezzion.dtAccesos);

                    ms.Str_Fecha_Actual = Utils.getFechaActual();
                    ms.Estatus = Utils._OK_;

                }
                else
                {
                    ms.Estatus = Utils._ERROR_;
                    ms.Mensaje = "No se inicio sesión.";
                }



            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ChangePassword(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.ChangePassword(obj_parametros);

                
                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetParametros(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetParametros(obj_parametros);


                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetParametros(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetParametros(obj_parametros);


                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }



        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckSession(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, string> obj_parametros = deserializar_json.Deserialize<Dictionary<string, string>>(Parametros);




                if (!string.IsNullOrEmpty(Sezzion.idUsuario))
                {
                    ms.Estatus = Utils._OK_;
                }
                else
                {
                    ms.Estatus = Utils._ERROR_;
                    ms.Mensaje = "No se ha iniciado sesión.";
                }
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }


            return Json_Resultado;


        }
    }
}
