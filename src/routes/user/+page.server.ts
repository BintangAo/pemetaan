import supabase from "$lib/supabase";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad,Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    }
}
export const actions = {
    default:async ({request,locals}) => {
        const form = await request.formData();
        const first_univ = form.get('firstUniv');
        const first_prodi = form.get('firstProdi');
        const second_univ = form.get('secondUniv');
        const second_prodi = form.get('secondProdi');
        const {error} = await supabase.from('users').update({first_univ,first_prodi,second_univ,second_prodi}).eq('id',locals.user.id).returns()
        if(error){
            return fail(500,{error:true})
        }
        return {success:true}
    }
} satisfies Actions;