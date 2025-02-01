import supabase from '$lib/supabase';
import { redirect, error as serverE,type Handle } from '@sveltejs/kit';

type Data = {
    id:number,
    created_at:string,
    last_changed:string,
    name:string,
    password:string,
    rank:number,
    first_univ:string,
    first_prodi:string,
    second_univ:string,
    second_prodi:string,
    class:string,
    nisn:string,
    session_key:string,
};

export const handle: Handle = async ({ event, resolve }) => {
    const restrictedPaths = ['/', '/user','/tabel','/dashboard'];
    const {data,error} = await supabase.from('users').select().eq('session_key',event.cookies.get('sessionKeys'));
    if(error) {
        throw serverE(500)
    }
    event.locals.user = data![0] as Data; 
    if(restrictedPaths.includes(event.url.pathname)) {
        if(!event.locals.user) {
            event.cookies.set('sessionKeys', '', { path: '/', maxAge: 0 });
            throw redirect(303,'/login');
        }
    }
	const respond = await resolve(event);
    return respond
};
