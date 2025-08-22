 document.addEventListener('DOMContentLoaded', () => {
    // --- PASO 1: VERIFICACIÓN DE SEGURIDAD ---
    const token = localStorage.getItem('accessToken');
    if (!token) {
        // Si no hay "llave" (token), no te dejamos entrar. Te enviamos a la página de login.
        window.location.href = 'login.html';
        return; // Detenemos la ejecución del resto del script
    }

    // --- Si llegamos aquí, es porque SÍ hay un token ---

    // URL base de tu API (asegúrate que sea la de Azure)
    const apiBaseUrl = 'https://cimaconnect-api-prod-gnc5bmc3hjb5gkcd.southcentralus-01.azurewebsites.net/api/Invoices';

    // --- Crear Factura ---
    const createInvoiceForm = document.getElementById('createInvoiceForm');
    if (createInvoiceForm) {
        createInvoiceForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const clientName = document.getElementById('clientName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            const serviceDescription = document.getElementById('serviceDescription').value;
            const totalAmount = document.getElementById('totalAmount').value;

            const invoice = { clientName, clientEmail, serviceDescription, totalAmount: parseFloat(totalAmount), isPaid: false };

            try {
                const response = await fetch(apiBaseUrl, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // <--- Usamos la "llave"
                    },
                    body: JSON.stringify(invoice)
                });

                if (response.ok) {
                    document.getElementById('creationMessage').textContent = '¡Factura creada con éxito!';
                    createInvoiceForm.reset();
                    loadInvoices(); // Refrescar la tabla
                } else {
                    document.getElementById('creationMessage').textContent = 'Hubo un error al crear la factura.';
                }
            } catch (error) {
                document.getElementById('creationMessage').textContent = 'Hubo un error de conexión con el servidor.';
                console.error(error);
            }
        });
    }

    // --- Cargar Lista de Facturas ---
    async function loadInvoices() {
        try {
            const response = await fetch(apiBaseUrl, {
                headers: {
                    'Authorization': `Bearer ${token}` // <--- Usamos la "llave"
                }
            });

            if(response.status === 401) {
                // Si la llave expiró o es inválida, borramos la llave vieja y enviamos al login
                localStorage.removeItem('accessToken');
                window.location.href = 'login.html';
                return;
            }

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
    }

    // --- Generar Link de Pago ---
    window.generarLinkPago = async function(invoiceId) {
        try {
            const response = await fetch(`${apiBaseUrl}/${invoiceId}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // <--- Usamos la "llave"
                }
            });
            const result = await response.json();
            if (result.url) {
                window.location.href = result.url; // Redirección directa para compatibilidad móvil
            } else {
                alert('No se pudo generar el enlace de pago');
            }
        } catch (error) {
            alert('Error al generar el enlace de pago');
            console.error(error);
        }
    };

    // --- Cargar la lista de facturas al abrir la página ---
    const loadBtn = document.getElementById('loadInvoicesBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', loadInvoices);
    }
    loadInvoices();
});
