/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserInt } from 'pages/auth/interfaces';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		// hash password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);

		const user: UserInt = req.body;

		const saveUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				identTypeId: user.identTypeId,
				identNum: user.identNum,
			},
		});
		if (saveUser) throw { message: 'Error en guardar el Usuario' };

		console.log('Register ->', req.method, user);

		res.json(saveUser);
		return res.status(200);
	} catch (err) {
		console.log(err);
		return res.status(408).json({ message: 'Error en Api' });
	}
};
