import nodemailer from 'nodemailer';

function createTransporter() {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASSWORD;

  if (!user || !pass) {
    console.error('ERRO NODEMAILER: Credenciais de email (USER/PASS) não definidas no .env');
    return null;
  }


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });

  return transporter;
}

export async function sendMail(to, subject, htmlBody) {
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Configuração de email incompleta no servidor.');
  }

  try {
    const info = await transporter.sendMail({
      from: `"Hairday" <${process.env.NODEMAILER_USER}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    });

    return info
  } catch (error) {
    console.error("Erro ao enviar email: ", error);
    throw new Error('Falha ao enviar o email.');
  }
}
