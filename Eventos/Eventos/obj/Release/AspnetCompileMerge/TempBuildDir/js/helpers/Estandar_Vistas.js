
var EV_BTN_NUEVO_ = `<button id="Btn_Nuevo_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-file-text " ></i>Nuevo</button>`;
var EV_BTN_EDITAR_ = `<button id="Btn_Editar_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-pencil-square " ></i></button>`;
var EV_BTN_REGRESAR_ = `<button id="Btn_Regresar_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-arrow-circle-left " ></i></button>`;
var EV_BTN_EXPORTAR_ = `<button id="Btn_Exportar_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-download"></i></button>`;
var EV_BTN_IMPORTAR_ = `<button id="Btn_Importar_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-upload"></i>Importar</button>`;
var EV_BTN_RECARGAR_ = `<button id="Btn_Recargar_Catalogo" type="button" class="btn btn-primary"><i class="fa fa-refresh"></i></button>`;


var EV_BTN_REGRESAR_REGISTRO_ = `<button id="Btn_Regresar_Al_Listado" type="button" class="btn"><i class="fa fa-arrow-circle-left " ></i></button>`;
var EV_BTN_GUARDAR_REGISTRO_ = `<button id="Btn_Guardar_Registro" type="button" class="btn"><i class="fa fa-floppy-o " ></i></button>`;
var EV_BTN_CANCELAR_REGISTRO_ = `<button id="Btn_Cancelar_Catalogo" type="button" class="btn"><i class="fa fa-trash-o " ></i></button>`;

var EV_BTN_REACTIVAR_REGISTRO_ = `<button id="Btn_Reactivar_Catalogo" type="button" class="btn bg-danger  m-0 "><i class="fa fa-check " ></i>&nbsp;Re-Activar</button>`;

var EV_BTN_NUEVO_PROYECTO = `<button id="Btn_Nuevo_Proyecto" type="button" class="btn"><i class="fa fa-file-text " ></i></button>`;


var _BTNGPO_INICIALES_LEFT = 'BtnGpo_Iniciales_Left';
var _BTNGPO_INICIALES_RIGHT = 'BtnGpo_Iniciales_Right';

var _BTNGPO_REGISTRO_ = 'BtnGpo_Registro';

var EV_Obj_Registro_Cargado;

document.addEventListener('DOMContentLoaded', function () {

})



/**
 * Coloca el boton de nuevo en el grupo de botones iniciales
 * Btn_Nuevo, para ir a la pantalla de captura
 * Nota: Desde aqui se vincula el evento click que debera de estar del lado del js principal de la vista, la finalidad es que si es necesario agregar otro boton
 * o quitar alguno que ya no se requiere solo se quiete desde este punto y no tenga que quitarse la relación del evento desde el principal
 * */
