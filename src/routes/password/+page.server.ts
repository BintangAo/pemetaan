import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import supabase from '$lib/supabase';

export const actions={
    default :async ({request,locals})=>{
        const fData = await request.formData()
        const oldPassword = fData.get('oldPass')
        const newPassword = fData.get('newPass')
        if(oldPassword!==locals.user.password){
            return fail(400,{invalidPass:true})
        } 
        const {error} = await supabase.from('users').update({password:newPassword}).eq('id',locals.user.id)
        if(error){
            console.log(error)
            return fail(500,{serverErr:true})
        }
        return {success:true}

    }
} satisfies Actions
