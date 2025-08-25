 document.addEventListener('DOMContentLoaded', () => {
    // --- PASO 1: VERIFICACIÓN DE SEGURIDAD ---
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // --- URL BASE DE LA API (PARA PRUEBAS LOCALES) ---
    const apiBaseUrl = 'https://cimarconnect-api-prod-gnc5bmc3hjbsgkcd.southcentralus-01.azurewebsites.net'; 

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
                // ¡CORRECCIÓN! Añadimos la ruta completa /api/Invoices
                const response = await fetch(`${apiBaseUrl}/api/Invoices`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(invoice)
                });

                if (response.ok) {
                    document.getElementById('creationMessage').textContent = '¡Factura creada con éxito!';
                    createInvoiceForm.reset();
                    loadInvoices();
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
            // ¡CORRECCIÓN! Añadimos la ruta completa /api/Invoices
            const response = await fetch(`${apiBaseUrl}/api/Invoices`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.href = 'login.html';
                return;
            }

            const invoices = await response.json();
            const tbody = document.getElementById('invoicesTableBody');
            tbody.innerHTML = '';

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
            // ¡CORRECCIÓN! Usamos la ruta correcta del controlador InvoicesController
            const response = await fetch(`${apiBaseUrl}/api/Invoices/${invoiceId}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            if (result.url) {
                window.location.href = result.url;
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

    // --- Botón de Cerrar Sesión ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        });
    }
});
