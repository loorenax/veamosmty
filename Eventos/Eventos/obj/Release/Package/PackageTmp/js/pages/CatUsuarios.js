var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = 'Horarios de Academias';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;


function setTemplateCaptura() {

    var tag = '';

    try {

        tag = `

                <div class="card card-seccion shadow-0 p-30">
                    <div class="card-title p-1 m-0"><i>Datos del usuario</i></div>
                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('Nombre_Usuario', '', 'Nombre completo del usuario', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('Login', '', 'Nombre de Acceso', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_Select_Form_Group('idRol', '', 'Rol', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBoxPassword_Form('Password', '', 'Password', `required`)}
                                <button id="Btn_Open_Modal_Cambio_Password" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#Modal_Cambio_Password"><i class="ti ti-lock" ></i>Cambiar Contraseña</button>
                            </div>
                        </div>
                </div>

              `;

        var pnlCapturaBody = document.getElementById('Card_Captura_Body');
        pnlCapturaBody.innerHTML = tag;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function setTemplateCambioContraseña() {
    var tag = '';
    try {

        var tagbody = `
                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-5">
                                    ${fg_Template_TextBoxPassword_Form('Password_Modal', '', 'Password', 'required')}
                            </div>
                        </div>
                        `;

        var tagfooter = `<button id="BtnGuardar_Password" type="button" class="btn btn-success float-right"><i class="ti ti-save mr-1"></i>Guardar</button>`;
        var tagmodal = fg_Template_Modal('Modal_Cambio_Password', tagbody, 'Cambio de contraseña', tagfooter);

        var Seccion_Modales = document.getElementById('Seccion_Modales');
        Seccion_Modales.innerHTML += tagmodal;

    }

    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
document.addEventListener('DOMContentLoaded', function () {


    try {
        setTemplateCaptura();
        setTemplateCambioContraseña();

        PAGECONTROLS = fg_setIFRAMEControls(Contenedor_Principal_ID);

        PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        getInit();


        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);

        PAGECONTROLS.controls.Btn_Cerrar_Captura.addEventListener('click', btnCerrarClick);
        PAGECONTROLS.controls.Btn_Close_Captura.addEventListener('click', btnCerrarClick);


        PAGECONTROLS.controls.BtnGuardar_Password.addEventListener('click', BtnGuardar_PasswordClick);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});


function getInit() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSCatUsuarios.asmx/GetInit';
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

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    loadGrid(ds.Usuarios);
                    Ds.Roles = ds.Roles;

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
function getList() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSCatUsuarios.asmx/GetList';
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

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    loadGrid(ds.Usuarios);

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
function loadGrid(_Dt) {
    try {
        var columnas = [], datas = [];
        Control_Grid_Activo = '#Grid_Listado';

        $(Control_Grid_Activo).bootstrapTable('destroy');

        columnas.push({
            field: 'idUsuario', title: 'Opciones', visible: true, sortable: true, width: '50', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag_btn_seleccionar = fg_get_template_BtnEdit('btnEditar', 'btnEditarClick', row.idUsuario);
                tag_btn_seleccionar += fg_get_template_BtnCancel('btnInactivarActivar', 'btnInactivarActivarClick', row.idUsuario);

                return tag_btn_seleccionar;
            }
        });

        columnas.push({
            field: 'Nombre_Usuario', title: 'Usuario', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'left'
        });

        columnas.push({
            field: 'Login', title: 'Login', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'left'
        });

        columnas.push({
            field: 'Rol', title: 'Rol', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'left'
        });

        columnas.push({
            field: 'fechaUltimoCambio', title: 'Info. Creación', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `<div class="w-100">
                                <div class="w-100 d-block text-right">${row.str_fechaUltimoCambio}</div>
                                <small class="w-100 d-block text-info text-right">${row.Ultimo_Usuario_Cambio}</small>
                            </div>
                           `;

                return tag;
            }
        });

        columnas.push({
            field: 'fechaCreoRegistro', title: 'Info. Creación', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `<div class="w-100">
                                <div class="w-100 d-block text-right">${row.str_fechaCreoRegistro}</div>
                                <small class="w-100 d-block text-info text-right">${row.Usuario_Creo_Registro}</small>
                            </div>
                           `;

                return tag;
            }
        });



        columnas.push({
            field: 'Activo', title: 'Activo', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
        });



        $(Control_Grid_Activo).bootstrapTable({
            /*height: 650,*/
            cache: false,
            striped: true,
            pagination: true,
            smartDysplay: true,
            search: true,
            advancedSearch: true,
            searchOnEnterKey: false, //El método será ejecutado hasta que la tecla Enter sea presionada.
            /*showColumns: true,*/
            showFooter: true,

            minimunCountColumns: 2,
            clickToSelect: true,
            fixedColumns: true,

            dataShowExport: true,
            exportTypes: ['excel'],
            filterControl: true,
            /*showSearchClearButton: true,*/
            rowStyle: function (row, index) {
                if (row.activo == false) {
                    return {
                        css: { "background": "#fbeeee", "color": "#aba0a0" }
                    };
                }

                return {};

            },
            columns: columnas
                ? columnas
                : [{ field: _Campos_ID, title: '', width: 0, align: 'center', valign: 'bottom', sortable: true, visible: true }]
        });

        //Crearmos el grid con las columnas

        if (_Dt !== null) {
            $(Control_Grid_Activo).bootstrapTable('load', _Dt);
        }

        ToolBarBasica = `
                    <div class="btn-group mk-btn-group" role="group" aria-label="Basic example">
                      ${EV_BTN_NUEVO_}
                    </div>
                    `;

        var tool = document.getElementsByClassName('bs-bars float-left');
        tool[0].innerHTML = ToolBarBasica;

        var Btn_Nuevo_Catalogo = document.getElementById('Btn_Nuevo_Catalogo');
        Btn_Nuevo_Catalogo.addEventListener("click", btnNuevoClick);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function setRegistro() {


    try {

        if (fg_valida_captura_seccion(PAGECONTROLS.controls.Card_Captura_Body.id)) {

            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Card_Captura_Body.id);
            obj_filtros.P_idUsuario = Registro_ID_Seleccionado;

            var ruta = '../Services/WSCatUsuarios.asmx/SetRegistro';
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

                        fechaActual = mensaje_servidor.Str_Fecha_Actual;

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        if (fg_resultOK(ds.Result)) {
                            fg_alert_aviso_exitoso('El registro se guardo exitosamente');
                            fg_mensaje_pregunta_nuevo_registro('¿Desea continuar con un nuevo registro?', 'limpiarCaptura', 'btnCerrarClick');
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

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function setInactivarReactivar() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idUsuario = Registro_ID_Seleccionado;

        var ruta = '../Services/WSCatUsuarios.asmx/SetInactivarReactivar';
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

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {
                        fg_alert_aviso_exitoso('Usuarios', 'El registro se actualizo correctamente.');
                        getList();
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


/* ===== ===== ===== Estos se vinculan hasta que carga el grid del listado principal ===== ===== =====  */
function mostrarOcultarPassword(_mostrar_ocultar) {

    PAGECONTROLS.controls.Btn_Open_Modal_Cambio_Password.hidden = (_mostrar_ocultar == 'mostrar');

    PAGECONTROLS.controls.Txt_Password.parentElement.hidden = (_mostrar_ocultar == 'ocultar');
    fg_change_requiered(PAGECONTROLS.controls.Txt_Password, (_mostrar_ocultar == 'mostrar'));

}
function limpiarCaptura() {

    try {
        Registro_ID_Seleccionado = null;
        fg_limpiar_controles(PAGECONTROLS.controls.Card_Captura_Body.id);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Nuevo registro`;
        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idRol, 'idRol', 'Rol', Ds.Roles, false);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

        mostrarOcultarPassword('mostrar');
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnNuevoClick() {

    try {

        limpiarCaptura();
       
        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnEditarClick(_ID) {

    try {

        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idUsuario == _ID)[0];
        Registro_ID_Seleccionado = row.idUsuario;


        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idRol, 'idRol', 'Rol', Ds.Roles, false);

        fg_setDataControls(PAGECONTROLS.controls.Card_Captura_Body, row);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Editando - ${row.Nombre_Usuario}`;

        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, row.activo == false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = (row.activo == false);

        mostrarOcultarPassword('ocultar');

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnInactivarActivarClick(_ID) {

    try {
        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idUsuario == _ID)[0];

        var msg = `Usted esta indicando ${row.activo == true ? 'INACTIVAR' : 'REACTIVAR'} ${row.Nombre_Usuario}.`;
        Registro_ID_Seleccionado = row.idUsuario;
        fg_mensaje_pregunta(msg, 'setInactivarReactivar', null);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

/* ===== ===== ===== Estos se vinculan en DOMContentLoaded ===== ===== =====  */
function btnGuardarClick() {

    try {
        setRegistro();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnCerrarClick() {

    try {
        getList();
        fg_Cerrar_Ventana_Abierta();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function BtnGuardar_PasswordClick() {


    try {

        if (fg_valida_captura_seccion(PAGECONTROLS.controls.Modal_Cambio_Password_Body.id)) {

            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Modal_Cambio_Password_Body.id, 'Modal');
            obj_filtros.P_idUsuario = Registro_ID_Seleccionado;

            var ruta = '../Services/WSCatUsuarios.asmx/SetCambioPassword';
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

                        fechaActual = mensaje_servidor.Str_Fecha_Actual;

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        if (fg_resultOK(ds.Result)) {
                            fg_alert_aviso_exitoso('Cambio de contraseña', 'El password se actualizo exitosamente.');
                            fg_limpiar_controles(PAGECONTROLS.controls.Modal_Cambio_Password_Body.id);
                            PAGECONTROLS.controls.Modal_Cambio_Password_Btn_Cerrar.click();
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

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
