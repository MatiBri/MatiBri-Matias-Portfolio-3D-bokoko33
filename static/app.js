// app.js (reemplazar completamente)
console.log('[app.js] script cargado');

window.addEventListener('DOMContentLoaded', () => {
  console.log('[app.js] DOM listo');

  const form = document.getElementById('contact-form');
  if (!form) {
    console.error('[app.js] No se encontró el form #contact-form. Verificá index.html');
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('[app.js] submit interceptado');

    const submitButton = this.querySelector('button[type=submit]');
    if (submitButton) submitButton.classList.add('loading');

    const nombre = this.querySelector('[name=nombre]')?.value || '';
    const correo = this.querySelector('[name=correo]')?.value || '';
    const mensaje = this.querySelector('[name=mensaje]')?.value || '';

    console.log('Datos a enviar:', { nombre, correo, mensaje });

    try {
      const res = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, mensaje })
      });

      const data = await res.json();
      console.log('[app.js] respuesta fetch:', res.status, data);

      if (data?.status === 'success') {
        showFlashMessage('Mensaje enviado correctamente', 'success');
        this.reset();
      } else {
        showFlashMessage('Hubo un error al enviar el mensaje', 'danger');
      }
    } catch (err) {
      console.error('[app.js] Error en fetch:', err);
      showFlashMessage('Hubo un error al enviar el mensaje', 'danger');
    } finally {
      if (submitButton) submitButton.classList.remove('loading');
    }
  });
});
