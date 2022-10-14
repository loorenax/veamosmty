using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace veamosmty.Data
{
    public static class DataSetExtensions
    {
        public static DataSet ToAllStringFields(this DataSet ds)
        {
            // Clone function -> does not copy the data, but just the structure.
            var newDs = ds.Clone();
            foreach (DataTable table in newDs.Tables)
            {
                // if the column is not string type -> set as string.
                foreach (DataColumn col in table.Columns)
                {
                    if (col.DataType != typeof(string))
                        col.DataType = typeof(string);
                }
            }

            // imports all rows.
            foreach (DataTable table in ds.Tables)
            {
                var targetTable = newDs.Tables[table.TableName];
                foreach (DataRow row in table.Rows)
                {
                    targetTable.ImportRow(row);
                }
            }

            return newDs;
        }
        public static DataSet ToAllStringFieldsTruncDate(this DataSet ds)
        {
            // Clone function -> does not copy the data, but just the structure.
            var newDs = ds.Clone();
            foreach (DataTable table in newDs.Tables)
            {
                // if the column is not string type -> set as string.
                foreach (DataColumn col in table.Columns)
                {
                    if (col.DataType != typeof(string))
                    {
                        col.DataType = typeof(string);
                    }

                }
            }

            // imports all rows.
            foreach (DataTable table in ds.Tables)
            {
                DataTable targetTable = newDs.Tables[table.TableName];
                foreach (DataRow row in table.Rows)
                {
                    targetTable.ImportRow(row);
                    int irow = targetTable.Rows.Count - 1;
                    foreach (DataColumn dc in table.Columns)
                    {
                        if (row[dc.ColumnName].GetType().Name == "DateTime")
                        {
                            object obj_fecha = targetTable.Rows[irow][dc.ColumnName];
                            if (obj_fecha != null)
                            {
                                string str_fecha = obj_fecha.ToString().Split(' ')[0];
                                targetTable.Rows[irow][dc.ColumnName] = str_fecha;
                            }
                        }
                    }
                }
            }

            return newDs;
        }

    }
}