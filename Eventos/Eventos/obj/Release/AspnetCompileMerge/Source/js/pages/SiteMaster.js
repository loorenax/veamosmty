
document.addEventListener('DOMContentLoaded', function () {

    try {

        //var myVar = setInterval(getCheckSession, 60000);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
});


function getCheckSession() {
    try {

        var obj_filtros = new Object();

        console.log('Check Session');
        var ruta = '../Services/WSSeguridad.asmx/CheckSession';
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

                var mensaje_servidor = JSON.parse(datos.d);


                if (mensaje_servidor.Estatus == _OK_) {
                    // nada que continue
                    console.log('Check Session: OK');
                }
                else {
                    console.log('Check Session: Caduco bye!!');
                    location.href = _PAGINA_LOGIN_;
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
                location.href = _PAGINA_LOGIN_;
            }
        });
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
        location.href = _PAGINA_LOGIN_;
    }
}
