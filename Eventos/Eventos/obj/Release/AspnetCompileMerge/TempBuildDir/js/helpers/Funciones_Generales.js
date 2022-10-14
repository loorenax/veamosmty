
var _LOCALE_ = 'es';
var _CERRAR_ = 'Cerrar';
var _CLASS_BTN_DEFAULT = 'btn-default';
var _CLASS_BTN_SUCCESS = 'btn-success';
var _CLASS_BTN_DANGER = 'btn-danger';

var Resultado_Controles_X_Agrupador = [];
var _PROBLEMA_ = 'Problema';
var _RESTRICCION_ = 'RESTRICCION';
var _SOLUCION_ = 'Solución';
var _INDEFINIDO_ = 'undefined';
var _DEFAULT_OPCION_CMB_ = '<-SELECCIONE->';
var _DEFAULT_OPCION_CMB_TODOS_ = 'Todos';

var _CLASS_CHECKED_ = `fa fa-check-square`;
var _CLASS_UNCHECKED_ = `fa fa-square`;
var _SPINNER_ = '<i class="fa fa-spinner fa-spin"></i>';


var _OK_ = 'OK';
var _RESTRICCION_ = 'RESTRICCION';
var _ERROR_ = 'ERROR';
const moonLanding = new Date('July 20, 69 00:20:18');
var _ANIO_ACTUAL_ = moonLanding.getFullYear();

var VENTANAS_ABIERTAS = null;

var formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});

//var _PAGINA_PRINCIPAL_ = '../dist/blak.html';
var _PAGINA_PRINCIPAL_ = '../paginas/Inicio.aspx';
var _PAGINA_LOGIN_ = '../paginas/Login.aspx';

var STATUS_PETICION = {
    Draft: 'Draft',
    Requested: 'Requested'
}


var _COLOR_INACTIVO_BG = '#fdebeb';
var _COLOR_INACTIVO_CL = '#bf888d';


var _DIAS_ = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
var _DIAS__ = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];


function fg_mensaje_problema_tecnico(e) {

    console.log(e);
    var mensaje = 'Existe un problema técnico, espere un momento e intente nuevamente.';
    if (e != null) {

        if (e.Mensaje != null) {
            mensaje = `Existe un problema técnico: ${e.Mensaje}`;
        }
        else if (e.message != null) {
            mensaje = `Existe un problema técnico: ${e.message}`;
        }

    }



    swal({
        title: "Problema técnico",
        text: mensaje,
        type: "error",
        //showCancelButton: true,
        //confirmButtonColor: "#DD6B55",
        //confirmButtonText: "Si, borrar!",
        //closeOnConfirm: true
    });
}
function fg_mensaje_aviso_restriccion(_mensaje, _solucion) {

    var solucion = (_solucion == null || _solucion == undefined) ? 'Adecue los datos e intenten nuevamente.' : _solucion;
    swal({
        title: "Restricción",
        text: `
                Mensaje: ${_mensaje}
                ${solucion}
               `,
        type: "warning",
        //showCancelButton: true,
        //confirmButtonColor: "#DD6B55",
        //confirmButtonText: "Si, borrar!",
        //closeOnConfirm: true
    });
}
function fg_mensaje_pregunta_nuevo_registro(_mensaje_aviso, _nombre_funcion_ejecutar_true, _nombre_funcion_ejecutar_false) {
    swal({
        title: _mensaje_aviso,
        /*text: _mensaje_aviso,*/
        type: "warning",
        html: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, un nuevo registro.",
        cancelButtonText:"No, salir",
        closeOnConfirm: true
    }, function (result) {

        if (result == true) {
            var fn = window[_nombre_funcion_ejecutar_true];
            if (typeof fn === 'function') {
                fn();
            }
        }
        else {
            var fn = window[_nombre_funcion_ejecutar_false];
            if (typeof fn === 'function') {
                fn();
            }
        }

    });

}
function fg_mensaje_pregunta(_mensaje_aviso, _nombre_funcion_ejecutar_true, _nombre_funcion_ejecutar_false) {
    swal({
        title: '¿Está seguro de continuar?',
        text: _mensaje_aviso,
        type: "warning",
        html: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, continuar.",
        closeOnConfirm: true
    }, function (result) {

        if (result == true) {
            var fn = window[_nombre_funcion_ejecutar_true];
            if (typeof fn === 'function') {
                fn();
            }
        }
        else {
            var fn = window[_nombre_funcion_ejecutar_false];
            if (typeof fn === 'function') {
                fn();
            }
        }

    });

}

function fg_mensaje_pregunta_warning(_mensaje_aviso, _nombre_funcion_ejecutar_true, _nombre_funcion_ejecutar_false) {
    swal({
        title: _mensaje_aviso,
        //text: "Este contenido no se puede recuperar!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, continuar.",
        closeOnConfirm: true
    }, function (result) {

        if (result == true) {
            var fn = window[_nombre_funcion_ejecutar_true];
            if (typeof fn === 'function') {
                fn();
            }
        }
        else {
            var fn = window[_nombre_funcion_ejecutar_false];
            if (typeof fn === 'function') {
                fn();
            }
        }

    });

}


function fg_alert_aviso_exitoso(_Title, _Mensaje) {

    toastr.success(_Mensaje, _Title, {
        "positionClass": "toast-bottom-center",
        timeOut: 2000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "150",
        "hideDuration": "500",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    })
}

function fg_alert_aviso_exitoso_pregunta(_Title, _Mensaje) {

    swal({
        title: _Title,
        text: _Mensaje,
        icon: "success",
        
    });
}


