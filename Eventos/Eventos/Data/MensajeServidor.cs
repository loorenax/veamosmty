using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace veamosmty.Data
{
    public class MensajeServidor
    {
        public string Estatus { get; set; }
        public string Mensaje { get; set; }
        public string Mensaje_Error { get; set; }

        public string Str_Respuesta_1 { get; set; }
        public string Str_Respuesta_2 { get; set; }
        public string Str_Respuesta_3 { get; set; }
        public string Str_Respuesta_4 { get; set; }
        public string Str_Respuesta_5 { get; set; }



        public string idUsuario { get; set; }
        public string login { get; set; }
        public string nombreCompleto { get; set; }
        public string Str_Fecha_Actual { get; set; }
    }
}