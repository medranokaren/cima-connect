  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    // URL del endpoint de login de tu API
    const loginApiUrl = 'https://cimaconnect-api-prod-gnc5bmc3hjb5gkcd.southcentralus-01.azurewebsites.net/login';

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
        errorMessage.textContent = ''; // Limpia mensajes de error anteriores

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Si el login es exitoso (código 200-299)
                const data = await response.json();
                
                // ¡Guardamos la "llave" en la caja fuerte del navegador!
                localStorage.setItem('accessToken', data.accessToken);
                
                // Redirigimos al usuario al panel de control
                window.location.href = 'dashboard.html';

            } else {
                // Si hay un error (ej. contraseña incorrecta)
                errorMessage.textContent = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
            }

        } catch (error) {
            // Si hay un error de red o el servidor no responde
            console.error('Error de conexión:', error);
            errorMessage.textContent = 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
        }
    });
});
