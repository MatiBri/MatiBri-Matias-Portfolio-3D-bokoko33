// api/send_email.js
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { nombre, correo, mensaje } = req.body || {};

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ status: 'error', message: 'Faltan datos' });
    }

    const mail = {
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM || process.env.MAIL_TO,
      reply_to: { email: correo, name: nombre },
      subject: `Contacto desde portfolio: ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje:\n${mensaje}`,
      html: `<p><strong>Nombre:</strong> ${nombre}</p>
             <p><strong>Correo:</strong> ${correo}</p>
             <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g,'<br/>')}</p>`
    };

    await sendgrid.send(mail);

    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error('send_email error:', err);
    return res.status(500).json({ status: 'error', message: 'Error enviando email' });
  }
}
