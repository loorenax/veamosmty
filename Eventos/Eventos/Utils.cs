using veamosmty.Data;
using ExcelDataReader;
using SwiftExcel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace veamosmty
{
    public class Utils
    {

        public const string _OK_ = "OK";
        public const string _ERROR_ = "ERROR";
        public const string _RESTRICCION_ = "RESTRICCION";
        public const string _RESET_ = "RESET";
        public const string Url_Login = "../paginas/Login.aspx";
        
        public const String Fecha_Formato_AAAA_MMM_DD = "yyyy-MMM-dd";
        public const String Hora_Formato_hh_mm_AM_PM = "hh:mm tt";
        public const String Hora_Formato_HH_MM_AM_PM = "HH:mm tt";
        public static IFormatProvider FORMATO_FECHA = System.Globalization.CultureInfo.GetCultureInfo("es-MX").DateTimeFormat;


        public static object getValueToSP(object _Valor)
        {
            object resultado = DBNull.Value;
            if (_Valor == null)
            {
                // Regrese DBNUL.Value;
            }
            else if (!string.IsNullOrEmpty(_Valor.ToString()))
            {
                resultado = _Valor;
            }

            return resultado;
        }

        public static string EncryptarCadena(string inputString)
        {
            MemoryStream memStream = null;
            try
            {
                byte[] key = { };
                byte[] IV = { 12, 21, 43, 17, 57, 35, 67, 27 };
                //string encryptKey = "aXb2uy4z"; // MUST be 8 characters
                string encryptKey = "7k>3qt<9"; // MUST be 8 characters
                key = Encoding.UTF8.GetBytes(encryptKey);
                byte[] byteInput = Encoding.UTF8.GetBytes(inputString);
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                memStream = new MemoryStream();
                ICryptoTransform transform = provider.CreateEncryptor(key, IV);
                CryptoStream cryptoStream = new CryptoStream(memStream, transform, CryptoStreamMode.Write);
                cryptoStream.Write(byteInput, 0, byteInput.Length);
                cryptoStream.FlushFinalBlock();

            }
            catch (Exception ex)
            {
                problems(ex);
            }

            return Convert.ToBase64String(memStream.ToArray());
        }

        public static void cleanSession()
        {
            Sezzion.idUsuario = Sezzion.nombreCompleto = Sezzion.codigoSession = null;
            HttpContext.Current.Session.Clear();

        }

        public static string getFechaActual()
        {
            return DateTime.Now.ToString("dd/MMM/yyyy", FORMATO_FECHA);
        }

        public static string DesEncriptarCadena(string inputString)
        {
            MemoryStream memStream = null;
            try
            {
                byte[] key = { };
                byte[] IV = { 12, 21, 43, 17, 57, 35, 67, 27 };
                string encryptKey = "7k>3qt<9"; // MUST be 8 characters
                key = Encoding.UTF8.GetBytes(encryptKey);
                byte[] byteInput = new byte[inputString.Length];
                byteInput = Convert.FromBase64String(inputString);
                DESCryptoServiceProvider provider = new DESCryptoServiceProvider();
                memStream = new MemoryStream();
                ICryptoTransform transform = provider.CreateDecryptor(key, IV);
                CryptoStream cryptoStream = new CryptoStream(memStream, transform, CryptoStreamMode.Write);
                cryptoStream.Write(byteInput, 0, byteInput.Length);
                cryptoStream.FlushFinalBlock();
            }
            catch (Exception ex)
            {
                problems(ex);
            }

            Encoding encoding1 = Encoding.UTF8;
            return encoding1.GetString(memStream.ToArray());
        }

        public static object GetString(object _valor)
        {
            string resultado = "";

            if (_valor != DBNull.Value) {
                if (_valor != null)
                {
                    resultado = _valor.ToString().Replace("'", "''");
                }
            }

            return resultado;
        }

        public static string convertObjToString(object _valor)
        {
            string resultado = ".";

            if (_valor != DBNull.Value)
            {
                if (_valor != null)
                {
                    resultado = _valor.ToString();
                }
            }

            return resultado;
        }


        public static Dictionary<string, object> DataSetToDictionaryArray(DataSet _Ds)
        {
            Dictionary<string, object> dy_resultado = new Dictionary<string, object>();

            int countTabla = 0;
            foreach (DataTable dt in _Ds.Tables)
            {
                List<Dictionary<string, object>> lst = new List<Dictionary<string, object>>();
                foreach (DataRow dr in dt.Rows)
                {
                    Dictionary<string, object> dyList = new Dictionary<string, object>();

                    foreach (DataColumn dc in dt.Columns)
                    {
                        dyList.Add(dc.ColumnName, dr[dc.ColumnName]);
                    }

                    lst.Add(dyList);
                }

                dy_resultado.Add(dt.TableName, lst);
                countTabla++;

            }


            return dy_resultado;
        }

        public static void problems(Exception _ex)
        {

            writeLogError(_ex, null);
        }
        public static void problems(string _mensaje)
        {
            writeLogError(null, _mensaje);
        }

        public static bool writeLogError(Exception _ex, string _msg)
        {
            bool Bol_Estatus = false;
            string Texto = string.IsNullOrEmpty(_msg) ? "" : _msg.Replace("_SALTO_", @"\n");

            System.Diagnostics.StackTrace stacktrace = new System.Diagnostics.StackTrace();
            string nombre_metodo = stacktrace.GetFrame(1).GetMethod().Name;
            if (stacktrace.GetFrames().Count() > 2)
            {
                nombre_metodo = stacktrace.GetFrame(2).GetMethod().Name;
            }

            string ruta = "";
            ruta = HttpContext.Current.Server.MapPath("~");

            string nombre_log = "Log_" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            string strFile = ruta + @"\Descargas";
            if (Directory.Exists(strFile)) {
                Directory.CreateDirectory(strFile);
            }
            strFile = ruta + @"\" + nombre_log;

            try
            {
                bool fileExists = File.Exists(strFile);

                using (StreamWriter writer = new StreamWriter(strFile, true))
                {
                    if (!fileExists)
                        File.Create(strFile);
                    writer.WriteLine(DateTime.Now.ToString("yyyyMMdd HH:mm:ss") + " " + nombre_metodo);
                    writer.WriteLine("  --> msg: " + Texto);

                    if (_ex != null)
                    {
                        writer.WriteLine("  --> source: " + (_ex != null ? _ex.Source.ToString() : "No indicado"));
                        writer.WriteLine("  --> stacktrace: " + (_ex != null ? _ex.StackTrace.ToString() : "No indicado"));
                    }
                }
            }
            catch (Exception exx)
            {
                string mes = exx.Message;
            }

            return Bol_Estatus;
        }

        public static string GetIncidentReport(DataSet _dsrow)
        {
            DataTable dtreport = new DataTable();
            string nombreReport = "";

            try
            {
                foreach (DataTable dtrow in _dsrow.Tables)
                {
                    foreach (DataRow drrow in dtrow.Rows)
                    {
                        if (drrow["estatusProcedimiento"].ToString() != Utils._OK_)
                        {
                            DataRow drreport = dtreport.NewRow();
                            drreport.ItemArray = drrow.ItemArray;

                            dtreport.Rows.Add(drreport);
                        }
                    }
                }

                if (Utils.Valida_Fuente_Datos(dtreport))
                {
                    nombreReport = Utils.Crear_Excel(dtreport, $"IncidentReport_{DateTime.Now.ToString("yyyyMMddhhmm")}");
                }
            }
            catch (Exception ex)
            {
                Utils.problems(ex);
            }

            return nombreReport;
        }

        public static bool Result_OK(DataTable _Dt_Result)
        {
            bool proceso_ok = true;
            try
            {

                if (Valida_Fuente_Datos(_Dt_Result))
                {

                    proceso_ok = (_Dt_Result.Rows[0]["estatusProcedimiento"].ToString() == _OK_);
                }
            }
            catch (Exception ex)
            {
                problems(ex);
            }

            return proceso_ok;
        }

        public static Boolean Valida_Fuente_Datos(DataTable _Dt)
        {
            Boolean Valida = false;
            if (_Dt != null)
            {
                if (_Dt.Rows.Count > 0)
                {
                    Valida = true;
                }
            }
            return Valida;
        }

        public static DataTable formatTarjetas(DataTable _Dt)
        {
            DataTable dtformateada = new DataTable();
            dtformateada = _Dt.Clone();
            dtformateada.TableName = "ClientesTarjetas";
            dtformateada.Columns.Add("tarjeta");

            if (Valida_Fuente_Datos(_Dt))
            {
                foreach (DataRow dr in _Dt.Rows)
                {
                    DataRow drf = dtformateada.NewRow();

                    drf["idClienteTarjeta"] = dr["idClienteTarjeta"];
                    drf["stridClienteTarjeta"] = dr["stridClienteTarjeta"];
                    drf["ultimos4Digitos"] = dr["ultimos4Digitos"];
                    drf["tarjeta"] = "XXXX - XXXX - XXXX - " + dr["ultimos4Digitos"].ToString();
                    drf["titular"] = dr["titular"];
                    //drf["banco"] = dr["banco"];

                    dtformateada.Rows.Add(drf);

                }
            }



            return dtformateada;
        }
        public static DataTable formatTarjetasPago(DataTable _Dt)
        {
            DataTable dtformateada = new DataTable();
            dtformateada = _Dt.Clone();
            dtformateada.TableName = "PeticionesPagos";
            dtformateada.Columns.Add("tarjeta");

            if (Valida_Fuente_Datos(_Dt))
            {
                foreach (DataRow dr in _Dt.Rows)
                {
                    DataRow drf = dtformateada.NewRow();

                    drf["idPeticionPago"] = dr["idPeticionPago"];
                    drf["ultimos4Digitos"] = dr["ultimos4Digitos"];
                    drf["tarjeta"] = "XXXX - XXXX - XXXX - " + dr["ultimos4Digitos"].ToString();
                    drf["numTrabajadores"] = dr["numTrabajadores"];
                    //drf["banco"] = dr["banco"];

                    dtformateada.Rows.Add(drf);

                }
            }



            return dtformateada;
        }

        public static Boolean Valida_Fuente_Datos(DataRow _Dr)
        {
            Boolean Valida = false;
            if (_Dr != null)
            {
                if (Valida_Arreglos(_Dr.ItemArray))
                {
                    Valida = true;
                }
            }
            return Valida;
        }
        /// <summary> Metodo que valida un data set aplicando la regla de que no sea nula y tenga tablas
        /// </summary>
        /// <param name="_Ds">Indique el dataset a validar</param>
        /// <returns>true  si no es nula y tiene tablas</returns>
        public static Boolean Valida_Fuente_Datos(DataSet _Ds)
        {
            Boolean Valida = false;
            if (_Ds != null)
            {
                if (_Ds.Tables != null)
                {
                    if (_Ds.Tables.Count > 0)
                    {
                        Valida = true;
                    }
                }
            }
            return Valida;
        }
        public static Boolean Valida_Fuente_Datos(object _obj)
        {
            Boolean Valida = false;
            try
            {
                if (_obj != null)
                {
                    if (_obj is DataTable)
                    {
                        DataTable _Dt = (DataTable)_obj;
                        Valida = Valida_Fuente_Datos(_Dt);
                    }
                    else if (_obj is DataRow)
                    {
                        DataRow _dr = (DataRow)_obj;
                        Valida = Valida_Fuente_Datos(_dr);
                    }
                }
            }
            catch (Exception ex)
            {
                problems(ex);
            }
            return Valida;
        }

        public static object GetLast4Digit(string _Cadena)
        {
            string resultado = "";
            try
            {
                if (_Cadena.Length > 8)
                {
                    int inicio = _Cadena.Length - 4;

                    resultado = _Cadena.Substring(inicio, 4);
                }
            }
            catch (Exception ex)
            {
                problems(ex);
            }


            return resultado;
        }

        public static Boolean Valida_Arreglos(Array _Arreglo)
        {
            Boolean Valida = false;
            if (_Arreglo != null)
            {
                if (_Arreglo.Length > 0)
                {
                    Valida = true;
                }
            }
            return Valida;
        }

        public static DataTable SchemaDtResult_V2()
        {
            DataTable dtSchema = new DataTable();
            dtSchema.Columns.Add("estatusProcedimiento");
            dtSchema.Columns.Add("mensajeProcedimiento");

            DataRow dr = dtSchema.NewRow();
            dtSchema.Rows.Add(dr);
            dtSchema.TableName = "Result";
            return dtSchema;
        }

        public static DataTable ImportarArchivo(string _Archivo)
        {
            DataTable dt_importado = new DataTable();

            try
            {
                DataTable dt = new DataTable();
                DataTable Dt_Problemas_Importacion = new DataTable();
                string Ruta_Destino = HttpContext.Current.Server.MapPath("~") + @"UploadedDocuments\" + _Archivo;

                FileStream Ruta;
                Ruta_Destino = Ruta_Destino.Replace(@"\\", @"\");
                //Accesamos el archivo que se acaba de importar y que ahora esta en la carpeta de nuestro proyecto
                Ruta = File.Open(Ruta_Destino, FileMode.Open, FileAccess.Read);
                //IExcelDataReader excelReader = ExcelReaderFactory.CreateOpenXmlReader(Ruta);
                //var result = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                //{
                //    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                //    {
                //        UseHeaderRow = true
                //    }
                //});


                DataTable dataInExcelSheet = new DataTable();
                IExcelDataReader excelReader = ExcelReaderFactory.CreateReader(Ruta);
                DataSet excelDataSet = excelReader.AsDataSet(new ExcelDataSetConfiguration()
                {
                    UseColumnDataType = false,
                    ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                    {
                        UseHeaderRow = true
                    }
                }).ToAllStringFieldsTruncDate();
                excelReader.Close();

                //Se lee y se convierte en un DataTable para su mejor manejo y manipulación
                dt_importado = excelDataSet.Tables[0];

            }
            catch (Exception ex)
            {
                writeLogError(ex, null);
            }

            return dt_importado;
        }

        public static List<string> generarCodigoCarPool()
        {
            string codigo = "";
            List<string> codigos = new List<string>();

            try
            {
                Random rr = new Random();

                for (int j = 0; j < 5; j++)
                {
                    codigo = "";

                    for (int i = 0; i < 4; i++)
                    {
                        for (int letra = 0; letra < 4; letra++)
                        {


                            int posicion = 0;
                            int tipo = rr.Next(1, 3);

                            switch (tipo)
                            {

                                case 1:
                                    posicion = rr.Next(97, 122);
                                    codigo += Convert.ToChar(posicion);
                                    break;
                                case 2:
                                    posicion = rr.Next(0, 9);
                                    codigo += posicion.ToString();
                                    break;
                                case 3:
                                    posicion = rr.Next(65, 90);
                                    codigo += Convert.ToChar(posicion);
                                    break;
                                case 4:
                                    string cadena = "WwZzYyKk+¿?!=*.$#&";
                                    posicion = rr.Next(0, 17);
                                    codigo += cadena.ToCharArray()[posicion].ToString();

                                    break;
                            }

                        }

                        //codigo += " ";
                    }
                    
                    

                    codigos.Add(codigo);
                }


            }
            catch (Exception ex)
            {
                problems(ex);
            }


            return codigos;


        }

        public static string Crear_Excel(DataTable Dt_Datos, string _Titulo)
        {
            string resultado = "";


            string nombre_archivo = "Informe_" + DateTime.Now.ToString("ddMMyyyyHHmm");
            nombre_archivo = nombre_archivo.Replace(".", "_").ToUpper() + ".xlsx";
            string Ruta_Archivo = HttpContext.Current.Server.MapPath("~") + @"\\Archivos_Para_Descarga\\" + nombre_archivo;

            try
            {
                using (var ew = new ExcelWriter(Ruta_Archivo))
                {
                    int colheader = 1;
                    foreach (DataColumn dc in Dt_Datos.Columns)
                    {
                        ew.Write(dc.ColumnName, colheader, 1, SwiftExcel.DataType.Text);
                        colheader++;
                    }

                    int row = 2;
                    foreach (DataRow drDatos in Dt_Datos.Rows)
                    {
                        int col = 1;
                        foreach (DataColumn dcDatos in Dt_Datos.Columns)
                        {

                            string datovalor = "";
                            if (drDatos[dcDatos.ColumnName] != null)
                            {
                                datovalor = drDatos[dcDatos.ColumnName].ToString();
                            }
                            ew.Write(datovalor, col, row);
                            col++;
                        }
                        row++;
                    }
                }

                resultado = nombre_archivo;
            }
            catch (Exception ex)
            {
                problems(ex);
            }

            return resultado;
        }

        public static DataTable Agrupar_Fuente(string _ID, string _Nombre, DataTable dt_Fuente)
        {
            DataTable dt_Resultado = new DataTable();
            if (!string.IsNullOrEmpty(_ID)
                && !string.IsNullOrEmpty(_Nombre))
            {
                if (Valida_Fuente_Datos(dt_Fuente))
                {
                    if (dt_Fuente.Columns.Contains(_ID) && dt_Fuente.Columns.Contains(_Nombre))
                    {
                        dt_Resultado = dt_Fuente.AsEnumerable()
                               .GroupBy(r => new { Col1 = r[_ID], Col2 = r[_Nombre] })
                               .Select(g => g.OrderBy(r => r[_ID]).First())
                               .CopyToDataTable();
                    }
                    else
                    {
                        ///Tratamos de regresar por lo menos el esquema
                        dt_Resultado = dt_Fuente.Clone();
                    }
                }
                else if (dt_Fuente.Columns != null)
                {
                    ///Tratamos de regresar por lo menos el esquema
                    dt_Resultado = dt_Fuente.Clone();
                }
                else
                {
                }
            }
            else
            {
            }

            return dt_Resultado;
        }
        public static DataTable Agrupar_Fuente_Limpia(string[] _Columnas, DataTable dt_Fuente)
        {
            return Agrupar_Fuente_Limpia(_Columnas, dt_Fuente, false);
        }

        public static DataTable Agrupar_Fuente_Limpia(string[] _Columnas, DataTable dt_Fuente, bool Con_Conteo)
        {
            DataTable dt_resultado = new DataTable();
            if (_Columnas.Length > 0)
            {
                if (Valida_Fuente_Datos(dt_Fuente))
                {

                    foreach (DataColumn dc in dt_Fuente.Columns)
                    {
                        if (_Columnas.Contains(dc.ColumnName))
                        {
                            dt_resultado.Columns.Add(dc.ColumnName, dc.DataType);
                        }
                    }

                    string _elemento_grupo = _Columnas[0];
                    if (dt_Fuente.Columns.Contains(_elemento_grupo))
                    {
                        DataTable dt_agrupada = dt_Fuente.AsEnumerable()
                               .GroupBy(r => new { Col1 = r[_elemento_grupo] })
                               .Select(g => g.OrderBy(r => r[_elemento_grupo]).First())
                               .CopyToDataTable();

                        if (Con_Conteo && !dt_resultado.Columns.Contains("Conteo_Por_Grupo"))
                        {
                            dt_resultado.Columns.Add("Conteo_Por_Grupo", typeof(int));
                        }
                        foreach (DataRow dr in dt_agrupada.Rows)
                        {

                            DataRow drnuevo = dt_resultado.NewRow();
                            foreach (DataColumn dcfinal in dt_resultado.Columns)
                            {

                                if (dt_agrupada.Columns.Contains(dcfinal.ColumnName))
                                {
                                    drnuevo[dcfinal.ColumnName] = dr[dcfinal.ColumnName];
                                }

                            }
                            if (Con_Conteo && dt_resultado.Columns.Contains("Conteo_Por_Grupo"))
                            {
                                DataView dv = new DataView(dt_Fuente, _elemento_grupo + "=" + "'" + dr[_elemento_grupo] + "'", null, DataViewRowState.CurrentRows);
                                drnuevo["Conteo_Por_Grupo"] = dv.Count;
                            }
                            dt_resultado.Rows.Add(drnuevo);
                        }
                    }
                }
            }



            return dt_resultado.Copy();
        }


       public static string GetValue_Campo(object _Campo)
        {
            string str_valor = "";
            if ((_Campo != DBNull.Value))
                str_valor = _Campo.ToString();
            else
                str_valor = "INDEFINIDA";

            return str_valor;
        }
        public static DateTime? getValueToSPDate(object _Valor)
        {
            DateTime? resultado = null;
            try
            {
                if (_Valor == null)
                {
                    // Regrese DBNUL.Value;
                }
                else if (!string.IsNullOrEmpty(_Valor.ToString()))
                {
                    resultado = DateTime.Parse(_Valor.ToString(), FORMATO_FECHA);
                }

            }
            catch (Exception ex)
            {

                string strfecha = _Valor.ToString();
                strfecha = strfecha.Replace("ENE", "01");
                strfecha = strfecha.Replace("FEB", "02");
                strfecha = strfecha.Replace("MAR", "03");
                strfecha = strfecha.Replace("ABR", "04");
                strfecha = strfecha.Replace("MAY", "05");
                strfecha = strfecha.Replace("JUN", "06");
                strfecha = strfecha.Replace("JUL", "07");
                strfecha = strfecha.Replace("AGO", "08");
                strfecha = strfecha.Replace("SEP", "09");
                strfecha = strfecha.Replace("OCT", "10");
                strfecha = strfecha.Replace("NOV", "11");
                strfecha = strfecha.Replace("DIC", "12");

                resultado = DateTime.Parse(strfecha, FORMATO_FECHA);

            }

            return resultado;
        }



        public static Dictionary<string, string> GetNombreDoctoPdf(string _Prefijo) {

            Dictionary<string, string> doctopdf = new Dictionary<string, string>();

            try
            {
                string prefijo = "Docto_";
                if (!string.IsNullOrEmpty(_Prefijo)) {
                    prefijo = _Prefijo;
                }
                string nombreDocumento = _Prefijo + DateTime.Now.ToString("yyyyMMddHHmmss") + ".pdf";
                string directorio = HttpContext.Current.Server.MapPath("../Archivos_Para_Descarga");
                string rutaCompleta = directorio + @"/" + nombreDocumento;

                if (!Directory.Exists(directorio)) {
                    Directory.CreateDirectory(directorio);
                }

                doctopdf.Add("nombreDocumento", nombreDocumento);
                doctopdf.Add("rutaCompleta", rutaCompleta);

            }
            catch (Exception ex)
            {
                problems(ex);
            }

            return doctopdf;
        }
    }
}