var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = '';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;

var DtMenusParents = null;

var DtSiNo = [{ id: 'SI', descripcion: 'Si' }, { id: 'NO', descripcion: 'No' }];
var DtSexo = [{ idSexo: 'Femenino', sexo: 'Femenino' }, { idSexo: 'Masculino', sexo: 'Masculino' }];
var DtMes = [{ idMes: '01', mes: 'Enero' }
                , { idMes: '02', mes: 'Febrero' }
                , { idMes: '03', mes: 'Marzo' }
                , { idMes: '04', mes: 'Abril' }
                , { idMes: '05', mes: 'Mayo' }
                , { idMes: '06', mes: 'Junio' }
                , { idMes: '07', mes: 'Julio' }
                , { idMes: '08', mes: 'Agosto' }
                , { idMes: '09', mes: 'Septiembre' }
                , { idMes: '10', mes: 'Octubre' }
                , { idMes: '11', mes: 'Novimienbre' }
                , { idMes: '12', mes: 'Diciembre' }
             ];

function setTemplateCaptura() {

    var tag = '';

    try {

        tag = `

                <div class="card mk-card-seccion">
                    <div class="card-title mk-card-title">Datos generales</div>

                        <div class="row">
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('nombre', '', 'Nombre', `required`)}
                            </div>
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('paterno', '', 'Ap. Paterno', ` required`)}
                            </div>
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('materno', '', 'Ap. Materno', ` `)}
                            </div>

                            <div class="col-sm-3 col-md-3 col-lg-2">
                                ${fg_Template_Select_Form_Group('sexo', '', 'Sexo', ``)}
                            </div>
                            <div class="col-sm-9 col-md-7 col-lg-4">
                                ${fg_Template_Fecha_Nacimiento()}
                            </div>
                        </div>


                </div>

                <div class="card mk-card-seccion">
                    <div class="card-title mk-card-title"><i>Dirección</i></div>

                        <div class="row">
                            <div class="col-sm-8 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('calle', '', 'Calle', ``)}
                            </div>
                            <div class="col-sm-2 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('int', '', 'Int.', ``)}
                            </div>
                            <div class="col-sm-2 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('ext', '', 'Ext.', ``)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-8 col-md-6 col-lg-4">
                                ${fg_Template_TextBox_Form_Group('colonia', '', 'Colonia', ``)}
                            </div>
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBoxNum_Form_Group('cp', '', 'C.P.', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('estado', '', 'Estado', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('municipio', '', 'Municipio', ``)}
                            </div>
                        </div>

                </div>

                <div class="card mk-card-seccion">
                    <div class="card-title mk-card-title"><i>Información Electoral</i></div>

                        <div class="row">
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('distritoLocal', '', 'Distrito Local', ``)}
                            </div>
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('distritoFederal', '', 'Distrito Federal', ``)}
                            </div>
                            <div class="col-sm-4 col-md-3 col-lg-2">
                                ${fg_Template_TextBox_Form_Group('seccion', '', 'Seccion', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('curp', '', 'CURP', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('ine', '', 'INE', ``)}
                            </div>
                        </div>

                </div>

                <div class="card mk-card-seccion">
                    <div class="card-title mk-card-title"><i>Datos de contacto</i></div>

                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('telefonoCelular', '', 'Celular', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('telefonoFijo', '', 'Tel. Fijo', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('correoElectronico', '', 'Correo Electrónico', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('cuentaFacebook', '', 'Facebook', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                ${fg_Template_Select_Form_Group('deseaMasInformacion', '', 'Desea más información', ``)}
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-6">
                                ${fg_Template_TextArea_Form('comentarios', '', 'Comentarios', ``)}
                            </div>
                        </div>

                </div>

              `;

        var pnlCapturaBody = document.getElementById('Card_Listado_Body');
        pnlCapturaBody.innerHTML = tag;


        var tagfooter = `
                            <button id="Btn_Guardar_Captura" type="button" class="btn btn-success mk-btn-footer">Guardar</button>
                            <button id="Btn_Nuevo_Captura" type="button" class="btn btn-primary mk-btn-footer">Nuevo</button>

                        `;

        var Card_Listado_footer = document.getElementById('Card_Listado_footer');
        Card_Listado_footer.innerHTML = tagfooter;

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

        //PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        //PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        //fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes, 'idMes', 'mes', DtMes, false);
        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_sexo, 'idSexo', 'sexo', DtSexo, false);
        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_deseaMasInformacion, 'id', 'descripcion', DtSiNo, false);
        

        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);
        PAGECONTROLS.controls.Btn_Nuevo_Captura.addEventListener('click', btnNuevoClick);

        //PAGECONTROLS.controls.Btn_Cerrar_Captura.addEventListener('click', btnCerrarClick);
        //PAGECONTROLS.controls.Btn_Close_Captura.addEventListener('click', btnCerrarClick);



    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});



function setRegistro() {


    try {

        if (fg_valida_captura_seccion(PAGECONTROLS.controls.Card_Listado_Body.id)) {

            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Card_Listado_Body.id);
            obj_filtros.deseaMasInformacion = (PAGECONTROLS.controls.Cmb_deseaMasInformacion.value == 'SI');
            obj_filtros.P_idRegistro = Registro_ID_Seleccionado;
            obj_filtros.P_fecnac = PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value
                + '-' + PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value
                + '-' + PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value;

            var ruta = '../Services/WSRegistro.asmx/SetRegistro';
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

                            Registro_ID_Seleccionado = ds.Result[0].idGenerado;
                            fg_alert_aviso_exitoso('El registro se guardo exitosamente');
                            fg_mensaje_pregunta_nuevo_registro('¿Desea continuar con un nuevo registro?', 'limpiarCaptura', null);
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

        var ruta = '../Services/WSRegistro.asmx/SetInactivarReactivar';
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
        fg_limpiar_controles(PAGECONTROLS.controls.Card_Listado_Body.id);
        //PAGECONTROLS.controls.tituloDetalle.innerHTML = `Nuevo registro`;

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Listado_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnNuevoClick() {

    try {

        limpiarCaptura();

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
        fg_setDataControls(PAGECONTROLS.controls.Card_Listado_Body, row);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Editando - ${row.nombreMenu}`;

        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Listado_Body, row.activo == false);
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
