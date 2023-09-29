using System.Text;
using vistas_proyecto_react.Models;

public class PDFGenerator
{
    public string GenerateClientesPDF(List<Cliente> clientes)
    {
        var htmlContent = new StringBuilder();

        htmlContent.Append("<html><body>");
        htmlContent.Append("<h1>Listado de Clientes</h1>");
        htmlContent.Append("<table border='1'><thead><tr><th>Documento</th><th>Nombre</th><th>Apellido</th><th>Celular</th></tr></thead><tbody>");

        foreach (var cliente in clientes)
        {
            htmlContent.AppendFormat("<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td></tr>", cliente.Documento, cliente.Nombre, cliente.Apellido, cliente.Celular);
        }

        htmlContent.Append("</tbody></table></body></html>");

        return htmlContent.ToString();
    }
}
