import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import 'dotenv/config';
import * as nodemailer from 'nodemailer';
import { User } from '../Entities/user.entity';
import { AppError } from '../Errors/error';
import AppDataSource from '../data-source';
const recoverPasswordService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailAccount = await nodemailer.createTestAccount();
  const user = await userRepository.findOneBy({
    email: email,
  });
  if (!user) {
    throw new AppError('Email invalid', 400);
  }
  const newPassword = crypto.randomBytes(6).toString('hex');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT),
    auth: {
      user: process.env.SMTPUSER,
      pass: process.env.SMTPPASSWORD,
    },
  });
  transporter
    .sendMail({
      from: process.env.SMTPUSER,
      to: user.email,
      replyTo: user.email,
      subject: 'Recuperação de senha',
      text: `Use essa senha para acessar a plataforma: ${newPassword}`,
    })
    .then(async () => {
      const passwordHash = await bcryptjs.hash(newPassword, 8);
      userRepository.update(user.id, { password: passwordHash });
    });
  return 'Email enviado';
};
export default recoverPasswordService;
