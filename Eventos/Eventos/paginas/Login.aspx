<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="veamosmty.paginas.Login" %>
<%@ Import Namespace="veamosmty.Data" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>SEVENT</title>


    <!-- ================= Favicon ================== -->
    <link rel="icon" href="../assetscustom/images/Icono.ico">

    <!-- Styles -->
    <link href="../assets/css/lib/font-awesome.min.css" rel="stylesheet">
    <link href="../assets/css/lib/themify-icons.css" rel="stylesheet">
    <link href="../assets/css/lib/bootstrap.min.css" rel="stylesheet">
        <!-- Sweet Alert -->
    <link href="../assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet">

    <link href="../assets/css/lib/helper.css" rel="stylesheet">
    <link href="../assets/css/style.css?v1.Fix220808" rel="stylesheet">


    <style>
        body {
            font-size: 12px;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            height: 100%;
            line-height: 1.7;
            vertical-align: baseline;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
    color: #fff;
    background-color: #1C2833;
        }

        .unix-login {
            height: 100%;
        }

        .container-fluid {
            height: 100%;
        }

        .unix-login .row {
            height: 100%;
        }

        .login-content {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .login-form {
                background: transparent;
/*            border-radius: 4px;
            -webkit-box-shadow: 0px 5px 49px 0px rgb(0 0 0 / 50%);
            box-shadow: 0px 5px 49px 0px rgb(0 0 0 / 50%);
*/
        }

            .login-form h4 {
                margin-bottom: 25px;
            }

        label {
            margin-bottom: 0px;
        }

        .form-control:focus, .form-control.active {
            box-shadow: 1px 0px 4px 1px #d2e3eb;
            border-color: #eef5f9;
        }

        .social-button {
            display: flex;
        }
        .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6.h1 {
            color: #fff;
        }
        .login-form label {
            color: #fff;
            text-transform: uppercase;
        }

        @media only screen and (min-width: 768px) {
            .login-form {
                background: #1C2833;
                border-radius: 4px;
                -webkit-box-shadow: 0px 5px 49px 0px rgb(0 0 0 / 50%);
                box-shadow: 0px 5px 49px 0px rgb(0 0 0 / 50%);
            }
        }
    </style>

</head>
<body>

    <div class="unix-login">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="login-content">
                        <div id="login_form" class="login-form">

<%--                            <div class="login-logo">
                                <img src="../assetscustom/images/Logo.png" />
                            </div>--%>

                            <h3 class="text-center mt-3 mb-3 font-weight-bold">SEVENT</h3>
                            <form>
                                <div class="form-group">
                                    <label>Correo electrónico</label>
                                    <input id="Login" type="email" class="form-control" placeholder="Correo electrónico" autocomplete="off" required>
                                </div>
                                <div class="form-group">
                                    <label>Contraseña</label>
                                    <input id="Password" type="password" class="form-control" placeholder="Contraseña" required>
                                </div>

                                <div class="checkbox" hidden>
                                    <label>
                                        <input type="checkbox">
                                        Remember Me
								
                                    </label>
                                    <label class="pull-right">
                                        <a href="#">Forgotten Password?</a>
                                    </label>

                                </div>
                                <button id="Btn_Login" type="button" onclick="BtnLoginClick();" class="btn btn-primary btn-flat m-b-30 mt-5">Entrar</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

<!-- Common -->
<script src="../assets/js/lib/jquery.min.js"></script>
<script src="../assets/js/lib/jquery.nanoscroller.min.js"></script>
<script src="../assets/js/lib/menubar/sidebar.js"></script>
<script src="../assets/js/lib/preloader/pace.min.js"></script>
<script src="../assets/js/lib/bootstrap.min.js"></script>
<script src="../assets/js/scripts.js"></script>

    <!-- Sweet Alert -->
    <script src="../assets/js/lib/sweetalert/sweetalert.min.js"></script>

<script src="../js/helpers/Funciones_Generales.js?<% = Sezzion.codigoSession %>"></script>
<script src="../js/pages/login.js?<% = Sezzion.codigoSession %>"></script>

</html>


