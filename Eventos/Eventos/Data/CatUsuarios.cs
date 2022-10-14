using Microsoft.ApplicationBlocks.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace veamosmty.Data
{
    public class CatUsuarios
    {
        Cnxn cnxn = new Cnxn();

        /// <summary>
        /// Trae el listado inicial del catalogo
        /// y los catalogos fijos que se requieran en la captura
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet GetInit(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_getInitUsuarios";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Usuarios";
            ds.Tables[1].TableName = "Roles";

            return ds;
        }

        /// <summary>
        /// Se trae el listado inicial del catalogo
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet GetList(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_getCatUsuarios";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Usuarios";

            return ds;
        }
        
        /// <summary>
        /// Se encarga de hacer Insert y Update
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet SetRegistro(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_setCatUsuario";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);

            if (dyparametros["P_idUsuario"] == null) {
                dyparametros["P_pass"] = Utils.EncryptarCadena(dyparametros["P_pass"].ToString());
            }

            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";
            ds.Tables[1].TableName = "Usuarios";

            return ds;
        }

        /// <summary>
        /// Metodo especifico para Inactivar o Reactivar el registro por estandar es el campo Activo = 'SI'/'NO'
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet SetInactivarReactivar(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_cancelreactiar_Registro";

            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            dyparametros["P_tabla"] = "catUsuarios";
            dyparametros["P_idCampo"] = "idUsuario";
            dyparametros["P_idValor"] = _DyParametros["P_idUsuario"].ToString();

            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);
            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);
            ds.Tables[0].TableName = "Result";


            return ds;
        }



        /// <summary>
        /// Se encarga de hacer Insert y Update
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet SetCambioPassword(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "captura_setCatUsuarioCambioPass";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            dyparametros["P_pass"] = Utils.EncryptarCadena(dyparametros["P_pass"].ToString());
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";

            return ds;
        }
    }
}