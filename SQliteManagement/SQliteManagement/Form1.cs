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
                    dtgData.DataSource = table.DefaultView;
                    _updating = false;
                }
            }
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            using (var connection = new SQLiteConnection("Data Source=tower.db"))
            {
                connection.Open();
                var view = (DataView)dtgData.DataSource;
                var table = view.Table.GetChanges();
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
}
