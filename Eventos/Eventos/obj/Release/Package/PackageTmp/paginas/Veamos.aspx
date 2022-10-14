<%@ Page Title="" Language="C#" MasterPageFile="~/paginas/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Veamos.aspx.cs" Inherits="veamosmty.paginas.Veamos" %>
<%@ Import Namespace="veamosmty.Data" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../js/pages/Veamos.js?<% = Sezzion.codigoSession %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedorPrincipal" class="container-fluid mk-height-full">
        <div hidden>
            <a id="Btn_Descargar_Reporte_Excel_Generado" href="#" target="_blank"></a>
        </div>
        <div id="Card_Listado" class="card mk-card">
            <div class="card-title">
                <h4>Procesando...</h4>
                
            </div>
            <div id="Card_Listado_Body" class="card-body">
                
            </div>
            <div id="Card_Listado_footer" class="card-footer">
            </div>
        </div>



        <!-- /# card -->


        <div id="Seccion_Modales"></div>
       


    </div>
</asp:Content>
