import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../../prisma/client';

export async function register(email: string, password: string) {
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    throw new Error('User already exists');
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },

    process.env.JWT_SECRET!,

    {
      expiresIn: '1d',
    }
  );

  return {
    token,
  };
}