function ev_btngpo_iniciales_catalogo() {

    try {

        var btngpo_iniciales = document.getElementById(_BTNGPO_INICIALES_);
        btngpo_iniciales.innerHTML = `${EV_BTN_NUEVO_}${EV_BTN_EXPORTAR_}`;


        //El evento debe existir en el JS principal de la vista, por ejemplo; Js_Conceptos, Js_Cat_Grupos_Conceptos, etc.
        var btn_nuevo_catalogo = document.getElementById('Btn_Nuevo_Catalogo');
        btn_nuevo_catalogo.addEventListener("click", Btn_Nuevo_Click);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}



/**Agrega los botones en la barra de  BtnGpo_Registro para la sección de captura o edición de un registro
 * Btn_Regresar para que regresa al listado
 * Btn_Guardar para guardar los cambios del registro
 */
function ev_btngpo_registro_catalogo() {

    try {

        var btngpo_registro = document.getElementById(_BTNGPO_REGISTRO_);
        btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}&nbsp;&nbsp;&nbsp;${EV_BTN_GUARDAR_REGISTRO_}`;

        //Los veamosmty deberan de existir con el nombre tal cual del lado del Js Principal de la vista.
        var btn_regresar_al_listado = document.getElementById('Btn_Regresar_Al_Listado');
        btn_regresar_al_listado.addEventListener("click", Btn_Regresar_Al_Listado_Click);

        var btn_guardar_registro = document.getElementById('Btn_Guardar_Registro');
        btn_guardar_registro.addEventListener("click", Btn_Guardar_Registro_Click);

    }

    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

/**Agrega los botones en la barra de  BtnGpo_Registro para la sección de captura o edición de un registro
 * Btn_Regresar para que regresa al listado
 * Btn_Guardar para guardar los cambios del registro
 */
function ev_btngpo_registro_edit_catalogo(_Obj_Registro) {

    try {

        EV_Obj_Registro_Cargado = _Obj_Registro;

        var btngpo_registro = document.getElementById(_BTNGPO_REGISTRO_);

        if (EV_Obj_Registro_Cargado.Estatus == 'CONSULTA') {
            btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}`;

        }

        if (EV_Obj_Registro_Cargado.Estatus == 'ACTIVO' || EV_Obj_Registro_Cargado.Estatus == 'Activo') {

            //Se agregan los botones de Regresar, Guardar y Cancelar Registro
            btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}&nbsp;&nbsp;&nbsp;${EV_BTN_GUARDAR_REGISTRO_}`;

            //El evento debe exitir del lado del JS Principal de la vista
            var btn_guardar_registro = document.getElementById('Btn_Guardar_Registro');
            btn_guardar_registro.addEventListener("click", Btn_Guardar_Registro_Click);

            //Se relaciona un EVENTO GENERICO dentro de este JS
            //var btn_cancelar_catalogo = document.getElementById('Btn_Cancelar_Catalogo');
            //btn_cancelar_catalogo.addEventListener("click", ev_btn_cancelar_registro_click);

        }
        if (EV_Obj_Registro_Cargado.Estatus == 'INACTIVO' || EV_Obj_Registro_Cargado.Estatus == 'Inactivo') {

            //Se agrega el boton de Regresar y el de REACTIVAR nada mas.
            btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}`;

            //var btn_reactivar_catalogo = document.getElementById('Btn_Reactivar_Catalogo');
            //btn_reactivar_catalogo.addEventListener("click", ev_btn_reactivar_registro_click);

        }


        var btn_regresar_al_listado = document.getElementById('Btn_Regresar_Al_Listado');
        btn_regresar_al_listado.addEventListener("click", Btn_Regresar_Al_Listado_Click);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}



