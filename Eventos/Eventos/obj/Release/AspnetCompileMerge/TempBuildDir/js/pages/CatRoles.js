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

                <div class="card card-seccion shadow-0 p-5">
                    <div class="card-title p-1 m-0"><i>Datos del usuario</i></div>
                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('rol', '', 'Nombre del rol', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-end ">
                                <button id="Btn_Guardar_Captura" type="button" class="btn btn-primary float-right"><i class="fa fa-save"></i>Guardar</button>
                            </div>
                        </div>
                </div>

                <div id="Div_Grid_Listado_Accesos" class="w-100">
                    
                </div>

              `;


        /*<table id="Grid_Listado_Accesos" data-toolbar="#toolbar_Accesos" class="table table-sm"></table>*/
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



    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});


function getInit() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSCatRoles.asmx/GetInit';
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
                    loadGrid(ds.Roles);

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

        var ruta = '../Services/WSCatRoles.asmx/GetList';
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

                    loadGrid(ds.Roles);

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
            field: 'idRol', title: 'Opciones', visible: true, sortable: true, width: '50', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag_btn_seleccionar = fg_get_template_BtnEdit('btnEditar', 'btnEditarClick', row.idRol);
                tag_btn_seleccionar += fg_get_template_BtnCancel('btnInactivarActivar', 'btnInactivarActivarClick', row.idRol);

                return tag_btn_seleccionar;
            }
        });

        columnas.push({
            field: 'rol', title: 'Rol', visible: true, sortable: true, width: '400', clickToSelect: false, align: 'left'
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
            obj_filtros.P_idRol = Registro_ID_Seleccionado;

            var ruta = '../Services/WSCatRoles.asmx/SetRegistro';
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
                            Registro_ID_Seleccionado = ds.Result[0].ID_Generado;
                            loadGridAccesos(ds.Accesos);
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
        obj_filtros.P_idRol = Registro_ID_Seleccionado;

        var ruta = '../Services/WSCatRoles.asmx/SetInactivarReactivar';
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
        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idRol, 'idRol', 'Rol', Ds.Roles, false);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

        PAGECONTROLS.controls.Div_Grid_Listado_Accesos.style.display = 'none';

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
        var row = dt.filter(x => x.idRol == _ID)[0];

        Registro_ID_Seleccionado = row.idRol;
        getAccesosByRol(row.idRol);

        fg_setDataControls(PAGECONTROLS.controls.Card_Captura_Body, row);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Editando - ${row.rol}`;

        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, row.activo == false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = (row.activo == false);

        PAGECONTROLS.controls.Div_Grid_Listado_Accesos.style.display = '';

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnInactivarActivarClick(_ID) {

    try {
        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idRol == _ID)[0];

        var msg = `Usted esta indicando ${row.activo == true ? 'INACTIVAR' : 'REACTIVAR'} ${row.rol}.`;
        Registro_ID_Seleccionado = row.idRol;
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


function BtnChk_Activo_Click(_idMenu) {

    try {

        var row = new Object();
        var btnchk = document.getElementById(`BtnChk_idMenu_${_idMenu}`);
        fg_BtnChk_ChekClik(btnchk);

        row.P_activo = fg_BtnChk_IsChecked(btnchk);
        row.P_idMenu = _idMenu;
        row.P_idRol = Registro_ID_Seleccionado;


        setAcceso(row);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function loadGridAccesos(_Dt) {


    try {

        var Div_Grid_Listado_Accesos = document.getElementById('Div_Grid_Listado_Accesos');
        Div_Grid_Listado_Accesos.style.display = '';
        var menusParent = new Array();
        _Dt.forEach(a => {

            if (a.idMenuParent == null) {
                if (menusParent.length == 0) {
                    menusParent.push(a);
                }
                else {

                    var busca = menusParent.filter(x => x.idMenu == a.idMenu);
                    if (busca.length == 0) {
                        menusParent.push(a);
                    }
                }
            }

        })

        var tagMenu = '';
        menusParent.forEach(m => {

            var buscaopciones = _Dt.filter(o => o.idMenuParent == m.idMenu);
            var tagopciones = '';
            var countChecked = 0;
            buscaopciones.forEach(o => {

                var showChecked = false;
                if (o.activo == true) {
                    showChecked = true;
                    countChecked++;
                }

                var evento = ` onclick = "BtnChk_Activo_Click(${o.idMenu});"`;
                tagopciones += `<div class="w-100">
                                    ${fg_Template_BtnChk_Form_Group_V2(`idMenu_${o.idMenu}`, showChecked, o.nombreMenu, ` ${evento}`)}
                               </div>`;
            })


            var evento = ` onclick = "BtnChk_Activo_Click(${m.idMenu});"`;
            tagMenu += `
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <div class="card p-0">
                                <div class="card-header">                    
                                    ${fg_Template_BtnChk_Form_Group_V2(`idMenu_${m.idMenu}`, (countChecked > 0), m.nombreMenu, ` ${evento}`)}
                                </div>
                                <div class="card-body p-20">
                                    ${tagopciones}
                                </div>
                            </div>
                        </div>
                       `;

        })


        tagMenu = `
                    <div class="row">
                        ${tagMenu}
                    </div>
                  `;

        Div_Grid_Listado_Accesos.innerHTML = tagMenu;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function getAccesosByRol(_idRol) {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idRol = _idRol;

        var ruta = '../Services/WSCatRoles.asmx/GetAccesosByRol';
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
                    loadGridAccesos(ds.Accesos);

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
function setAcceso(_Obj) {


    try {


        var obj_filtros = Object();
        obj_filtros = _Obj;

        var ruta = '../Services/WSCatRoles.asmx/SetAcceso';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (datos) {

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);


                    if (fg_resultOK(ds.Result)) {
                        fg_alert_aviso_exitoso('Acceso', 'El permiso de acceso se actualizo correctamente.');

                        loadGridAccesos(ds.Accesos);
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