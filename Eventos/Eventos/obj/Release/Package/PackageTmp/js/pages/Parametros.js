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
                    <div class="card-title p-1 m-0"><i>Parametros</i></div>
                        <div class="row p-1">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_TextBoxPassword_Form('passwordContactos', '', 'Contraseña default para los contacto del alumno', `required`)}
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-end ">
                                <button id="Btn_Guardar_Captura" type="button" class="btn btn-primary float-right"><i class="fa fa-save"></i>Guardar</button>
                            </div>
                        </div>
                </div>

                <div class="card card-seccion shadow-0 p-5">
                    <div class="card-title p-1 m-0"><i>Academias únicas</i></div>
                        <table id="Grid_Listado_AcademiasUnicas" data-toolbar="#toolbar_AcademiasUnicas" data-search="true" data-advanced-search="true" data-id-table="advancedTable" data-show-export="true" class="table table-striped table-sm"></table>
                </div>

              `;


        /*<table id="Grid_Listado_Accesos" data-toolbar="#toolbar_Accesos" class="table table-sm"></table>*/
        var pnlCapturaBody = document.getElementById('Card_Listado_Body');
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


        fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        getInit();
        getInitAcademiasUnicas();

        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});

function getInit() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSSeguridad.asmx/GetParametros';
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
                    fg_setDataControls(PAGECONTROLS.controls.Card_Listado_Body, ds.Parametros[0]);

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
function setRegistro() {


    try {

        if (fg_valida_captura_seccion(PAGECONTROLS.controls.Card_Listado_Body.id)) {

            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Card_Listado_Body.id);
            obj_filtros.P_idRol = Registro_ID_Seleccionado;

            var ruta = '../Services/WSSeguridad.asmx/SetParametros';
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
                            fg_alert_aviso_exitoso('Parametros','El registro se guardo exitosamente');
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



/* ===== ===== ===== Estos se vinculan en DOMContentLoaded ===== ===== =====  */
function btnGuardarClick() {

    try {
        setRegistro();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}




/* ===== ===== ===== Academias Unicas ===== ===== =====  */
function getInitAcademiasUnicas() {


    try {


        var obj_filtros = Object();

        var ruta = '../Services/WSSeguridad.asmx/GetAcademiasUnicas';
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
                    loadGridAcademiasUnicas(ds.Academias);

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
function loadGridAcademiasUnicas(_Dt) {
    try {
        var columnas = [], datas = [];
        Control_Grid_Activo = '#Grid_Listado_AcademiasUnicas';

        $(Control_Grid_Activo).bootstrapTable('destroy');

        columnas.push({
            field: 'idAcademia', title: 'Opciones', visible: true, sortable: true, width: '50', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag_btn_seleccionar = fg_Template_BtnChk_Form_Sin_Etiqueta('idAcademia_${row.idAcademia}', (row.activo == true), ` onclick="BtnChk_Sel_Academia_Click(${row.idAcademia}, ${row.idAcademiaUnica});"`);

                return tag_btn_seleccionar;
            }
        });

        columnas.push({
            field: 'academia', title: 'Academia', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });

        columnas.push(fg_Col_Grid_fechaUltimoCambio());
        columnas.push(fg_Col_Grid_fechaCreoRegistro());


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

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function BtnChk_Sel_Academia_Click(_idAcademia, _idAcademiaUnica) {
    try {


        var obj_filtros = Object();
        obj_filtros.P_idAcademia = _idAcademia;
        obj_filtros.P_idAcademiaUnica = _idAcademiaUnica;

        var ruta = '../Services/WSSeguridad.asmx/SetAcademiasUnicas';
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

                        fg_alert_aviso_exitoso('Academias Únicas', 'La academia única se actualizó correctamente.');
                        getInitAcademiasUnicas();
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