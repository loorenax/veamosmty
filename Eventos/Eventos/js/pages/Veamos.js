var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = '';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;

var DtMenusParents = null;

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

                <div class="card">
                    <div class="card-title">Datos generales del alumno</div>

                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-4">
                                ${fg_Template_Select_Form_Group('idColegio', '', 'Colegio', `required`)}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-8">
                                ${fg_Template_TextBox_Form_Group('nombreAlumno', '', 'Nombre completo del alumno', `required`)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('grado', '', 'Grado', ``)}
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-3">
                                ${fg_Template_TextBox_Form_Group('grupo', '', 'Grupo', ``)}
                            </div>

                        </div>
                </div>


                <div class="card">
                    <div class="card-title">Datos de la persona que autoriza</div>
                    <div class="row mt-4 mb-2">
                        <div class="col-sm-4 col-md-4 col-lg-2">
                            ${fg_Template_TextBox_Form_Group('nombrePadre', '', 'Primer Nombre', `required`)}
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-2">
                            ${fg_Template_TextBox_Form_Group('segundoNombrePadre', '', 'Segundo Nombre (en caso de tener)', ``)}
                        </div>

                        <div class="col-sm-4 col-md-4 col-lg-2">
                            ${fg_Template_TextBox_Form_Group('apellidoPaternoPadre', '', 'Ap. Paterno', ` required`)}
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-2">
                            ${fg_Template_TextBox_Form_Group('apellidoMaternoPadre', '', 'Ap. Materno', ``)}
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-4">
                            ${fg_Template_Fecha_Nacimiento()}
                        </div>

                        <div class="col-sm-4 col-md-4 col-lg-2">
                            ${fg_Template_TextBox_Form_Group('telefonoContacto', '', 'Teléfono de contacto', `required`)}
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-12 text-right">

                        </div>
                    </div>
                </div>


              `;

        var pnlCapturaBody = document.getElementById('Card_Listado_Body');
        pnlCapturaBody.innerHTML = tag;


        var tagfooter = `
                            <div class="w-100 text-right">
                                ${fg_Template_BtnChk_Form_Group_V2('autorizaPrueba', '', 'Al completar este registro, se autoriza el uso de datos personales para información, atención y seguimiento del programa Veamos Monterrey', ``)}
                                <button id="Btn_Guardar_Captura" type="button" class="btn btn-success mk-btn-footer">Guardar</button>
                                <button id="Btn_Nuevo_Captura" type="button" class="btn btn-primary mk-btn-footer" hidden>Nuevo</button>
                            </div>
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
        fg_setTitlePaginaFijo("Registro de alumnos");

        //PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        //PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        //fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes, 'idMes', 'mes', DtMes, false);
        //fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_sexo, 'idSexo', 'sexo', DtSexo, false);
        //fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_deseaMasInformacion, 'id', 'descripcion', DtSiNo, false);

        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);
        PAGECONTROLS.controls.Btn_Nuevo_Captura.addEventListener('click', btnNuevoClick);
        PAGECONTROLS.controls.BtnChk_autorizaPrueba.addEventListener('click', BtnChk_autorizaPrueba_Click);

        $('#Cmb_idColegio').select2();

        getInit();


        limpiarCaptura();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});

function getInit() {


    try {

            var obj_filtros = Object();

        var ruta = '../Services/WSVeamos.asmx/GetInit';
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

                        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio, 'idColegio', 'NOMBRECT', ds.Colegios, false);

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

            if (!fg_BtnChk_IsChecked(PAGECONTROLS.controls.BtnChk_autorizaPrueba)) {

                fg_mensaje_aviso_restriccion('No ha autorizado el uso de sus datos.', 'Debe indicar que autoriza el uso de sus datos.')
                return
            }


            
            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Card_Listado_Body.id);
            obj_filtros.autorizaPrueba = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_autorizaPrueba) == 'SI';
            obj_filtros.P_idRegistro = Registro_ID_Seleccionado;
            obj_filtros.P_fechaNacPadre = PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value
                + '-' + PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value
                + '-' + PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value;

            var Btn_Guardar_Captura = document.getElementById('Btn_Guardar_Captura');
            var icono_inicial = fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, _SPINNER_);
            var ruta = '../Services/WSVeamos.asmx/SetRegistro';
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

                    fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, icono_inicial);

                    var mensaje_servidor = JSON.parse(datos.d);

                    if (mensaje_servidor.Estatus == _OK_) {

                        fechaActual = mensaje_servidor.Str_Fecha_Actual;

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        if (fg_resultOK(ds.Result)) {

                            Registro_ID_Seleccionado = ds.Result[0].idGenerado;
                            fg_alert_aviso_exitoso('El registro se guardo exitosamente');
                            fg_mensaje_pregunta_nuevo_registro(`Su solicitud se registró exitosamente. <br> ¿Desea capturar otra solicitud para otro alumno?`, 'limpiarCaptura', 'salir');


                        }
                    }
                    else {
                        fg_mensaje_problema_tecnico(mensaje_servidor);
                    }

                }
                , error: function (error) {

                    fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, icono_inicial);
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

        var ruta = '../Services/WSVeamos.asmx/SetInactivarReactivar';
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
function salir() {
    limpiarCaptura();
    location.href = 'https://veamos.veamosmonterrey.com/';
}

/* ===== ===== ===== Estos se vinculan hasta que carga el grid del listado principal ===== ===== =====  */
function limpiarCaptura() {

    try {
        Registro_ID_Seleccionado = null;
        fg_limpiar_controles(PAGECONTROLS.controls.Card_Listado_Body.id);
        //PAGECONTROLS.controls.tituloDetalle.innerHTML = `Nuevo registro`;

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Listado_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

        fg_ChekedUnchecked(PAGECONTROLS.controls.BtnChk_autorizaPrueba, true);
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



function BtnChk_autorizaPrueba_Click() {

    fg_BtnChk_ChekClik(PAGECONTROLS.controls.BtnChk_autorizaPrueba);
}