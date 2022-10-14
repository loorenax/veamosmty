<%@ WebHandler Language="C#" Class="FileUploadHandler" %>

using System;
using System.Web;
using System.IO;
using System.Drawing;
using LitJson;
using veamosmty.Data;
using veamosmty;

public class FileUploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        MensajeServidor ms = new MensajeServidor();

        string json_resultado = "{}";

        try
        {

            Utils.writeLogError(null, "Entra a cargar");
            if (context.Request.Files.Count > 0)
            {
                string fileName = "";
                string pathToSave = "";
                foreach (string s in context.Request.Files)
                {
                    HttpPostedFile file = context.Request.Files[s];

                    fileName = file.FileName;
                    string extension = System.IO.Path.GetExtension(fileName);

                    string saveas = "";


                    //Si se define alguno de esto parametros quiere decir que viene de un modulo especifico del sistema para almacenar los archivos
                    string repositorio = "";
                    string carpetaModulo = "";
                    string carpeta = "";
                    foreach (string key in context.Request.Params.Keys)
                    {
                        switch (key)
                        {
                            case "repositorio":
                                repositorio = context.Request.Params["repositorio"];
                                break;
                            case "carpetaModulo":
                                carpetaModulo = context.Request.Params["carpetaModulo"];
                                break;
                            case "carpeta":
                                carpeta = context.Request.Params["carpeta"];
                                break;
                            case "saveas":
                                saveas = context.Request.Params["saveas"];
                                break;
                            default:
                                //Quiere decir que es una simple importación y el archivo no es necesario almacenarlo o clasificarlo por lo que debe irse solo a los UploadedDocuments
                                break;
                        }
                    }

                    if (repositorio == "." || repositorio == "")
                    {
                        //Quiere decir que se estara guardando dentro de las carpetas de la misma aplicación
                        repositorio = $"~";
                    }


                    //es para obtener el nombre solicito sin extensión del archivo.
                    if (string.IsNullOrEmpty(Path.GetExtension(fileName)))
                    {
                        string fileExtension = file.ContentType;
                        fileName = fileName.Substring(0, fileName.IndexOf('.')) + fileExtension;
                    }


                    string rutaCarpetaAsignada = "";
                    if (string.IsNullOrEmpty(carpetaModulo))
                    {
                        //Es una carga cualquiera, principalmente seria para importación
                        rutaCarpetaAsignada = $"{repositorio}/UploadedDocuments";
                    }
                    else
                    {
                        rutaCarpetaAsignada = $"{repositorio}/UploadedDocumentsPermanentes";
                    }

                    Utils.writeLogError(null, $"rutaCarpetaAsignada: {rutaCarpetaAsignada}");
                    //Carpeta principal de los documentos
                    //----      ~/UploadedDocuments
                    //----      ~/UploadedDocumentsPermanentes
                    //----      C:\D39Documentos/UploadedDocumentsPermanentes
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada)))
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada));


                    if (!string.IsNullOrEmpty(carpetaModulo))
                    {
                        rutaCarpetaAsignada += $"/{carpetaModulo}";

                        //Nos aseguramos que la carpeta del modulo exista
                        //----      ~/UploadedDocuments   <-- Aqui no aplica
                        //----      ~/UploadedDocumentsPermanentes/Peticiones
                        //----      C:\D39Documentos/UploadedDocumentsPermanentes/Peticiones
                        if (!Directory.Exists(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada)))
                            Directory.CreateDirectory(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada));

                        rutaCarpetaAsignada += $"/{carpeta}";

                        //Nos aseguramos que la carpeta del registro exista
                        //----      ~/UploadedDocuments   <-- Aqui no aplica
                        //----      ~/UploadedDocumentsPermanentes/Peticiones/1
                        //----      C:\D39Documentos/UploadedDocumentsPermanentes/Peticiones/1
                        if (!Directory.Exists(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada)))
                            Directory.CreateDirectory(HttpContext.Current.Server.MapPath(rutaCarpetaAsignada));
                    }

                    if((string.IsNullOrEmpty(saveas) || saveas == "undefined") && string.IsNullOrEmpty(carpetaModulo))
                    {
                        saveas = Guid.NewGuid().ToString();
                    }



                    if(repositorio == "~")
                    {
                        pathToSave = HttpContext.Current.Server.MapPath($"{rutaCarpetaAsignada}/{saveas}{extension}");
                    }
                    else
                    {
                        pathToSave = $"{rutaCarpetaAsignada}/{saveas}{extension}";
                    }

                    Utils.writeLogError(null, $"ruta a guardar: {pathToSave}");
                    file.SaveAs(pathToSave);

                }

                ms.Estatus = "success";
                ms.Mensaje = "File(s) Uploaded Successfully!";
                ms.Str_Respuesta_1 = System.IO.Path.GetFileName(pathToSave);
            }
            else
            {
                ms.Estatus = "error";
                ms.Mensaje = "No se encontraron archivos";
            }
        }
        catch (Exception ex)
        {
            ms.Estatus = "error";
            ms.Mensaje = ex.Message;

            Utils.writeLogError(ex, null);
        }
        finally
        {
            json_resultado = JsonMapper.ToJson(ms);
        }

        context.Response.ContentType = "text/plain";
        context.Response.Write(json_resultado);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}