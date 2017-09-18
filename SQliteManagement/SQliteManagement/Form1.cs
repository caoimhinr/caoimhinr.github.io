using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SQLite;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SQliteManagement
{
    public partial class Form1 : Form
    {
        private bool _updating;

        public Form1()
        {
            InitializeComponent();
            var connection = new SQLiteConnection("Data Source=tower.db");
            connection.Open();
            var statement = @"SELECT name FROM sqlite_master WHERE type='table';";
            var command = new SQLiteCommand(statement, connection);
            var adapter = new SQLiteDataAdapter(command);
            var table = new DataTable();
            adapter.Fill(table);
            cboTables.Items.Clear();
            foreach (DataRow row in table.Rows)
            {
                cboTables.Items.Add(row["name"].ToString());
            }
        }

        private void cboTables_SelectedValueChanged(object sender, EventArgs e)
        {
            if (cboTables.SelectedItem != null)
            {
                var tableName = cboTables.SelectedItem.ToString();
                using (var connection = new SQLiteConnection("Data Source=tower.db"))
                {
                    connection.Open();
                    var statement = String.Format(@"SELECT * FROM {0};", tableName);
                    var command = new SQLiteCommand(statement, connection);
                    var adapter = new SQLiteDataAdapter(command);
                    var table = new DataTable(tableName);
                    adapter.Fill(table);
                    _updating = true;
                    table.TableNewRow += table_TableNewRow;
                    dtgData.DataSource = table.DefaultView;
                    _updating = false;
                }
            }
        }

        private void table_TableNewRow(object sender, DataTableNewRowEventArgs e)
        {
            if (cboTables.SelectedItem != null)
            {
                var tableName = cboTables.SelectedItem.ToString();
                switch (tableName)
                {
                    case "item":
                        e.Row["Name"] = "";
                        e.Row["Equipped"] = false;
                        e.Row["IsEquippable"] = false;
                        e.Row["IsConsumable"] = false;
                        e.Row["Gold"] = 0;
                        e.Row["ConsumableExp"] = 0;
                        e.Row["ConsumableCurrentHP"] = 0;
                        e.Row["ConsumableHP"] = 0;
                        e.Row["ConsumableATK"] = 0;
                        e.Row["ConsumableDEF"] = 0;
                        e.Row["ConsumableSPD"] = 0;
                        e.Row["ConsumableWIS"] = 0;
                        e.Row["ATK"] = 0;
                        e.Row["WIS"] = 0;
                        e.Row["Combo"] = 0;
                        break;
                    case "npc":
                        e.Row["Name"] = "";
                        e.Row["HP"] = 0;
                        e.Row["CurrentHP"] = 0;
                        e.Row["ATK"] = 0;
                        e.Row["DEF"] = 0;
                        e.Row["SPD"] = 0;
                        e.Row["WIS"] = 0;
                        e.Row["EXP"] = 0;
                        e.Row["Gold"] = 0;
                        e.Row["Item"] = 0;
                        break;
                    case "combo":
                        e.Row["Name"] = "";
                        e.Row["ItemSequence"] = "";
                        e.Row["ComboSequence"] = "";
                        e.Row["AnyCombo"] = false;
                        e.Row["ModATK"] = 0;
                        e.Row["ModWIS"] = 0;
                        e.Row["ProcRate"] = 0;
                        e.Row["lifesteal"] = 0;
                        e.Row["Gold"] = 0;
                        e.Row["SPD"] = 0;
                        e.Row["Exp"] = 0;
                        break;
                }

                var maxId = int.MinValue;
                foreach (DataRow dr in e.Row.Table.Rows)
                {
                    var id = dr.Field<int>("Id");
                    maxId = Math.Max(maxId, id);
                }
                e.Row["Id"] = maxId + 1;
            }
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            using (var connection = new SQLiteConnection("Data Source=tower.db"))
            {
                connection.Open();
                var view = (DataView)dtgData.DataSource;
                var table = view.Table.GetChanges();
                if (table != null)
                {
                    var statement = @"UPDATE " + table.TableName + " SET ";
                    foreach (DataColumn column in table.Columns)
                    {
                        if (!column.ColumnName.Equals("Id"))
                            statement += column.ColumnName + "=@" + column.ColumnName + ",";
                    }
                    statement = statement.Substring(0, statement.Length - 1) + " WHERE Id=@Id";

                    var command = new SQLiteCommand(statement, connection);
                    foreach (DataRow row in table.Rows)
                    {
                        command.Parameters.Clear();
                        foreach (DataColumn column in table.Columns)
                        {
                            command.Parameters.AddWithValue("@" + column.ColumnName, row[column.ColumnName]);
                        }
                        var result = command.ExecuteNonQuery();
                        if (result == 0)
                        {
                            statement = @"INSERT INTO " + table.TableName + " VALUES (";
                            command = new SQLiteCommand(connection);
                            foreach (DataColumn column in table.Columns)
                            {
                                statement += "@" + column.ColumnName + ",";
                                command.Parameters.AddWithValue("@" + column.ColumnName, row[column.ColumnName]);
                            }
                            statement = statement.Substring(0, statement.Length - 1) + ")";
                            command.CommandText = statement;
                            command.ExecuteNonQuery();
                        }
                    }
                    view.Table.AcceptChanges();
                }
            }
        }

        private void btnExport_Click(object sender, EventArgs e)
        {
            if (cboTables.SelectedItem != null)
            {
                var tableName = cboTables.SelectedItem.ToString();
                var view = (DataView)dtgData.DataSource;
                var table = view.Table;
                var json = ConvertDataTabletoString(table);
                using (var writer = new System.IO.StreamWriter(System.IO.File.Open(System.IO.Path.Combine(txtFolder.Text, "data-" + tableName + ".json"), System.IO.FileMode.Create)))
                {
                    writer.Write(json.Replace("\"[", "[").Replace("]\"", "]"));
                }
            }
        }

        public string ConvertDataTabletoString(DataTable dt)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            var rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    var value = dr[col];
                    if (col.ColumnName.Equals("ItemSequence") ||
                        col.ColumnName.Equals("ComboSequence"))
                        value = "[" + String.Join(", ", value.ToString().Split(';').ToArray()) + "]";

                    row.Add(col.ColumnName, value);
                }
                rows.Add(row);
            }
            return serializer.Serialize(rows);

        }

        private void dtgData_RowEnter(object sender, DataGridViewCellEventArgs e)
        {
        }
    }
}
