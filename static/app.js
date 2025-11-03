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

    // dentro de tu handler submit (reemplaza la parte after fetch)
    try {
      const res = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, mensaje })
      });

      const data = await res.json();
      console.log('[app.js] respuesta fetch:', res.status, data);

      const successEl = document.getElementById('contact-success');

      if (data?.status === 'success') {
        // Mensaje visual (toast global si lo tenés)
        if (typeof showFlashMessage === 'function') {
          showFlashMessage('Mensaje enviado correctamente', 'success');
        }

        // Mostrar el mensaje justo debajo del botón
        if (successEl) {
          successEl.removeAttribute('hidden');   // muestra
          // Opcional: forzamos lectura por lectores de pantalla
          successEl.setAttribute('aria-hidden', 'false');

          // Ocultar automáticamente tras 6 segundos
          setTimeout(() => {
            successEl.setAttribute('hidden', ''); // oculta otra vez
            successEl.setAttribute('aria-hidden', 'true');
          }, 6000);
        }

        this.reset();
      } else {
        if (typeof showFlashMessage === 'function') {
          showFlashMessage('Hubo un error al enviar el mensaje', 'danger');
        }
        // Asegurar que no queda el mensaje de éxito visible
        if (successEl) {
          successEl.setAttribute('hidden', '');
          successEl.setAttribute('aria-hidden', 'true');
        }
      }
    } catch (err) {
      console.error('[app.js] Error en fetch:', err);
      if (typeof showFlashMessage === 'function') {
        showFlashMessage('Hubo un error al enviar el mensaje', 'danger');
      }
      const successEl = document.getElementById('contact-success');
      if (successEl) {
        successEl.setAttribute('hidden', '');
        successEl.setAttribute('aria-hidden', 'true');
      }
    } finally {
      if (submitButton) submitButton.classList.remove('loading');
    }
  });
});