/**Evento GENERICO para Cancelar un registro */
function ev_btn_cancelar_registro_click() {

    try {

        EV_Obj_Registro_Cargado.Estatus = 'INACTIVO';
        fg_mensaje_pregunta('Usted selecciono cancelar el registro ' + '<br>' + EV_Obj_Registro_Cargado.Descripcion, 'ev_cancelar_reactivar_registro');

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/**Evento GENERICO para REACTIVAR un registro */
function ev_btn_reactivar_registro_click() {

    try {

        EV_Obj_Registro_Cargado.Estatus = 'ACTIVO';
        fg_mensaje_pregunta('Usted selecciono RE-ACTIVAR el registro ' + '<br>' + EV_Obj_Registro_Cargado.Descripcion, 'ev_cancelar_reactivar_registro');

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function ev_cancelar_reactivar_registro() {

    try {

        var obj_filtro = new Object();
        obj_filtro.Tabla = EV_Obj_Registro_Cargado.Tabla;
        obj_filtro.Campo_ID = EV_Obj_Registro_Cargado.Campo_ID;
        obj_filtro.ID = EV_Obj_Registro_Cargado.ID;
        obj_filtro.Descripcion = EV_Obj_Registro_Cargado.Descripcion;
        obj_filtro.Estatus = EV_Obj_Registro_Cargado.Estatus;




        var ruta = '../generales/homePageController.asmx/cancelReactivarRegistro_CHR';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtro) });

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
                    var ds_result = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    var respuesta_sp = ds_result.Dt_Respuesta_SP[0];

                    if (respuesta_sp.estatusProcedimiento == _OK_) {

                        if (EV_Obj_Registro_Cargado.Estatus == 'ACTIVO') {

                            //SE REACTIVO EL REGISTRO
                            //Se mantiene al usuario en la misma vista, solo se habilitan los controles.
                            //---> Si existen controles especificos que deben estar bloqueados se debera de deshabilitar del lado del js principal de la vista
                            fg_disable_controls_group(EV_Obj_Registro_Cargado.Seccion_Captura, false);
                            ev_btngpo_registro_edit_catalogo(EV_Obj_Registro_Cargado);

                        }
                        else {

                            //SE ESTA INACTIVANDO EL REGISTRO
                            //Se debera de cerrar la vista de captura y actualizar el listado

                            /*Si hay un nombre de función especifica de ejecutara posteriormente*/
                            if (!fg_isEmptyOrNull(EV_Obj_Registro_Cargado.afterFnCall)) {
                                var fn = window[EV_Obj_Registro_Cargado.afterFnCall];
                                if (typeof fn === 'function') {
                                    fn();
                                }
                            }

                            /*Nos regresamos a la vista del listado*/
                            fg_Cerrar_Ventana_Abierta();

                        }

                    }

                }
                else if (mensaje_servidor.Estatus == _RESTRICCION_) {
                    fg_mensaje_aviso_restriccion('Cancelar - ReActivar', mensaje_servidor.Mensaje, 'No puede continuar', mensaje_servidor.Solucion);
                }
                else if (mensaje_servidor.Estatus == _RESET_) {
                    fg_reset_session();
                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor.Mensaje_Error);
                }


            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function ev_btngpo_iniciales_proyectos() {

    try {

        var btngpo_iniciales = document.getElementById(_BTNGPO_INICIALES_);
        btngpo_iniciales.innerHTML = `${EV_BTN_NUEVO_PROYECTO}`;

        //El evento debe existir en el JS principal de la vista, por ejemplo; Js_Conceptos, Js_Cat_Grupos_Conceptos, etc.
        var btn_nuevo_proyecto = document.getElementById('Btn_Nuevo_Proyecto');
        btn_nuevo_proyecto.addEventListener("click", Btn_Nuevo_Click);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function ev_btngpo_registro_detalle_registro(_Agrupador_id) {

    try {

        var btngpo_registro = document.getElementById(_Agrupador_id);
        btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}`;

        //Los veamosmty deberan de existir con el nombre tal cual del lado del Js Principal de la vista.
        var btn_regresar_al_listado = document.getElementById('Btn_Regresar_Al_Listado');
        btn_regresar_al_listado.addEventListener("click", Btn_Regresar_Al_Listado_Click);

    }

    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


/**Agrega los botones en la barra de  BtnGpo_Registro para la sección de captura o edición de un registro
 * Btn_Regresar para que regresa al listado
 *********El guardar será or pestaña no en barra********
 */
function ev_btngpo_registro_catalogo_x_pestania() {

    try {

        var btngpo_registro = document.getElementById(_BTNGPO_REGISTRO_);
        btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}`;

        //Los veamosmty deberan de existir con el nombre tal cual del lado del Js Principal de la vista.
        var btn_regresar_al_listado = document.getElementById('Btn_Regresar_Al_Listado');
        btn_regresar_al_listado.addEventListener("click", Btn_Regresar_Al_Listado_Click);


    }

    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function ev_btngpo_edit_catalogo_guardar_x_pestania(_Obj_Registro) {

    try {

        EV_Obj_Registro_Cargado = _Obj_Registro;

        var btngpo_registro = document.getElementById(_BTNGPO_REGISTRO_);



        if (EV_Obj_Registro_Cargado.Estatus == 'ACTIVO' || EV_Obj_Registro_Cargado.Estatus == 'Activo') {

            //Se agregan los botones de Regresar, Guardar y Cancelar Registro
            btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}&nbsp;&nbsp;&nbsp;${EV_BTN_CANCELAR_REGISTRO_}`;


            //Se relaciona un EVENTO GENERICO dentro de este JS
            var btn_cancelar_catalogo = document.getElementById('Btn_Cancelar_Catalogo');
            btn_cancelar_catalogo.addEventListener("click", ev_btn_cancelar_registro_especial_click);

        }
        else {

            //Se agrega el boton de Regresar y el de REACTIVAR nada mas.
            btngpo_registro.innerHTML = `${EV_BTN_REGRESAR_REGISTRO_}&nbsp;&nbsp;&nbsp;${EV_BTN_REACTIVAR_REGISTRO_}`;

            var btn_reactivar_catalogo = document.getElementById('Btn_Reactivar_Catalogo');
            btn_reactivar_catalogo.addEventListener("click", ev_btn_reactivar_registro_especial_click);

        }


        var btn_regresar_al_listado = document.getElementById('Btn_Regresar_Al_Listado');
        btn_regresar_al_listado.addEventListener("click", Btn_Regresar_Al_Listado_Click);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function ev_btn_cancelar_registro_especial_click() {

    try {

        EV_Obj_Registro_Cargado.Estatus = 'INACTIVO';
        fg_mensaje_pregunta('Usted selecciono cancelar el registro ' + '<br>' + EV_Obj_Registro_Cargado.Descripcion, 'ev_cancelar_reactivar_registro_especial');

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/**Evento GENERICO para REACTIVAR un registro */
function ev_btn_reactivar_registro_especial_click() {

    try {

        EV_Obj_Registro_Cargado.Estatus = 'ACTIVO';
        fg_mensaje_pregunta('Usted selecciono RE-ACTIVAR el registro ' + '<br>' + EV_Obj_Registro_Cargado.Descripcion, 'ev_cancelar_reactivar_registro_especial');

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

function ev_cancelar_reactivar_registro_especial() {

    try {

        var obj_filtro = new Object();
        obj_filtro.Tabla = EV_Obj_Registro_Cargado.Tabla;
        obj_filtro.Campo_ID = EV_Obj_Registro_Cargado.Campo_ID;
        obj_filtro.ID = EV_Obj_Registro_Cargado.ID;
        obj_filtro.Descripcion = EV_Obj_Registro_Cargado.Descripcion;
        obj_filtro.Estatus = EV_Obj_Registro_Cargado.Estatus;




        var ruta = '../generales/homePageController.asmx/cancelReactivarRegistro_CHR';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtro) });

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
                    var ds_result = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    var respuesta_sp = ds_result.Dt_Respuesta_SP[0];

                    if (respuesta_sp.estatusProcedimiento == _OK_) {

                        if (EV_Obj_Registro_Cargado.Estatus == 'ACTIVO') {

                            //SE REACTIVO EL REGISTRO
                            //Se mantiene al usuario en la misma vista, solo se habilitan los controles.
                            //---> Si existen controles especificos que deben estar bloqueados se debera de deshabilitar del lado del js principal de la vista
                            fg_disable_controls_group(EV_Obj_Registro_Cargado.Seccion_Captura, false);
                            ev_btngpo_edit_catalogo_guardar_x_pestania(EV_Obj_Registro_Cargado);

                        }
                        else {

                            //SE ESTA INACTIVANDO EL REGISTRO
                            //Se debera de cerrar la vista de captura y actualizar el listado

                            /*Si hay un nombre de función especifica de ejecutara posteriormente*/
                            if (!fg_isEmptyOrNull(EV_Obj_Registro_Cargado.afterFnCall)) {
                                var fn = window[EV_Obj_Registro_Cargado.afterFnCall];
                                if (typeof fn === 'function') {
                                    fn();
                                }
                            }

                            /*Nos regresamos a la vista del listado*/
                            fg_Cerrar_Ventana_Abierta();

                        }

                    }

                }
                else if (mensaje_servidor.Estatus == _RESTRICCION_) {
                    fg_mensaje_aviso_restriccion('Cancelar - ReActivar', mensaje_servidor.Mensaje, 'No puede continuar', mensaje_servidor.Solucion);
                }
                else if (mensaje_servidor.Estatus == _RESET_) {
                    fg_reset_session();
                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor.Mensaje_Error);
                }


            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function ev_get_template_listado_inicial(_Seccion_Busqueda_Especial) {

    try {
        var seccion_busqueda_especial = ``;
        if (!fg_isEmptyOrNull(_Seccion_Busqueda_Especial)) {
            seccion_busqueda_especial = _Seccion_Busqueda_Especial;
        }
        var tag_template = `
                            <div id="Controles_Ocultos" hidden>
                                <a id="Btn_Descargar_Archivos" href="..\..\paginas\Descargas\archivo.xlsx" download class="btn btn-default">Descargar&nbsp
                                        <i class="glyphicon glyphicon-download-alt text-info" style="font-size: 16px;"></i>
                                </a>
                            </div>


                            <div id="Card_Listado" class="card  m-0 p-0">
                                <div id="Card_Header_Listado" class="card-header pagina-container__header">
                                    <div id="toolbar_BtnIniciales" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div id="BtnGpo_Iniciales_Left" class="btn-group mr-2 pagina-container__buttons_left" role="group" aria-label="First group"></div>
                                        <span id="Header_Listado" class="pagina-container__titulo">Cargando...</span>
                                        <div id="BtnGpo_Iniciales_Right" class="btn-group mr-2 pagina-container__buttons_left" role="group" aria-label="First group"></div>
                                    </div>
                                </div>
                                <div class="card-body  pagina-container__body">
                                     ${seccion_busqueda_especial}
                                    <div class="grid-full">
                                        <table id="Grid_Catalogo" data-toolbar="#toolbar" data-search="true" data-advanced-search="true" data-id-table="advancedTable"  class="table table-striped w-auto table-fixed"></table>
                                    </div>
                                </div>

                            </div>
                           `;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}
function ev_get_template_pagina_inicial(_Body_Especial) {

    try {
        var tag_template = `
                            <div id="Controles_Ocultos" hidden>
                                <a id="Btn_Descargar_Archivos" href="..\..\paginas\Descargas\archivo.xlsx" download class="btn btn-default">Descargar&nbsp
                                        <i class="glyphicon glyphicon-download-alt text-info" style="font-size: 16px;"></i>
                                </a>
                            </div>


                            <div id="Card_Listado" class="card  m-0 p-0">
                                <div id="Card_Header_Listado" class="card-header pagina-container__header">
                                    <div id="toolbar_BtnIniciales" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div id="BtnGpo_Iniciales_Left" class="btn-group mr-2 pagina-container__buttons_left" role="group" aria-label="First group"></div>
                                        <span id="Header_Listado" class="pagina-container__titulo">Cargando...</span>
                                        <div id="BtnGpo_Iniciales_Right" class="btn-group mr-2 pagina-container__buttons_left" role="group" aria-label="First group"></div>
                                    </div>
                                </div>
                                <div class="card-body  pagina-container__body">
                                        ${_Body_Especial}
                                </div>

                            </div>
                           `;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}

function ev_get_template_registro_captura(_Tag_Campos) {

    try {

        var tag_template = `
                            <div id="Card_Registro" class="card m-0 p-0">
                                <div id="Card_Header_Registro" class="card-header pagina-container__header">
                                    <div id="toolbar_BtnRegistro" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div id="BtnGpo_Registro" class="btn-group mr-2 pagina-container__buttons_left" role="group" aria-label="First group">${EV_BTN_REGRESAR_REGISTRO_}${EV_BTN_GUARDAR_REGISTRO_}</div>
                                        <span id="Header_Registro" class="pagina-container__titulo">Cargando...</span>
                                    </div>
                                </div>

                                <div id="Card_Body_Registro" class="card-body  pagina-container__body">
                                    ${_Tag_Campos}
                                </div>
                            </div>
                           `;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

    return tag_template;
}



/*==================================== CLUES =====================================================*/

/**
 * * Se encarga de realizar una busqueda estadar de las CLUES, se encargara de invocar a la funcion que llenara el grid y mostrara el modal.
 * Previo a esto al cargar del diseño de la pagina que invocara esta funcion debera de utilizarse 
 * fg_Template_Modal_Busqueda: este trae el diseño del modal y del grid con los nombres que aqui se utilizaran para llenarlos y mostrarlos
 * @param {any} _Es_Boton
 * @param {any} _Txt_Busqueda
 * @param {any} _Evento_Btn_Seleccion
 */
function evStd_Buscar_CLUES(_Es_Boton, _Txt_Busqueda, _Evento_Btn_Seleccion) {

    try {

        var obj_parametros = new Object();
        if (!_Es_Boton) {
            obj_parametros.P_Buscar = _Txt_Busqueda.value;
        }


        var ruta = '../generales/StdController.asmx/get_Buscar_CLUES';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_parametros) });

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

                    var ds_result = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    evStd_Load_Busqueda_CLUES(ds_result.Dt_CLUES, _Evento_Btn_Seleccion);

                    if (ds_result.Dt_CLUES.length == 1) {

                        var registro_id = ds_result.Dt_CLUES[0].CLUE_ID;
                        var fn = window[_Evento_Btn_Seleccion];
                        if (typeof fn === 'function') {
                            fn(registro_id);
                        }

                    }
                    else {

                        //Modal_Busqueda es el nombre estandar que utiliza la plantilla fg_Template_Modal_Busqueda
                        var Modal_Busqueda_Titulo = document.getElementById('Modal_Busqueda_Titulo');
                        Modal_Busqueda_Titulo.innerHTML = 'Busqueda de Centros de Atención';

                        $('#Modal_Busqueda').modal('show');

                    }



                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function evStd_Load_Busqueda_CLUES(_Dt, _Evento_Btn_Seleccion) {
    var control_Grid = '#Grid_Busqueda';
    var columnas = [], datas = [];

    try {


        //Destruimos el grid
        $(control_Grid).bootstrapTable('destroy');
        //INACTIVAR REGISTRO
        columnas.push({
            title: '', align: 'center', valign: 'top', width: '50', searchable: true
            , field: ''
            , formatter: function (value, row) {
                //var adicionales = `<button id="evStd_Btn_Sel_CLUE_${row.CLUE_ID}" type="button" class="btn btn-block bg-transparent p-0 m-0" onclick="${_Evento_Btn_Seleccion}(${row.CLUE_ID});"><h3 class="m-0 p-0 font-weight-bold color-azul-claro-tam"><i class="fa fa-check-circle"></i></h3></button>`;
                var adicionales = fg_get_template_BtnSel('evStd_Btn_Sel_CLUE', _Evento_Btn_Seleccion, row.CLUE_ID);


                return adicionales;

            }
        });
        columnas.push({ field: 'CLUES', title: 'CLUES', visible: true, sortable: true, width: '250', clickToSelect: false, valign: 'top' });
        columnas.push({ field: 'NOMBRE_DE_LA_UNIDAD', title: 'Centro Atención', visible: true, sortable: true, width: '250', clickToSelect: false, valign: 'top' });


        //Crearmos el grid con las columnas
        $(control_Grid).bootstrapTable({
            cache: false,
            striped: true,
            pagination: true,
            pageSize: 10,
            pageList: [10, 20, 30, 40, 50, 100],
            //smartDysplay: true,
            search: true,
            searchOnEnterKey: false, //El método será ejecutado hasta que la tecla Enter sea presionada.
            showColumns: false,
            showRefresh: false,
            minimunCountColumns: 2,
            clickToSelect: true,

            columns: columnas
                ? columnas
                : [{ field: _Campos_ID, title: '', width: 0, align: 'center', valign: 'bottom', sortable: true, visible: true }]
        });

        if (_Dt !== null) {
            $(control_Grid).bootstrapTable('load', _Dt);
        }

    } catch (e) {
        fg_mostrar_mensaje(_INFORME_TECNICO_, e);
    }

}

/*==================================== ESPECIALIDAD =====================================================*/
function evStd_Buscar_Especialidad_Por_CLUES(_CLUE_ID, _Cmb, _Call_After_Evento) {

    try {

        var obj_parametros = new Object();
        obj_parametros.P_CLUE_ID = _CLUE_ID;

        var ruta = '../generales/StdController.asmx/get_Especialidades_Por_CLUES';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_parametros) });

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

                    var ds_result = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    fg_cargar_combo_from_List(_Cmb, 'Especialidad_ID', 'Especialidad', ds_result.Dt_Especialidades, !_Cmb.required);

                    if (!fg_isEmptyOrNull(_Call_After_Evento)) {
                        var fn = window[_Call_After_Evento];
                        if (typeof fn === 'function') {
                            fn();
                        }


                    }

                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

/*==================================== PACIENTES =====================================================*/
function evStd_Buscar_Pacientes(_Txt_Busqueda, _Evento_Btn_Seleccion) {

    try {

        var obj_parametros = new Object();
        obj_parametros.P_Busqueda = _Txt_Busqueda.value;

        var ruta = '../generales/StdController.asmx/get_Buscar_Paciente';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_parametros) });

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

                    var ds_result = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    evStd_Load_Busqueda_Pacientes(ds_result.Dt_Pacientes, _Evento_Btn_Seleccion);
                    //Modal_Busqueda es el nombre estandar que utiliza la plantilla fg_Template_Modal_Busqueda
                    var Modal_Busqueda_Titulo = document.getElementById('Modal_Busqueda_Titulo');
                    Modal_Busqueda_Titulo.innerHTML = 'Busqueda de Pacientes';
                    $('#Modal_Busqueda').modal('show');


                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function evStd_Load_Busqueda_Pacientes(_Dt, _Evento_Btn_Seleccion) {
    var control_Grid = '#Grid_Busqueda';
    var columnas = [], datas = [];

    try {


        //Destruimos el grid
        $(control_Grid).bootstrapTable('destroy');
        //INACTIVAR REGISTRO
        columnas.push({
            title: '', align: 'center', valign: 'top', width: '50', searchable: true
            , field: ''
            , formatter: function (value, row) {
                var adicionales = fg_get_template_BtnSel('evStd_Btn_Sel_Paciente', _Evento_Btn_Seleccion, row.Paciente_ID);

                return adicionales;
            }
        });
        columnas.push({ field: 'CURP', title: 'CURP', visible: true, sortable: true, width: '150', clickToSelect: false, valign: 'top' });
        columnas.push({ field: 'Nombre_Paciente_Completo', title: 'Nombre del Paciente', visible: true, sortable: true, width: '250', clickToSelect: false, valign: 'top' });
        columnas.push({ field: 'str_Fecha_Nacimiento', title: 'Fecha de Nacimiento', visible: true, sortable: true, width: '120', clickToSelect: false, valign: 'top' });
        columnas.push({ field: 'Sexo', title: 'Sexo', visible: true, sortable: true, width: '100', clickToSelect: false, valign: 'top' });


        //Crearmos el grid con las columnas
        $(control_Grid).bootstrapTable({
            cache: false,
            striped: true,
            pagination: true,
            pageSize: 10,
            pageList: [10, 20, 30, 40, 50, 100],
            //smartDysplay: true,
            search: true,
            searchOnEnterKey: false, //El método será ejecutado hasta que la tecla Enter sea presionada.
            showColumns: false,
            showRefresh: false,
            minimunCountColumns: 2,
            clickToSelect: true,

            columns: columnas
                ? columnas
                : [{ field: _Campos_ID, title: '', width: 0, align: 'center', valign: 'bottom', sortable: true, visible: true }]
        });

        if (_Dt !== null) {
            $(control_Grid).bootstrapTable('load', _Dt);
        }

    } catch (e) {
        fg_mostrar_mensaje(_INFORME_TECNICO_, e);
    }

}
