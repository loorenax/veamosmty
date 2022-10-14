document.addEventListener('DOMContentLoaded', function () {

    try {

        localStorage.clear();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }


});


function BtnLoginClick() {


    try {

        var Btn_Login = document.getElementById('Btn_Login');
        var login_form = document.getElementById('login_form');

        if (fg_valida_captura_seccion(login_form.id)) { 

            var obj_filtros = Object();
            obj_filtros.P_nombreUsuario = $('#Login').val();
            obj_filtros.P_pass = $('#Password').val();


            var icono_inicial = fg_Cambiar_Icono_DOM(Btn_Login, _SPINNER_);
        var ruta = '../Services/WSSeguridad.asmx/GetAutenticacion';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(Btn_Login, icono_inicial);

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    //fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {
                        localStorage.setItem('Login', _OK_);
                        location.href = _PAGINA_PRINCIPAL_;
                    }

                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_Cambiar_Icono_DOM(Btn_Login, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }
        });

        }


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
        


}
