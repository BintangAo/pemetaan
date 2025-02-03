import type { Actions,PageServerLoad } from './$types';
import supabase from '$lib/supabase';
import crypto from 'node:crypto'
import { fail, redirect } from '@sveltejs/kit';
import 'dotenv/config'
export const load:PageServerLoad = async ({cookies})=>{
	const {data,error} = await supabase.from('users').select().eq('session_key',cookies.get('sessionKeys'))
	if (error){
		throw fail(500,{message:error.message})
	}
	if(data?.length !== 0 ){
		throw redirect(308,'/user')
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		const fData = await request.formData();
		const password = fData.get('password');
		const nisn = fData.get('nisn');
		const { data, error } = await supabase.from('users').select().eq('nisn', nisn);
		if (error) {
			return fail(500, { error:true });
		}
		if (data?.length===0) {
			return fail(400, { incorrect: true });
		}  
		if (data![0].password !== password){
			return fail(400, { incorrect: true });
		}
		
		if(!data![0].session_key){
			const key = crypto.createHash('sha256').update(data![0].name).digest('hex')
			const {error} = await supabase.from('users').update({session_key:key}).eq('id',data![0].id)
			if(error){
				return fail(500,{error:true})
			}
			cookies.set('sessionKeys', key, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite : 'strict',
				httpOnly: true,
				secure: process.env.IS_PRODUCTION === "false" ? false : true
			});
			return { success: true };
		}
		cookies.set('sessionKeys', data![0].session_key, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite : 'strict',
			httpOnly: true,
			secure: process.env.NODE_ENV === "production" ? true : false
		});
		return { success: true };
	}
} satisfies Actions;
