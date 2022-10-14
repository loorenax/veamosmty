using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace veamosmty.reportes
{
    public class iTextSharpHelper
    {

        public iTextSharp.text.Rectangle Hoja = new iTextSharp.text.Rectangle(PageSize.LETTER);
        public iTextSharp.text.Rectangle Hoja_Valida = new iTextSharp.text.Rectangle(PageSize.LETTER);
        
        public Document Documento;
        //public   float Espacio_Impresion = Documento.PageSize.Width - 1;
        public float Espacio_Impresion;

        public PdfWriter Archivo = null/* TODO Change to default(_) if this is not a reference type */;
        public bool Girar_Hoja = false;

        //Se utilizan para generar un documento alterno y evaluar si ya es necesario hacer un salto de linea.
        public Document Documento_Valida = null;
        public PdfWriter Archivo_Valida = null;
        public float Alto = 0;
        public Document document = null;
        public PdfWriter archivo = null;
        public int Pagina_Documento = 0;

        public int[] Negro = new[] { 0, 0, 0 };
        public int[] Rojo = new[] { 255, 0, 0 };
        public int[] Blanco = new[] { 255, 255, 255 };
        public int[] Gris = new[] { 153, 153, 153 };

        public int[] Primario = new[] { 0, 53, 148 };
        public int[] Verde_Tam = new[] { 151, 201, 61 };
        public int[] Secundario = new[] { 235, 235, 235 };
        public int[] Azul_Claro_Tam = new[] { 67, 180, 228 };
        public int[] Azul_Claro_Tam_borde = new[] { 255, 67, 180, 228 };
        public int[] Color_Borde_Celda = { 123, 126, 127 }; //Negro
        public const int Negrita = 1;
        public const int Normal = 0;
        public const int Italica = 2;

        public int[] Row_Fondo_Gris = new[] { 240, 237, 225 };
        public int[] Row_Fondo_Azulito = new[] { 201, 237, 231 };

        public PdfPTable T_Elemento_Header;

        public PdfPCell Arma_Celda_Detallada(string Contenido, bool Es_Imagen, int[] Color_Letra, int Grosor, int Size_Letra, int[] Color_Fondo, int Posicion_Vertical, int Posicion_Horizontal, int Celdas)
        {
            PdfPTable pdfTabla = new PdfPTable(1);
            pdfTabla.TotalWidth = Espacio_Impresion;
            pdfTabla.WidthPercentage = 99;


            PdfPCell pdfCelda = null/* TODO Change to default(_) if this is not a reference type */;
            var Letra = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, Size_Letra, Grosor, new BaseColor(Color_Letra[0], Color_Letra[1], Color_Letra[2]));
            iTextSharp.text.Image image = null/* TODO Change to default(_) if this is not a reference type */;
            bool Imagen_Problema = false;

            if (Es_Imagen)
            {
                if (File.Exists(Contenido))
                {
                    try
                    {
                        image = iTextSharp.text.Image.GetInstance(Contenido);
                        pdfCelda = new PdfPCell(image, true);
                    }
                    // pdfCelda.FixedHeight = 90
                    catch
                    {
                        Imagen_Problema = true;
                    }
                }
                else
                    Imagen_Problema = true;
            }
            else
                pdfCelda = new PdfPCell(new Phrase(Contenido, Letra));

            pdfCelda.Colspan = Celdas;
            pdfCelda.VerticalAlignment = Posicion_Vertical;
            pdfCelda.HorizontalAlignment = Posicion_Horizontal;
            pdfCelda.UseAscender = false;
            pdfCelda.BackgroundColor = new BaseColor(Color_Fondo[0], Color_Fondo[1], Color_Fondo[2]);

            return pdfCelda;
        }
        public PdfPCell Arma_Celda_Detallada_Imagen(string Ruta, float Alto, int[] Color_Fondo, int Posicion_Vertical, int Posicion_Horizontal, int Celdas)
        {
            PdfPTable pdfTabla = new PdfPTable(25);
            PdfPCell pdfCelda = null/* TODO Change to default(_) if this is not a reference type */;
            iTextSharp.text.Image image = null/* TODO Change to default(_) if this is not a reference type */;
            bool Imagen_Problema = false;

            if (File.Exists(Ruta))
                image = iTextSharp.text.Image.GetInstance(Ruta);
            else
            {
                string rutaimagenerror = HttpContext.Current.Server.MapPath("~") + @"\\Recursos\\img\\image_64x64_Azul.png";
                image = iTextSharp.text.Image.GetInstance(rutaimagenerror);
            }

            pdfCelda = new PdfPCell(image, true);
            pdfCelda.FixedHeight = Alto;

            pdfCelda.Colspan = Celdas;
            pdfCelda.VerticalAlignment = Posicion_Vertical;
            pdfCelda.HorizontalAlignment = Posicion_Horizontal;
            pdfCelda.UseAscender = false;
            pdfCelda.BackgroundColor = new BaseColor(Color_Fondo[0], Color_Fondo[1], Color_Fondo[2]);

            return pdfCelda;
        }

        public float[] getArrayEspacios(int icolumns)
        {
            float[] arrayespacio = new float[icolumns];

            for (int i = 0; i < icolumns; i++)
            {
                arrayespacio[i] = Espacio_Impresion / icolumns;
            }
            return arrayespacio;
        }

        public PdfPCell Arma_Celda_Detallada_ImagenQR(byte[] Ruta, float Alto, int[] Color_Fondo, int Posicion_Vertical, int Posicion_Horizontal, int Celdas)
        {
            PdfPTable pdfTabla = new PdfPTable(25);
            PdfPCell pdfCelda = null/* TODO Change to default(_) if this is not a reference type */;
            iTextSharp.text.Image image = null/* TODO Change to default(_) if this is not a reference type */;
            bool Imagen_Problema = false;

            if (Ruta != null)
            {
                try
                {
                    image = iTextSharp.text.Image.GetInstance(Ruta);
                    pdfCelda = new PdfPCell(image, true);
                    pdfCelda.FixedHeight = Alto;
                }
                catch
                {
                    Imagen_Problema = true;
                }
            }
            else
                Imagen_Problema = true;

            pdfCelda.Colspan = Celdas;
            pdfCelda.VerticalAlignment = Posicion_Vertical;
            pdfCelda.HorizontalAlignment = Posicion_Horizontal;
            pdfCelda.UseAscender = false;
            pdfCelda.BackgroundColor = new BaseColor(Color_Fondo[0], Color_Fondo[1], Color_Fondo[2]);

            return pdfCelda;
        }
        
        public PdfPTable CrearTabla_Generica(DataTable Tabla_)
        {
            PdfPCell Celda = new PdfPCell();
            PdfPTable Tabla_Creada = new PdfPTable(1);
            Tabla_Creada.TotalWidth = Espacio_Impresion;
            Tabla_Creada.WidthPercentage = 99;

            Boolean Crear_Tabla_Vacia = true;
            if (Tabla_ is DataTable)
                if (Tabla_.Rows.Count > 0 && Tabla_.Columns.Count > 0)
                {
                    Crear_Tabla_Vacia = false;
                    DataTable Tabla = new DataTable();
                    Tabla = Tabla_;
                    #region Determina el número de columnas de la tabla
                    int Columnas_Tabla = 0;
                    Columnas_Tabla = Tabla_.Columns.Count;

                    #endregion Determina el número de columnas de la tabla

                    Tabla_Creada = new PdfPTable(Columnas_Tabla);
                    Tabla_Creada.TotalWidth = Espacio_Impresion;
                    Tabla_Creada.WidthPercentage = 99;

                    foreach (DataColumn Dc in Tabla.Columns)
                    {
                        Celda = new PdfPCell(Arma_Celda_Detallada(Dc.ColumnName.Replace('_', ' '), false, Blanco, Negrita, 6, Primario, Element.ALIGN_BOTTOM, Element.ALIGN_CENTER, 1));
                        Tabla_Creada.AddCell(Arma_Celda_Detallada(Celda));
                    }

                    foreach (DataRow Dr in Tabla.Rows)
                        foreach (DataColumn Dc in Tabla.Columns)
                        {
                            String Contenido_Celda = string.Empty;
                            if (Dr[Dc].GetType().Name == "DateTime")
                            {
                                DateTime _Fecha = DateTime.Parse(Dr[Dc].ToString());
                                Contenido_Celda = _Fecha.ToString(Utils.Fecha_Formato_AAAA_MMM_DD + " " + Utils.Hora_Formato_HH_MM_AM_PM);
                            }
                            else
                            {
                                Contenido_Celda = Dr[Dc].ToString().Trim();
                            }
                            Celda = new PdfPCell(Arma_Celda_Detallada(Contenido_Celda, false, Negro, Normal, 8, Blanco, Element.ALIGN_TOP, Element.ALIGN_LEFT, 1));
                            Tabla_Creada.AddCell(Arma_Celda_Detallada(Celda));

                        }
                    return Tabla_Creada;
                }


            if (Crear_Tabla_Vacia)
            {
                PdfPCell Celda_Salto = Arma_Celda_Detallada(" ", false, Negro, Negrita
                                                    , 6
                                                    , Blanco, Element.ALIGN_MIDDLE, Element.ALIGN_CENTER
                                                    , 1);
                Tabla_Creada.AddCell(Celda_Salto);

            }
            return Tabla_Creada;
        }
        public PdfPCell Arma_Celda_Detallada(PdfPCell Celda)
        {
            Celda.BorderColor = new BaseColor(Color_Borde_Celda[0], Color_Borde_Celda[1], Color_Borde_Celda[2]);
            return Celda;
        }
        public Phrase Texto_Formateado(String Contenido, int[] Color_Letra, int Grosor, int Size_Letra, int[] Color_Fondo)
        {
            var Letra = new iTextSharp.text.Font(iTextSharp.text.Font.NORMAL, Size_Letra, Grosor, new BaseColor(Color_Letra[0], Color_Letra[1], Color_Letra[2]));
            //iTextSharp.text.Font Letra = FontFactory.GetFont("novecento wide normal", Size_Letra, Grosor, new BaseColor(Color_Letra[0], Color_Letra[1], Color_Letra[2]));
            Paragraph Leyenda_Completa = new Paragraph();

            Phrase pContenido = new Phrase(Contenido, Letra);
            Chunk c = new Chunk(Contenido, Letra);
            c.setLineHeight(float.Parse(Size_Letra.ToString()) * 1.5f);
            Leyenda_Completa.Add(c);

            return Leyenda_Completa;
        }


        public void Agregar_Al_Documento(PdfPTable T_Elemento)
        {
            Documento_Valida.Add(T_Elemento);

            float Alto_Elemento = T_Elemento.TotalHeight;

            if (Alto_Elemento > Alto) //Ya no cabe
            {
                Documento.NewPage();
                Alto = Documento.PageSize.Height - 80; //Solo estoy considerando el alto de los logos

                Agregar_Al_Documento(T_Elemento_Header);
            }

            Documento.Add(T_Elemento);

            Alto = Alto - Alto_Elemento;

        }

        public PdfPTable Renglon_Vacio()
        {

            PdfPTable TVacia = new PdfPTable(1);
            TVacia.TotalWidth = Espacio_Impresion;
            TVacia.WidthPercentage = 99;
            TVacia.SetWidths(new float[] { Espacio_Impresion });

            PdfPCell cell_renglon_vacio = Arma_Celda_Detallada(" ", false, Negro, Negrita, 10, Blanco, Element.ALIGN_MIDDLE, Element.ALIGN_CENTER, 2);
            cell_renglon_vacio.Border = 0;
            TVacia.AddCell(cell_renglon_vacio);

            return TVacia;
        }

        public PdfPTable Subtitulo(string _titulo)
        {

            PdfPTable TVacia = new PdfPTable(1);
            TVacia.TotalWidth = Espacio_Impresion;
            TVacia.WidthPercentage = 99;
            TVacia.SetWidths(new float[] { Espacio_Impresion });

            PdfPCell cell_renglon_vacio = Arma_Celda_Detallada(_titulo, false, Negro, Negrita, 14, Blanco, Element.ALIGN_MIDDLE, Element.ALIGN_CENTER, 1);
            cell_renglon_vacio.Border = 0;
            TVacia.AddCell(cell_renglon_vacio);

            return TVacia;
        }
    }
}