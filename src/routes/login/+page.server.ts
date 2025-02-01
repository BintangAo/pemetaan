import type { Actions,PageServerLoad } from './$types';
import supabase from '$lib/supabase';
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
		cookies.set('sessionKeys', data![0].session_key, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite : 'strict',
				httpOnly: true,
				secure: process.env.IS_PRODUCTION === "false" ? false : true
			});
			return { success: true };
	}
} satisfies Actions;