function fg_GetRow(_Dt, _Campo, _Valor) {

    var resultado;
    try {

        $.each(_Dt, function (key, value) {
            if (value[_Campo] == _Valor) {
                resultado = value;
                return false;
            }
        })

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return resultado;
}
function fg_cargar_combo_from_List(_cmb, _value, _descripcion, _dt, _con_seleccione) {
    try {

        var obj = _dt;

        ///Inicialimos las opciones
        var options = '';

        if (_con_seleccione) { //Si se indica que debe tener el elemento "Seleccione" se agrega la opción
            var options = '<option value="">' + _DEFAULT_OPCION_CMB_ + '</option>';
        }

        $(_cmb).empty();
        $(_cmb).append(options);

        $.each(obj, function (key, value) {
            var value_ID = value[_value];

            if (!fg_isEmptyOrNull(value_ID)) {
                if (value_ID.indexOf != undefined) {
                    if (value_ID.indexOf(' ') != -1) {
                        value_ID = value[_value].split(' ').join('_');
                    }
                }
                ///construimos la lista de opciones
                $(_cmb).append('<option value=' + value_ID + '>' + value[_descripcion] + '</option>');
            }



        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);

    }

}
function fg_isEmptyOrNull(str) {
    return (!str || 0 === str.length);
}
function fg_setIFRAMEControls(_Agrupador) {
    try {

        var CONTROLES = new Object();
        CONTROLES.controls = fg_obtener_controles_agrupador(_Agrupador);
        CONTROLES.this = document.getElementById(_Agrupador);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return CONTROLES;
}
function fg_Cambiar_Icono_DOM(_btn, _icono) {
    var icono_actual = '';

    if (_btn != null) {
        icono_actual = _btn.innerHTML;
        _btn.innerHTML = _icono;
    }
    return icono_actual;
}

/** Metodo para obtener un listado de los controles contenidos en un agrupador o div agrupador
 * @param {any} _HTMLCollention Indique la colección de elemento HTML
 */
function fg_controles_x_agrupador(_HTMLCollention) {
    //Iteramos cada elemento
    for (var i = 0; i < _HTMLCollention.length; i++) {
        var sigue = _HTMLCollention[i].tagName;

        //Verificamos si el elmento tiene un ID; se considerara que todos los elementos que tengan ID podran accesarse para obtener sus propiedades o generr un evento
        if (_HTMLCollention[i].id != undefined) {
            //Agregamos el control a array auxiliar
            Resultado_Controles_X_Agrupador.push(_HTMLCollention[i]);
        }
        //Verificamos si el elemento tiene mas elementos para tambien integrarlos en la lista
        if (_HTMLCollention[i].children != undefined) {

            //Si tiene mas elementos se invoca nuevamente a la funcion para recorlectar los controles
            fg_controles_x_agrupador(_HTMLCollention[i].children);
        }

    }
}
/**
 * Metodo para obtener un objeto con la lista de los controles que contiene el agrupador indicado
 * la lista ya contiene como tal los controles por lo que puede accesarse directamente a sus propiedades
 * @param {any} _Agrupador Indique el ID del control agrupador
 */
function fg_obtener_controles_agrupador(_Agrupador) {
    //Creamos el objeto que recibira la lista de los controles
    arreglo_Controles = new Object();

    //Es un arreglo auxiliar en el que almacenaremos transitivamente los controles
    Resultado_Controles_X_Agrupador = []; //Libero la variable
    var control_agrupador = document.getElementById(_Agrupador);
    if (control_agrupador != undefined) {

        //Obtenemos una lista de elementos del agrupador
        var Elementos_Agrupados = document.getElementById(_Agrupador).children;
        //Se va al metodo que realiza todo el proceso para ir recolectando los controles
        fg_controles_x_agrupador(Elementos_Agrupados);

        //El resultado de la recolección la pasamos al objecto para poder accesar los contoles en un estilo de clase
        for (var i = 0; i < Resultado_Controles_X_Agrupador.length; i++) {
            var control = Resultado_Controles_X_Agrupador[i];
            arreglo_Controles[control.id] = control;
        }

    }
    else {
        fg_mensaje_problema_tecnico(null);
    }

    Resultado_Controles_X_Agrupador = []; //Libero la variable

    return arreglo_Controles;
}


function fg_getTemplateInicioHijos(_Id) {

    var row = [
        {
            nombreAlumno: 'Canela Espinoza Cuevas', foto: '../assetscustom/fotos/002CANELA.PNG', grado: 'Sexto', CURP: 'EICC1309251B3'
            , tieneHistoriaClinica: 'unchecked', tieneHuskyPass: 'checked', tieneAcademias: 'checked', tieneCardPool: 'checked'
        }
        ,
        {
            nombreAlumno: 'Javier Espinoza Cuevas', foto: '../assetscustom/fotos/001JAVIER.PNG', grado: 'Cuarto', CURP: 'EICJ1506122C1'
            , tieneHistoriaClinica: 'checked', tieneHuskyPass: 'unchecked', tieneAcademias: 'checked', tieneCardPool: 'checked'
        }

    ]


    var tag = ``;
    try {
 
        tag = `
               <div class="alert alert-light mb-2">

                <div class="row separador">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="media-body">
                            <h5 class="media-heading">${row[_Id].nombreAlumno}</h5>
                            <p>Grado: <strong>${row[_Id].grado}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CURP: <strong>${row[_Id].CURP}</strong> </p>
                        </div>

                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-4 d-flex align-items-center">
                        <div class="row">
                            <div class="col-6">
                                <label><input type="checkbox" ${row[_Id].tieneHistoriaClinica}>Historia Clínica</label>
                            </div>
                            <div class="col-6">
                                <label><input type="checkbox" ${row[_Id].tieneHuskyPass}>Husky Pass</label>
                            </div>
                            <div class="col-6">
                                <label><input type="checkbox" ${row[_Id].tieneAcademias}>Academias</label>
                            </div>
                            <div class="col-6">
                                <label><input type="checkbox" ${row[_Id].tieneCardPool}>Car Pool</label>
                            </div>

                        </div>

                    </div>

                </div>
               </div>

               `;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag;
}

function fg_getTempleOpcionMenu(_Url, _Icono, _Descripcion) {

    var tag = `
                <li>
                    <a href="${_Url}">
                        <i class="${_Icono}"></i> ${_Descripcion}
                    </a>
                </li>
              `;

    return tag;
}


function fg_get_template_BtnEdit(_Prefijo_Btn, _Nombre_Evento, _ID) {

    var tag_template = ``;

    try {

        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-secondary" onclick="${_Nombre_Evento}('${_ID}');"><i class="fa fa-pencil"></i></button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}
function fg_get_template_BtnCancel(_Prefijo_Btn, _Nombre_Evento, _ID) {

    var tag_template = ``;

    try {

        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-danger" onclick="${_Nombre_Evento}('${_ID}');"><i class="fa fa-times"></i></button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}
function fg_get_template_BtnCancel_Reactivar(_Prefijo_Btn, _Nombre_Evento, _ID, _Activo) {

    var tag_template = ``;

    try {

        var clase = 'ti ti-trash';
        if (_Activo == 'NO') {
            clase = 'ti ti-check';
        }
        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-danger" onclick="${_Nombre_Evento}('${_ID}');"><i class="${clase}"></i></button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}

function fg_get_template_BtnReactivar(_Prefijo_Btn, _Nombre_Evento, _ID) {

    var tag_template = ``;

    try {

        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-operacion-detalle bg-reactivar" onclick="${_Nombre_Evento}('${_ID}');"><i class="fa fa-check"></i>Reactivar&nbsp;&nbsp;</button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}
function fg_get_template_BtnVer(_Prefijo_Btn, _Nombre_Evento, _ID) {

    var tag_template = ``;

    try {

        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-operacion-detalle" onclick="${_Nombre_Evento}('${_ID}');"><i class="fa fa-eye"></i></button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}


function fg_redimensionar_mkheightfull() {
    var alto = window.screen.height;
    // 979 = 76vh
    // alto = x

    var elementos = document.getElementsByClassName('mk-height-full');
    if (elementos != null) {
        var mkheight = elementos[0];
    }

    var calculo = (alto * 70) / 979;
    mkheight.style.height = `${calculo}vh`;


}


function fg_importar_excel(_Fl_Importa, _GuardarComo, _Carpeta) {

    //var directorio = 'CasosImportados/';

    try {
        //fg_registrar_log_error('inicia fg_importar_excel');
        //Se carga el archivo
        var Archivos = $(_Fl_Importa).get(0).files;
        var data = new FormData();
        var url;
        var _out = new Object();
        _out.Estatus = false;

        var fReader = new FileReader();
        fReader.readAsDataURL(_Fl_Importa.files[0]);
        fReader.onloadend = function (event) {
            data.append("file", event.target.result);
        }

        if (Archivos.length > 0) {
            for (i = 0; i < Archivos.length; i++) {
                //se carga el objeto con los datos necesarios para subirlo al proyecto
                data.append("file", Archivos[i]);
                data.append("nombre", Archivos[i].name);
                //data.append("url", directorio);
                data.append("extensiones", '.xls,.xlsx'); //Le enviamos la lista de extensiones validas
                data.append("saveas", _GuardarComo); //Solo es para respetar el parametro
                data.append("carpeta", _Carpeta); //Solo es para respetar el parametro
            }

            //url = '../../' + directorio + Archivos[0].name;

            //Proceso que efectual el guardado del archivo a los directorios específicados.
            var mensaje_servidor = fg_guardar_archivo_directorio(data);

            if (mensaje_servidor != null) {
                if (mensaje_servidor.Estatus == _ERROR_) {
                    _out.Estatus = false;
                    _out.Mensaje = mensaje_servidor.Mensaje;
                    _out.Informe_Tecnico = mensaje_servidor.Informe_Tecnico;

                }
                else {
                    _out.Estatus = true;
                    _out.Titulo = mensaje_servidor.Titulo;
                    _out.Mensaje = mensaje_servidor.Mensaje;
                    _out.Nombre_Key = mensaje_servidor.Str_Respuesta_1;
                    //_out.Url_Key = url;

                }
            }
            else {
                _out.Estatus = false;
                _out.Mensaje = 'Problemas llego vacio el mensaje';

                //fg_registrar_log_error('fg_importar_excel el mensaje servidor llego vacio');
            }
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    //fg_registrar_log_error('termina fg_importar_excel');
    return _out;
}
function fg_guardar_archivo_directorio(data) {


    //fg_registrar_log_error('ENTRA  fg_guardar_archivo_directorio');
    var estatus = false;
    var mensaje_servidor = null;
    var url = "../../FileUploadHandler.ashx";
    try {
        $.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function (result) {
                if (result) {
                    mensaje_servidor = JSON.parse(result);
                    //var no_proyecto = mensaje_servidor.No_Proyecto;
                    var key = mensaje_servidor.Key_Captura;
                    var seleccionados = mensaje_servidor.Seleccionados;
                    if (!fg_isEmptyOrNull(key)) {
                        //mensaje_servidor.Datos_1 = Consultar_Fotos_X_Key(key, no_proyecto, seleccionados);
                    }

                }
                else {
                    if (result != null) {

                        mensaje_servidor = JSON.parse(result);
                    }
                    else {
                        mensaje_servidor.Estatus = _ERROR_;
                        mensaje_servidor.Mensaje = 'result llega nullo despues de invocar el FileUploadHandle';
                        mensaje_servidor.Informe_Tecnico = result;
                    }
                }
            }
            , error: function (error) {
                mensaje_servidor.Estatus = _ERROR_;
                mensaje_servidor.Mensaje = error.message;
                mensaje_servidor.Informe_Tecnico = error.stack;
                fg_mensaje_problema_tecnico(error);
            }
        });
    } catch (e) {
        mensaje_servidor.Estatus = _ERROR_;
        mensaje_servidor.Mensaje = e.message;
        mensaje_servidor.Informe_Tecnico = e.stack;
        fg_mensaje_problema_tecnico(e);
    }

    // fg_registrar_log_error('SALE  fg_guardar_archivo_directorio');

    return mensaje_servidor;
}



function fg_format_label_required(_Agrupador) {
    var obj_datos = new Object();

    try {

        var page_controls = fg_obtener_controles_agrupador(_Agrupador);

        $.each(page_controls, function (key, value) {

            var control = value;
            var divagrupados = control.parentElement;

            if (divagrupados.className.indexOf('form-group') != -1) {
                var lbls = divagrupados.getElementsByClassName('form-label');
                if (lbls.length > 0) {
                    var lbl = lbls[0];
                    if (lbl != null) {
                        var etiqueta = lbl.innerHTML.split('*').join(''); //nos aseguramos que este limpia

                        if (control.required) {
                            lbl.innerHTML = '*' + etiqueta;
                        }

                    }

                }
            }
        })
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
/**
 * 
 * @param {any} _Agrupador es el ID del DOM
 * @param {any} _Sufijo
 */
function fg_Get_Object_Control_Valor(_Agrupador, _Sufijo) {
    var obj_datos = new Object();

    try {

        var page_controls = fg_obtener_controles_agrupador(_Agrupador);

        $.each(page_controls, function (key, value) {

            var control = value;
            if (!fg_isEmptyOrNull(control.id)) {

                if (control.id.indexOf('Txt_') != -1
                    || control.id.indexOf('Cmb_') != -1
                    || control.id.indexOf('ChkFalso_') != -1
                    || control.id.indexOf('BtnChk_') != -1
                    || control.id.indexOf('date_') != -1
                    || control.id.indexOf('Rdo_') != -1
                    || control.id.indexOf('Chk_') != -1
                ) {

                    var valor_entrada;

                    //En este proceso limpiamos el prefijo que indentifica el tipo de control
                    var nombre_campo = (control.id.split('Txt_').join(''));
                    nombre_campo = nombre_campo.split('Cmb_').join('');
                    nombre_campo = nombre_campo.split('ChkFalso_').join('');
                    nombre_campo = nombre_campo.split('BtnChk_').join('');
                    nombre_campo = nombre_campo.split('date_').join('');
                    nombre_campo = nombre_campo.split('Rdo_').join('');
                    nombre_campo = nombre_campo.split('Chk_').join('');


                    //Le quitamos el sufijo
                    //Ejemplo: Existen dos secciones de Filtro una dice Txt_Busqueda_Clave_Historico; Sufijo _Historico y otro dice Txt_Busqueda_Clave_Catalogo_Final Sufijo _Catalogo_Final
                    // Pero el parametro que realmente esta esperando el sp es Busqueda_Clave
                    if (!fg_isEmptyOrNull(_Sufijo)) {
                        nombre_campo = nombre_campo.split('_' + _Sufijo).join('');
                    }

                    //nombre_campo = 'P_' + nombre_campo;
                    //Filtramos para determinar de que manera tomaremos el valor
                    //Los BtnChk_ son botones que simulan ser un Check Box y que nos daran un valor de SI o NO
                    if (control.id.indexOf('BtnChk_') != -1) {
                        valor_entrada = fg_BtnChk_Get_Value(control);
                    }
                    else if (control.id.indexOf('Rdo_') != -1) {

                        var namecontrol = control.id.toString().split('_SI').join('');
                        namecontrol = namecontrol.split('_NO').join('');
                        namecontrol = namecontrol.split('Rdo_').join('');

                        
                        valor_entrada = $(`input:radio[name=${namecontrol}]:checked`).val();
                    }

                    else {
                        valor_entrada = control.value;
                    }


                    //Alimentamos el objeto con un Key con el nombre del Campo que obtuvimos de limpiar el id del contro y el value, Valor que tiene seleccionado o marcado el control
                    obj_datos[nombre_campo] = valor_entrada;

                }

            }
        })
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return obj_datos;
}
function fg_disable_controls_group(_Ctrl_Agrupador, _deshabilitar) {
    try {

        var controles_grupos = fg_obtener_controles_agrupador(_Ctrl_Agrupador.id);

        $.each(controles_grupos, function (key, value) {

            if (value.id != 'Btn_Regresar_Al_Listado') {
                value.disabled = _deshabilitar;
            }

        })

        if (_Ctrl_Agrupador.disabled != null) {
            _Ctrl_Agrupador.disabled = _deshabilitar;
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function fg_alert_aviso_advertencia(_Mensaje) {
    $.alert('<i class="glyphicon glyphicon-alert" style="color:#8a6d3b; font-size:24px"></i>&nbsp;&nbsp;<strong style="color:#8a6d3b; font-size:18px">' + _Mensaje + '</strong>', { type: 'warning' });
}
/**
 * 
 * @param {any} _Agrupador corresponde al ID del DOM
 */
function fg_limpiar_controles(_Agrupador) {

    var resultado = true;
    var _output = new Object();
    _output.Estatus = true;
    _output.Mensaje = '';
    $('.span-error').remove(); //Limpiar los span
    if (_Agrupador !== _INDEFINIDO_) {
        var controles_Agrupador = fg_obtener_controles_agrupador(_Agrupador);
        $.each(controles_Agrupador, function (key, value) {

            if (!fg_isEmptyOrNull(value.id)) {
                var selector = '#' + value.id;
                if ($(selector)[0] != undefined) {

                    if ($(selector)[0].tagName.toLowerCase() == 'select') {
                        $(selector)[0].selectedIndex = 0;
                    }
                    else {
                        if ($(selector)[0].type != 'radio') {
                            $(selector)[0].value = '';
                        }

                    }
                }
            }

        });
    }
    else {
        fg_mensaje_problema_tecnico(null);
    }

    return resultado;
}

function fg_get_template_BtnSel(_Prefijo_Btn, _Nombre_Evento, _ID) {

    var tag_template = ``;

    try {

        tag_template = `<button id="${_Prefijo_Btn}_${_ID.toString()}" type="button" class="btn btn-block bg-transparent btn-select-row" onclick="${_Nombre_Evento}(${_ID});"><i class="fal fa-check-circle"></i></button>`;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}
function fg_GetRow(_Dt, _Campo, _Valor) {

    var resultado;
    try {

        $.each(_Dt, function (key, value) {
            if (value[_Campo] == _Valor) {
                resultado = value;
                return false;
            }
        })

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return resultado;
}
function fg_Delete_ItemArray(_Dt, _IndexRow) {

    var dt_resultado;
    try {

        dt_resultado = _Dt;
        var dt_temporal = new Array();

        var iitem = 0;
        $.each(dt_resultado, function (key, value) {

            if (iitem != _IndexRow) {
                dt_temporal.push(value);
            }

            iitem++;
        });

        dt_resultado = new Array();
        $.each(dt_temporal, function (key, value) {
            dt_resultado.push(value);
        });
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return dt_resultado;
}
function fg_Delete_ItemArray_CampoID(_Dt, _Campo_ID, _Valor) {

    var dt_resultado;
    try {

        dt_resultado = _Dt;
        var dt_temporal = new Array();

        $.each(dt_resultado, function (key, value) {

            if (value[_Campo_ID] != _Valor) {
                dt_temporal.push(value);
            }
        });

        dt_resultado = new Array();
        if (dt_temporal.length == 0) {
            dt_resultado = new Array();
        }
        else {
            $.each(dt_temporal, function (key, value) {
                dt_resultado.push(value);
            });
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return dt_resultado;
}
function fg_Copy_ItemArray(_Dt, _Campo_ID, _Valor, _RowUpdated) {

    var dt_resultado;
    try {

        $.each(_Dt, function (key, value) {
            if (value[_Campo_ID] == _Valor) {
                var row = value;

                $.each(_RowUpdated, function (key, value) {
                    var campo = key;
                    row[campo] = _RowUpdated[campo];
                })
                return
            }

        })

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return dt_resultado;
}

function fg_delete_tr_row(_Btn) {
    try {

        if (_Btn != null) {


            //Primer Nivel.. es saber su celda(td)
            var td = _Btn.parentElement;

            if (td != null) {

                //Seguno nivel es saber su row(tr)
                var tr = td.parentElement;

                if (tr != null) {
                    tr.remove();
                }
            }
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

/**
 * 
 * @param {any} _Pantalla DOM
 */
function fg_Abrir_Ventana(_Pantalla) {
    if (VENTANAS_ABIERTAS != null && _Pantalla != null) {

        var ultima = VENTANAS_ABIERTAS[VENTANAS_ABIERTAS.length - 1];
        ultima.style.display = 'none';
        _Pantalla.style.display = 'block';
        fg_Agregar_Ventana_Abierta(_Pantalla);

    }
}
function fg_Cerrar_Ventana_Abierta() {
    if (VENTANAS_ABIERTAS != null) {

        if (VENTANAS_ABIERTAS.length == 1) {

            // Nada debe quedar una abierta

            //// Es la ultima entonces ir a inicio
            //VENTANAS_ABIERTAS = null;
            //var ir_a_principal = true;
            ////fg_registrar_log_error('ir a pagina inicial');

            //if (sessionStorage.Session_Obj_Proyecto_Conexion != undefined || sessionStorage.Session_Obj_User_Conexion != undefined) {
            //    var Obj_Proyecto_Conexion = JSON.parse(sessionStorage.Session_Obj_Proyecto_Conexion);
            //    if (Obj_Proyecto_Conexion.Page_Parent != undefined) {
            //        location.href = Obj_Proyecto_Conexion.Page_Parent;
            //        location.href = Obj_Proyecto_Conexion.Page_Parent;
            //        ir_a_principal = false;
            //    }
            //}

            //if (ir_a_principal) {
            //    location.href = _PAGINA_PRINCIPAL_;
            //    location.href = _PAGINA_PRINCIPAL_;
            //}

        }
        else {
            var index_ultima_ventana = VENTANAS_ABIERTAS.length - 1;
            var ventana_abierta = VENTANAS_ABIERTAS[index_ultima_ventana];
            ventana_abierta.style.display = 'none';
            VENTANAS_ABIERTAS.pop(); //Quitamos la ultima ventna

            index_ultima_ventana = VENTANAS_ABIERTAS.length - 1;
            var ventana_regresa = VENTANAS_ABIERTAS[index_ultima_ventana];
            ventana_regresa.style.display = 'block';

        }
    }
}
function fg_Agregar_Ventana_Abierta(_Dom_Ventana) {

    if (VENTANAS_ABIERTAS == null) {
        VENTANAS_ABIERTAS = new Array();
    }

    VENTANAS_ABIERTAS.push(_Dom_Ventana);

}
function fg_valida_captura_seccion(_Agrupador) {

    var resultado = true;
    var _output = new Object();
    _output.Estatus = true;
    _output.Mensaje = '';
    $('.span-error').remove(); //Limpiar los span
    if (_Agrupador !== _INDEFINIDO_) {
        var controles_Agrupador = fg_obtener_controles_agrupador(_Agrupador);
        $.each(controles_Agrupador, function (key, value) {
            if (!fg_isEmptyOrNull(value.id)) {

                var selector = '#' + value.id;
                var selector_id = value.id;

                if ($(selector)[0] != undefined) {

                    if ($(selector)[0].required && value.hidden == false) {

                        if (fg_isEmptyOrNull($(selector)[0].value.toString().trim())) {

                            if ($(selector)[0].id.indexOf('Search_') > -1) {
                                selector = '#' + $(selector)[0].id.replace('Search_', 'Btn_');
                            }

                            var mostrado_en_el_parent = false;
                            var elemento = document.getElementById(selector_id);
                            if (elemento != null) {
                                //    if (elemento.parentElement.className.indexOf('input-group') != -1
                                //        || elemento.parentElement.className.indexOf('main-input-container') != -1
                                //    ) {

                                //        $(elemento.parentElement).after('<span  class="span-error">Required</span>');
                                //        mostrado_en_el_parent = true;
                                //    }
                                $(elemento.parentElement).after('<span  class="span-error">Obligatorio</span>');
                            }

                            //if (!mostrado_en_el_parent) {
                            //    $(selector).after('<span  class="span-error">Required</span>');
                            //}

                            if ($(selector)[0].disabled == true) {
                                $(selector)[0].disabled = false;
                            }
                            resultado = false;
                        }
                    }
                }
            }
        });
    }
    else {
        fg_mensaje_problema_tecnico(null);
    }

    return resultado;
}

/**
 * 
 * @param {any} _Agrupador DOM
 * @param {any} _row
 */
function fg_setDataControls(_Agrupador, _row) {
    try {

        var row = _row;
        var groupControls = fg_obtener_controles_agrupador(_Agrupador.id);

        if (row != null) {
            $.each(groupControls, function (key, value) {

                var elemento = value;

                if (
                    elemento.id.indexOf('Txt_') != -1
                    || elemento.id.indexOf('Cmb_') != -1
                    || elemento.id.indexOf('BtnChk_') != -1
                    || elemento.id.indexOf('date_') != -1
                    || elemento.id.indexOf('Rdo_') != -1
                ) {

                    var esCheck = elemento.id.indexOf('BtnChk_') != -1 ? true : false;
                    var esDate = elemento.id.indexOf('date_') != -1 ? true : false;
                    var esRdo = elemento.id.indexOf('Rdo_') != -1 ? true : false;

                    var campo = elemento.id.split('Txt_').join('');
                    campo = campo.split('Cmb_').join('');
                    campo = campo.split('BtnChk_').join('');
                    campo = campo.split('date_').join('');
                    campo = campo.split('Rdo_').join('');

                    if (row[campo] != undefined) {
                        var valor = row[campo];

                        if (esCheck) {
                            fg_ChekedUnchecked(elemento, false);
                            if (valor == 'SI' || valor == '1') {
                                fg_ChekedUnchecked(elemento, true);
                            }
                        }
                        else if (esDate) {
                            //Las fechas vienen o deben venir formateada MM/dd/yyyy y traen el prefijo strnombrecamponormal
                            elemento.value = row[`str${campo}`];
                        }
                        else if (esRdo) {
                            //elemento.value = row[campo];

                            var namecontrol = elemento.id.toString().split('_SI').join('');
                            namecontrol = namecontrol.split('_NO').join('');
                            namecontrol += '_' + row[campo];

                            var rdo = document.getElementById(namecontrol);
                            if (rdo != null) {
                                rdo.checked = true;
                            }

                            

                        }
                        else {
                            elemento.value = valor;
                        }
                    }


                }

            })
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

function fg_resultOK(_result) {

    var resultadoOK = false;

    try {

        if (_result != null) {
            if (_result.length > 0) {

                if (_result[0].estatusProcedimiento == _OK_) {
                    resultadoOK = true;
                }
                else if (_result[0].estatusProcedimiento == _RESTRICCION_) {
                    fg_mensaje_aviso_restriccion(_result[0].mensajeProcedimiento, _result[0].solucionProcedimiento);
                }
                else {
                    console.log(`Error: ${_result[0].mensajeProcedimiento}`);
                    fg_mensaje_problema_tecnico(null);
                }

            }
            else {
                console.log(`Error: Aparentemente fue el servicio ya que el resultado no trae elementos.`);
                fg_mensaje_problema_tecnico(null);
            }

        }
        else {

            console.log(`Error: Aparentemente fue el servicio ya que el resultado fue nulo.`);
            fg_mensaje_problema_tecnico(null);
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return resultadoOK;
}
function fg_evaluar_result(_Dt_Result, _Mostrar_Aviso_Exitoso) {

    var continuar = true;

    try {

        if (_Dt_Result[0].estatusProcedimiento == _OK_) {
            if (_Mostrar_Aviso_Exitoso) {
                fg_alert_aviso_exitoso(_Dt_Result[0].mensajeProcedimiento);
            }

        }
        else if (_Dt_Result[0].estatusProcedimiento == _RESTRICCION_) {
            continuar = false;
            fg_mensaje_aviso_restriccion('Proceso', _Dt_Result[0].mensajeProcedimiento, _Dt_Result[0].solucionProcedimiento);
        }
        else {
            continuar = false;
            fg_mensaje_problema_tecnico_db();
        }

    }
    catch (e) {
        continuar = false;
        fg_mensaje_problema_tecnico(e);
    }

    return continuar;
}

/**
 * Habilita o Deshabilita todos los controles que esten el agrupador indicado
 * @param {any} _Ctrl_Agrupador Se requiere el DOM
 * @param {any} _deshabilitar true/false
 */
function fg_disable_controls_group(_Ctrl_Agrupador, _deshabilitar) {
    try {

        var controles_grupos = fg_obtener_controles_agrupador(_Ctrl_Agrupador.id);

        $.each(controles_grupos, function (key, value) {

            if (value.id != 'Btn_Regresar_Al_Listado') {
                value.disabled = _deshabilitar;
            }

        })

        if (_Ctrl_Agrupador.disabled != null) {
            _Ctrl_Agrupador.disabled = _deshabilitar;
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function fg_Template_Fecha(_Campo, _Valor, _Etiqueta, _Valor_ID) {
    var tag = `
                <label>${_Etiqueta}:</label>
                <div class="input-group date" id="DP_${_Campo}_${_Valor_ID}">
                    <input id="Txt_${_Campo}_${_Valor_ID}" value="${_Valor}"
                        class="form-control text-right" readonly />
                    <div id="Span_${_Campo}_${_Valor_ID}" class="input-group-addon input-group-text">
                        <span class="fa fa-calendar "></span>
                    </div>
                </div>
              `;

    return tag;
}

function fg_Template_TextBox(_Campo, _Valor, _Etiqueta, _Valor_ID) {
    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${_Etiqueta}</label>
                    <input type="text" class="form-control" id="Txt_${_Campo}_${_Valor_ID}" value="${_Valor}">
                </div>
              `;

    return tag;
}

function fg_Template_TextBox_To_Edit(_Campo, _Valor, _Valor_ID, _Btn_Click) {
    var tag = `
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" id="Txt_${_Campo}_${_Valor_ID}" class="form-control"  readonly="readonly" value="${_Valor}"/>
                        <div class="input-group-prepend">
                            <button id="Btn_${_Campo}_${_Valor_ID}" type="button" class="btn btn-secondary" ${_Btn_Click}><i class="fa fa-pencil"></i></button>
                        </div>
                    </div>

                </div>


              `;

    return tag;
}


function fg_Template_TextBox_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="input-group d-flex align-items-center">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="text" class="form-control" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off">
                </div>
              `;

    return tag;
}
function fg_Template_TextBox_Form_Group(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="text" class="form-control" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off" />
                </div>
              `;

    return tag;
}
function fg_Template_eMail_Form_Group(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="email" class="form-control" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off">
                </div>
              `;

    return tag;
}

function fg_Template_TextBoxNum_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }

    var tag = `
                <div class="input-group d-flex align-items-center">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="number" class="form-control number" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional}>
                </div>
              `;

    return tag;
}
function fg_Template_TextBoxNum_Form_Sin_Etiqueta(_Campo, _Valor, _Valor_ID, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }

    var tag = `
                <div class="input-group mt-2">
                    <input type="number" class="form-control" id="Txt_${_Campo}_${_Valor_ID}" value="${_Valor}" ${_Propiedad_Adicional}>
                </div>
              `;

    return tag;
}
function fg_Template_TextBoxNum_Form_Group(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="number" class="form-control" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off" style="text-align:right;">
                </div>
              `;

    return tag;
}


function fg_Template_TextArea_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <textarea class="form-control" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional} rows="5"></textarea>
                </div>
              `;

    return tag;
}


function fg_Btn_ShowP_pass_Click(_Txt_ID) {

    try {
        var txt = document.getElementById(_Txt_ID);
        if (txt != null) {

            if (txt.type == 'password') {
                txt.type = 'text';
            }
            else {
                txt.type = 'password';
            }
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function fg_Template_TextBoxPassword_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }

    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <div class="input-group-prepend">
                       <input type="password" class="form-control pwd" id="Txt_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional}>
                       <button id="Btn_${_Campo}" type="button" class="btn  btn-sm" onclick="fg_Btn_ShowP_pass_Click('Txt_${_Campo}');"><i class="fa fa-eye-slash icon" style="font-size: 16px;"></i></button>
                    </div>
                </div>
              `;

    return tag;
}




function fg_Template_Select_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="input-group d-flex align-items-center">
                    <label for="Cmb_${_Campo}">${tag_etiqueta}</label>
                    <select class="form-control" id="Cmb_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional}></select>
                </div>
              `;

    return tag;
}
function fg_Template_Select_Form_Group(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Cmb_${_Campo}">${tag_etiqueta}</label>
                    <select class="form-control" id="Cmb_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional}></select>
                </div>
              `;

    return tag;
}
function fg_Template_Select_Form_Group_Add(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group w-100">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <div class="input-group">
                        <select class="form-control" id="Cmb_${_Campo}" value="${_Valor}" ${_Propiedad_Adicional}></select>
                        <div class="input-group-btn">
                            <button id="BtnAdd_${_Campo}" type="button" class="btn btn-default h-100"><i class="glyphicon glyphicon-plus"></i></button>
                        </div>
                    </div>
                </div>
              `;

    return tag;
}



function fg_Template_Datatimer_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = ` <div class="form-group m-0">
                <label for="date_${_Campo}">${tag_etiqueta}</label>
                </div> 
                <div class="input-group date" id="DP_${_Campo}">
                     <input id="date_${_Campo}" class="form-control text-right" readonly="readonly" ${_Propiedad_Adicional} value="${_Valor}">
                     <div id="Span_date_${_Campo}" class="input-group-addon input-group-text">
                         <span class="fa fa-calendar "></span>
                     </div>
                </div>
              `;

    return tag;
}
function fg_Template_DatatimeV2_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `                    
                    <div class="input-group">
                        <label class="form-label mt-2" for="date_${_Campo}">${_Etiqueta}</label>
                        <input type="text" class="form-control date" id="date_${_Campo}" required>
                        <div class="input-group-append">
                            <span class="input-group-text fs-xl">
                                <i class="fa fa-calendar"></i>
                            </span>
                        </div>
                    </div>
              `;

    return tag;
}

function fg_Template_Hora_Form_Group(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var taglabel = ``;
    if (!fg_isEmptyOrNull(tag_etiqueta)) {
        taglabel = `<label for="Txt_${_Campo}">${tag_etiqueta}</label>`;
    }

    var tag = `
                <div class="form-group">
                    ${taglabel}
                    <div id="Gpo_Txt_Hora_${_Campo}" class="mk-input-hora">
                        <input type="text" class="form-control text-right pr-1" type="number" id="Txt_${_Campo}_HH" minlength="2" maxlength="2" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off" onkeyup="fg_validaNumerosHoras(this, 'HH')">&nbsp; :  &nbsp;
                        <input type="text" class="form-control pl-1" type="number" id="Txt_${_Campo}_MM" minlength="2" maxlength="2" value="${_Valor}" ${_Propiedad_Adicional} autocomplete="off" onkeyup="fg_validaNumerosHoras(this, 'MM')">
                    </div>
                    
                </div>
              `;

    return tag;
}
function fg_validaNumerosHoras(_control, _tipo) {
    try {

        var txt = _control;
        var texto = txt.value;
        var valor = parseInt(texto);

        if (valor.toString() == 'NaN') {
            txt.value = '';
        }
        else if (valor < 0) {
            txt.value = '';
        }

        if (!fg_isEmptyOrNull(txt.value)) {
            if (_tipo == 'HH') {
                if (valor > 23) {
                    txt.value = '08';
                }
            }
            else if (_tipo == 'MM') {
                if (valor > 59) {
                    txt.value = '00';
                }
            }
        }

    } catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}





function fg_Template_TextBox_Search_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="form-group">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                <div class="input-group">
                    <input type="text" id="Txt_${_Campo}" class="form-control" />
                    <div class="input-group-prepend">
                        <button id="Btn_${_Campo}" type="button" class="btn btn-secondary"><i class="fa fa-search"></i></button>
                    </div>
                </div>

                </div>
              `;

    return tag;
}

function fg_Template_Modal_Busqueda(_Titulo) {



    var tag = ` <div class="modal" tabindex="-1" role="dialog" id="Modal_Busqueda">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="Modal_Busqueda_Titulo">${_Titulo}</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <table id="Grid_Busqueda" data-toolbar="#toolbar" class="table table-sm"></table>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;

    return tag;
}

function fg_Template_BtnChk_Form_Group(_Campo, _isChecked, _Etiqueta, _Propiedad_Adicional) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group">
                    <label style="display:block;">&nbsp;</label>
                    <label for="BtnChk_${_Campo}" class="mb-1 font-weight-bold">${_Etiqueta}</label>
                    <button id="BtnChk_${_Campo}" type="button" class="btn btnchk"><i class="${tag_class_check}"></i></button>
                </div>

              `;

    return tag;
}
function fg_Template_BtnChk_Form_Group_V2(_Campo, _isChecked, _Etiqueta, _Propiedad_Adicional) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group">
                    <button id="BtnChk_${_Campo}" type="button" class="btn btnchk" ${_Propiedad_Adicional}><i class="${tag_class_check}"></i></button>
                    <label for="BtnChk_${_Campo}" class="mb-1 font-weight-bold">${_Etiqueta}</label>
                </div>

              `;

    return tag;
}
function fg_Template_BtnChk_Form_Check_Prefijo(_Campo, _isChecked, _Etiqueta, _Key) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group">
                    <label style="display:block;">&nbsp;</label>
                    <button id="BtnChk_${_Campo}_${_Key}" type="button" class="btn btnchk"><i class="${tag_class_check}" onclick="BtnChk_Click(${_Key});"></i></button>
                    <label for="BtnChk_${_Campo}" class="mb-1 font-weight-bold">${_Etiqueta}</label>
                    
                </div>

              `;

    return tag;
}
function fg_Template_BtnChk_Form_Sin_Etiqueta(_Campo, _isChecked, _Propiedad_Adicional) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group mt-1">
                    <button id="BtnChk_${_Campo}" type="button" class="btn btnchk" ${_Propiedad_Adicional}><i class="${tag_class_check}"></i></button>
                </div>

              `;

    return tag;
}
function fg_BtnChk_ChekClik(_btn) {

    var btn = document.getElementById(this.id);

    if (_btn != null) {
        if (_btn.id != null) {
            btn = _btn;
        }
    }

    if (btn.innerHTML.indexOf(_CLASS_CHECKED_) != -1) {


        btn.innerHTML = btn.innerHTML.split(_CLASS_CHECKED_).join(_CLASS_UNCHECKED_);
    } else {

        btn.innerHTML = btn.innerHTML.split(_CLASS_UNCHECKED_).join(_CLASS_CHECKED_);
    }

}
function fg_Template_RadioSINO_Form_Group(_Campo, _isChecked, _Etiqueta, _Propiedad_Adicional) {

    var tag_class_check = _CLASS_UNCHECKED_;

    if (_isChecked) {
        tag_class_check = _CLASS_CHECKED_;
    }

    var tag = `
                <div class="form-group">
                    <label class="mb-1 font-weight-bold">${_Etiqueta}</label>
                    <label class="ml-2">
                        <input id="Rdo_${_Campo}_SI" type="radio" name="${_Campo}" value="SI">
                        <span class="mr-3">Si<span>
                        <input id="Rdo_${_Campo}_NO" type="radio" name="${_Campo}" value="NO">
                        <span>No<span>
                    </label>
                    <input type="text" class="form-control" id="Txt_${_Campo}"  ${_Propiedad_Adicional} autocomplete="off">
                </div>

              `;

    return tag;
}




function fg_BtnChk_IsChecked(_btn) {
    return (_btn.innerHTML.indexOf(_CLASS_CHECKED_) != -1);
}
function fg_BtnChk_Get_Value(_btn) {
    var valor = 'NO';


    try {
        if (_btn.innerHTML.indexOf(_CLASS_CHECKED_) != -1) {
            valor = 'SI';
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
        

    return valor;
}
function fg_ChekedUnchecked(_btn, _Check) {

    if (_Check == true) {
        _btn.innerHTML = _btn.innerHTML.split(_CLASS_UNCHECKED_).join(_CLASS_CHECKED_);
    }
    else {
        _btn.innerHTML = _btn.innerHTML.split(_CLASS_CHECKED_).join(_CLASS_UNCHECKED_);
    }


}
function fg_change_requiered(_Control, _Es_Requerido) {

    try {
        if (_Es_Requerido) {

            _Control.required = true;

            var lbl = document.querySelector("label[for=" + _Control.id + "]");

            if (lbl != null) {
                var etiqueta = lbl.innerHTML.split('*').join(''); //nos aseguramos que este limpia
                lbl.innerHTML = '*' + etiqueta;
            }
        }
        else {
            _Control.required = false;
            var lbl = document.querySelector("label[for=" + _Control.id + "]");
            if (lbl != null) {
                lbl.innerHTML = lbl.innerHTML.split('*').join('');
            }
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}



function fg_Template_Img_Form(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="card">
                                    <div class="card-header  p-2">${_Etiqueta}</div>
                                    <div class="card-body m-0 p-1">
                                        <div class="box box-primary d-flex justify-content-center">
                                            <div class="box-body box-profile">
                                                <div class="rounded-circle text-center" >
                                                    <img id="Img_${_Campo}" class="rounded-circle card_foto"  src="../../images/avatar_64x64.png" alt="User profile picture">
                                                </div>

                                            </div>
                                        </div>
                                        <div class="card-footer m-0 p-1">
                                            <div class="input-group mt-2">
                                                <input type="file" id="Fl_Archivo_Importar" accept="image/*" class="form-control" style="margin-top: 0px !important; border-bottom: 0px !important; display: none" />
                                                <label id="Lbl_Archivo_Importar" class="custom-file-upload text-muted border p-2" style="margin-right: -4px; margin-top: 0px; width: 75%;">&nbsp&nbspSeleccione el archivo a importar&nbsp&nbsp</label>
                                                <div class="input-group-prepend">
                                                    <label id="Lbl_BtnFalso_Importar" for="Fl_Archivo_Importar" class="custom-file-upload btn btn-secondary">
                                                        <i id="Icono_Importar" class="fa fa-cloud-upload " style="font-size: 16px;"></i>&nbsp;Examinar
                                                    </label>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
              `;

    return tag;
}
function fg_RowCounter(data) {

    return `Total de registros: ${data.length}`;
}
function fg_Template_TextBox_Search(_Campo, _Valor, _Etiqueta, _Propiedad_Adicional) {

    var tag_etiqueta = `${_Etiqueta}`;
    if (_Propiedad_Adicional != null) {
        if (_Propiedad_Adicional.indexOf('required') != -1) {
            //Es requerido
            tag_etiqueta = `* ${_Etiqueta}`;
        }
    }


    var tag = `
                <div class="input-group mt-2">
                    <label for="Txt_${_Campo}">${tag_etiqueta}</label>
                    <input type="text" id="Txt_${_Campo}" class="form-control" />
                    <div class="input-group-prepend">
                        <button id="Btn_${_Campo}" type="button" class="btn btn-secondary"><i class="fa fa-search"></i></button>
                    </div>
                </div>
              `;

    return tag;
}

function fg_Template_Fecha_Nacimiento() {
    var tag = `
                <div class="mk-fn">

                    <div class="mk-fn-label">
                        <label>Fecha de Nacimiento:</label>
                    </div>
                    <div class="mk-fn-elementos">
                        <div class="mk-fn-elementos-labels">
                            <label>*Día</label><label>*Mes</label><label>*Año</label>
                        </div>
                        <div class="mk-fn-elementos-inputs">
                            <input type="number" class="form-control dia" id="Txt_Fecha_Nacimiento_Dia" onkeyup="fg_validaDia();" min="1"  max="31" step="1" required>
                            <select class="form-control mes" id="Cmb_Fecha_Nacimiento_Mes" required></select>
                            <input type="number" class="form-control anio" id="Txt_Fecha_Nacimiento_Anio" onkeyup="fg_validaAnio();" min="1900" step="1" required>
                        </div>
                    </div>

                </div>
              `;

    return tag;
}

function fg_validaDia() {

    try {
        var Txt_Fecha_Nacimiento_Dia = document.getElementById('Txt_Fecha_Nacimiento_Dia');

        if (Txt_Fecha_Nacimiento_Dia.value.length > 2) {
            var ml = Txt_Fecha_Nacimiento_Dia.value.length;
            var fin = ml - 1;
            var ini = fin - 2;
            Txt_Fecha_Nacimiento_Dia.value = Txt_Fecha_Nacimiento_Dia.value.substring(ini, 2);
        }

        if (Txt_Fecha_Nacimiento_Dia.value > 31) {
            Txt_Fecha_Nacimiento_Dia.value = "01";
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function fg_validaAnio() {

    try {
        var Txt_Fecha_Nacimiento_Anio = document.getElementById('Txt_Fecha_Nacimiento_Anio');

        if (Txt_Fecha_Nacimiento_Anio.value.length > 4) {
            var ml = Txt_Fecha_Nacimiento_Anio.value.length;
            var fin = ml - 1;
            var ini = fin - 4;
            Txt_Fecha_Nacimiento_Anio.value = Txt_Fecha_Nacimiento_Dia.value.substring(ini, 4);
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}



function fg_Template_Btn_Agregar(_Campo) {

    var tag = `
                 <button id="Btn_Agregar" type="button" class="btn btn-secondary" onclick="Btn_Agregar_${_Campo}_Click();"><i class="fa fa-plus"></i>Agregar</button>
                  
              `;
    return tag;
}
function fg_Template_Btn_Copy_Paste(_Etiqueta) {

    var tag = `
                <div class="form-group">
                   <button id="Btn_Copy_${_Etiqueta}" type="button" class="btn btn-copy-paste" onclick="Btn_Copy_${_Etiqueta}_Click();">Copiar</button>
                   <button id="Btn_Paste_${_Etiqueta}" type="button" class="btn btn-copy-paste" onclick="Btn_Paste_${_Etiqueta}_Click();">Pegar</button>
                </div>
                 
                  
              `;
    return tag;
}
function fg_Template_Btn_Copy(_Campo, _Etiqueta) {

    var tag = `
                 <button id="Btn_Copy" type="button" class="btn btn-secondary p-0" onclick="Btn_Copy_${_Campo}_Click();">${_Etiqueta}</button>
                  
              `;
    return tag;
}
function fg_Template_Btn_Paste(_Campo, _Etiqueta) {

    var tag = `
                 <button id="Btn_Paste" type="button" class="btn btn-secondary p-0" onclick="Btn_Paste_${_Campo}_Click();">${_Etiqueta}</button>
                  
              `;
    return tag;
}
function fg_Template_File_Form(_Campo) {



    var tag = `
                <div class="input-group mb-2">
                   <input type="file" multiple="multiple" id="Fl_Archivo_Importar_${_Campo}"  class="form-control" style="margin-top: 0px !important; border-bottom: 0px !important; display: none"/>
                   <label id="Lbl_Archivo_Importar" class="custom-file-upload text-muted border p-2" style="margin-right: -4px; margin-top: 0px; width: 65%;">&nbsp&nbspSeleccione el archivo a importar&nbsp&nbsp</label>
                   <div class="input-group-prepend">
                       <label id="Lbl_BtnFalso_Importar" for="Fl_Archivo_Importar_${_Campo}" class="custom-file-upload btn btn-secondary">
                            <i id="Icono_Importar" class="fa fa-cloud-upload " style="font-size: 16px;"></i>&nbsp;Examinar
                       </label>
                   </div>
               </div>
              `;

    return tag;
}

function fg_Template_Modal(_Modal_ID, _Body, _Titulo, _AdicionalFooter) {

    var tagmodal = ``;

    try {

        tagmodal = `
        <div class="modal fade" id="${_Modal_ID}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="${_Modal_ID}_Title" class="modal-title">${_Titulo}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa fa-times"></i></span>
                        </button>
                    </div>
                    <div id="${_Modal_ID}_Body" class="modal-body">
                        ${_Body}
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <button id="${_Modal_ID}_Btn_Cerrar" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        ${_AdicionalFooter}
                    </div>
                </div>
            </div>
        </div>
                    `;


        /*<button id="${_Modal_ID}_Btn_Aceptar" type="button" class="btn btn-primary">Aceptar</button>*/

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }


    return tagmodal;
}


function fg_Col_Grid_fechaUltimoCambio(_columnas) {

    var obj = new Object();
    try {


        obj = {
            field: 'fechaUltimoCambio', title: 'Info. Ult. Modificación', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `<div class="mk-td-block">
                                <div class="mk-td-fecha">${row.str_fechaUltimoCambio}</div>
                                <small class="mk-td-usuario">${row.usuarioUltimoCambio}</small>
                            </div>
                           `;

                return tag;
            }
        };

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

        return obj;
}
function fg_Col_Grid_fechaCreoRegistro(_columnas) {

    var obj = new Object();
    try {


        obj = {
            field: 'fechaCreoRegistro', title: 'Info. Creación', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `<div class="mk-td-block">
                                <div class="mk-td-fecha">${row.str_fechaCreoRegistro}</div>
                                <small class="mk-td-usuario">${row.usuarioCreoRegistro}</small>
                            </div>
                           `;

                return tag;
            }
        };

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return obj;
}
function fg_Col_Grid_Activo(_columnas) {

    var obj = new Object();
    try {


        obj = {
            field: 'activo', title: 'Activo', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
        };

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return obj;
}


function fg_setTitlePagina() {


    try {
        var titulopagina = '';
        var urlpage = location.pathname.split('/paginas/').join('');
        dtAccesos = JSON.parse(localStorage.getItem('str_dtAccesos'));
        var buscaacceso = dtAccesos.filter(x => x.url == urlpage);
        if (buscaacceso != null) {
            titulopagina = buscaacceso[0].tituloMenu;

            var Card_Listado = document.getElementById('Card_Listado');
            if (Card_Listado != null) {

                var card_title = Card_Listado.getElementsByClassName('card-title');
                if (card_title != null) {

                    if (card_title[0] != null) {
                        card_title[0].innerHTML = `<h4>${titulopagina}</h4>`;
                    }
                }
            }

        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function fg_setTitlePaginaFijo(_Titulo) {


    try {
        var Card_Listado = document.getElementById('Card_Listado');
        if (Card_Listado != null) {

            var card_title = Card_Listado.getElementsByClassName('card-title');
            if (card_title != null) {

                if (card_title[0] != null) {
                    card_title[0].innerHTML = `<h4>${_Titulo}</h4>`;
                }
            }
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function fg_rowStyle(row, index) {
    if (row.activo == false) {
        return {
            css: { "background": "#fbeeee", "color": "#aba0a0" }
        };
    }

    return {};
}

/*******************  Especial **********************************/



