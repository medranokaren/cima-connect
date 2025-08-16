 // URL base de tu API
const apiBaseUrl = 'https://cimaconnect-cmd9hpf6abcrqngg.westcentralus-01.azurewebsites.net/api/Invoices';

// --- Crear Factura ---
document.getElementById('createInvoiceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtenemos los valores del formulario
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const totalAmount = document.getElementById('totalAmount').value;

    // Construimos el objeto factura
    const invoice = {
        clientName,
        clientEmail,
        serviceDescription,
        totalAmount: parseFloat(totalAmount),
        isPaid: false
    };

    // Enviamos la factura al API
    try {
        const response = await fetch(apiBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice)
        });

        if (response.ok) {
            document.getElementById('creationMessage').textContent = '¡Factura creada con éxito!';
            document.getElementById('createInvoiceForm').reset();
        } else {
            document.getElementById('creationMessage').textContent = 'Hubo un error al crear la factura.';
        }
    } catch (error) {
        document.getElementById('creationMessage').textContent = 'Hubo un error de conexión con el servidor.';
        console.error(error);
    }
});

// --- Cargar Lista de Facturas ---
document.getElementById('loadInvoicesBtn').addEventListener('click', async function() {
    try {
        const response = await fetch(apiBaseUrl);
        const invoices = await response.json();

        const tbody = document.getElementById('invoicesTableBody');
        tbody.innerHTML = ''; // Limpiar la tabla

        invoices.forEach(inv => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${inv.invoiceId}</td>
                <td>${inv.clientName}</td>
                <td>${inv.clientEmail}</td>
                <td>$${inv.totalAmount}</td>
                <td>
                    <span class="${inv.isPaid ? 'status-paid' : 'status-pending'}">
                        ${inv.isPaid ? 'Pagada' : 'Pendiente'}
                    </span>
                </td>
                <td>
                    ${!inv.isPaid ? `<button class="pay-button" onclick="generarLinkPago(${inv.invoiceId})">Generar link de pago</button>` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        alert('Error al cargar la lista de facturas');
        console.error(error);
    }
});

// --- Generar Link de Pago ---
window.generarLinkPago = async function(invoiceId) {
    try {
        const response = await fetch(`${apiBaseUrl}/${invoiceId}/create-checkout-session`, {
            method: 'POST'
        });
        const result = await response.json();
        if (result.url) {
            window.open(result.url, '_blank');
        } else {
            alert('No se pudo generar el enlace de pago');
        }
    } catch (error) {
        alert('Error al generar el enlace de pago');
        console.error(error);
    }
};
