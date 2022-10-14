
document.addEventListener('DOMContentLoaded', function () {


    try {
        location.href = '../paginas/Registro.aspx';
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});