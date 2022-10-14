<%@ Page Title="" Language="C#" MasterPageFile="~/paginas/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="veamosmty.paginas.Inicio" %>

<%@ Import Namespace="veamosmty.Data" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../js/pages/Inicio.js?<% = Sezzion.codigoSession %>"></script>


    <style>
        .recent-comment .media-left img {
            width: 70px;
        }

        .recent-comment .separador {
            border-bottom: 1px solid #ebebeb;
            margin-bottom: 10px;
        }

        .row label input {
            margin-right: 10px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid mk-height-full" style="display:flex;">

        <div id="ListAlumnos" style="width:100%;">
        </div>
        <div id="ListAvisos" style="width:300px">
        </div>
    </div>
</asp:Content>
