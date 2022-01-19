import useAxios from '@/config';
import { User } from '@/stores/authContext';
import { AxiosResponse } from 'axios';

import Router from 'next/router';

export const reporte = {
	getTerminals,
};

async function getTerminals(user: User) {
	try {
		const res = await useAxios.get(`/api/reportes/terminales/${user.numAfiliado}`);
		console.log('repote', res.data);
		return [];
	} catch (err: any) {
		console.log(err.response);
		const data = err.response?.data;

		//Valid Token invalido
		if (err.response.status === 401) {
			Router.push('/auth/login');
		}

		const resError = {
			type: 'Error',
			message: data.message || 'Error: Api',
			code: data.code || err.response.status || '400',
		};
		console.log(resError);
		return resError;
	}
}
