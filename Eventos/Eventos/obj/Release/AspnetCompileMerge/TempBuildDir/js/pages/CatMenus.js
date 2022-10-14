var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = 'Horarios de Academias';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;

var DtMenusParents = null;

function setTemplateCaptura() {

    var tag = '';

    try {

        tag = `

                <div class="card card-seccion shadow-0 p-30">
                    <div class="card-title p-1 m-0"><i>Datos del usuario</i></div>
                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-end ">
                                ${fg_Template_BtnChk_Form_Group_V2('esMenuParent', '', 'Es un grupo de opciones', `required`)}
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('nombreMenu', '', 'Nombre del menú', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('tituloMenu', '', 'Título de la ventana', `required`)}
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                ${fg_Template_TextBoxNum_Form_Group('secuencia', '', 'Secuencia', `required`)}
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('icono', '', 'Icono', `required`)}
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('url', '', 'Url', `required`)}
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_Select_Form_Group('idMenuParent', '', 'Grupo', `required`)}
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

document.addEventListener('DOMContentLoaded', function () {


    try {
        setTemplateCaptura();

        PAGECONTROLS = fg_setIFRAMEControls(Contenedor_Principal_ID);
        fg_setTitlePagina();

        PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        getInit();


        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);

        PAGECONTROLS.controls.Btn_Cerrar_Captura.addEventListener('click', btnCerrarClick);
        PAGECONTROLS.controls.Btn_Close_Captura.addEventListener('click', btnCerrarClick);


        PAGECONTROLS.controls.BtnChk_esMenuParent.addEventListener('click', BtnChk_esMenuParent_Click);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});


function getInit() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSCatMenus.asmx/GetInit';
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
                    loadGrid(ds.Menus);

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

        var ruta = '../Services/WSCatMenus.asmx/GetList';
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

                    loadGrid(ds.Menus);

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
            field: 'idMenu', title: 'Opciones', visible: true, sortable: true, width: '50', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag_btn_seleccionar = fg_get_template_BtnEdit('btnEditar', 'btnEditarClick', row.idMenu);
                tag_btn_seleccionar += fg_get_template_BtnCancel('btnInactivarActivar', 'btnInactivarActivarClick', row.idMenu);

                return tag_btn_seleccionar;
            }
        });

        columnas.push({
            field: 'nombreMenu', title: 'Nombre Menú', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'tituloMenu', title: 'Título', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'url', title: 'Url', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'icono', title: 'Icono', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'secuencia', title: 'Secuencia', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'right'
        });
        columnas.push({
            field: 'nombreMenuParent', title: 'Nombre Grupo Menú', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });



        columnas.push(fg_Col_Grid_fechaUltimoCambio());
        columnas.push(fg_Col_Grid_fechaCreoRegistro());
        columnas.push(fg_Col_Grid_Activo());


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
            obj_filtros.P_idMenu = Registro_ID_Seleccionado;

            var ruta = '../Services/WSCatMenus.asmx/SetRegistro';
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

                            DtMenusParents = ds.MenusParents;
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
        obj_filtros.P_idMenu = Registro_ID_Seleccionado;

        var ruta = '../Services/WSCatMenus.asmx/SetInactivarReactivar';
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
function limpiarCaptura() {

    try {
        Registro_ID_Seleccionado = null;
        fg_limpiar_controles(PAGECONTROLS.controls.Card_Captura_Body.id);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Nuevo registro`;
        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idMenu, 'idMenu', 'Rol', Ds.Menus, false);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

        fg_ChekedUnchecked(PAGECONTROLS.controls.BtnChk_esMenuParent, false);


        aplicarPermisosMenu();

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnNuevoClick() {

    try {

        limpiarCaptura();
        getMenusParents(true);
        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnEditarClick(_ID) {

    try {

        limpiarCaptura();
        
        getMenusParents(false);
        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idMenu == _ID)[0];

        
        Registro_ID_Seleccionado = _ID;
        fg_setDataControls(PAGECONTROLS.controls.Card_Captura_Body, row);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Editando - ${row.nombreMenu}`;

        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, row.activo == false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = (row.activo == false);

        fg_ChekedUnchecked(PAGECONTROLS.controls.BtnChk_esMenuParent, (row.idMenuParent == null))

        aplicarPermisosMenu();

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnInactivarActivarClick(_ID) {

    try {
        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idMenu == _ID)[0];

        var msg = `Usted esta indicando ${row.activo == true ? 'INACTIVAR' : 'REACTIVAR'} ${row.nombreMenu}.`;
        Registro_ID_Seleccionado = row.idMenu;
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
        fg_Cerrar_Ventana_Abierta();
        getList();

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}



function getMenusParents(_async) {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSCatMenus.asmx/GetMenusParents';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: _async,
            cache: false,
            success: function (datos) {

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    DtMenusParents = ds.MenusParents;
                    fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idMenuParent, 'idMenu', 'nombreMenu', DtMenusParents, false);

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
function aplicarPermisosMenu() {

    try {
        if (fg_BtnChk_IsChecked(PAGECONTROLS.controls.BtnChk_esMenuParent)) {
            PAGECONTROLS.controls.Txt_url.value = null;
            $(PAGECONTROLS.controls.Cmb_idMenuParent).empty();

            fg_change_requiered(PAGECONTROLS.controls.Txt_url, false);
            fg_change_requiered(PAGECONTROLS.controls.Cmb_idMenuParent, false);

            PAGECONTROLS.controls.Txt_url.disabled = true;
            PAGECONTROLS.controls.Cmb_idMenuParent.disabled = true;
        }
        else {

            fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idMenuParent, 'idMenu', 'nombreMenu', DtMenusParents, false);

            fg_change_requiered(PAGECONTROLS.controls.Txt_url, true);
            fg_change_requiered(PAGECONTROLS.controls.Cmb_idMenuParent, true);

            PAGECONTROLS.controls.Txt_url.disabled = false;
            PAGECONTROLS.controls.Cmb_idMenuParent.disabled = false;

        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function BtnChk_esMenuParent_Click() {

    try {

        fg_BtnChk_ChekClik(PAGECONTROLS.controls.BtnChk_esMenuParent);

        aplicarPermisosMenu();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}