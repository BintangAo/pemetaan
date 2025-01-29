import type {PageServerLoad} from "./$types"
import supabase from "$lib/supabase";
import { fail } from "@sveltejs/kit";

type Datas = {
    name: string;
    rank: number;
    first_univ?: string;
    first_prodi?: string;
    second_univ?: string;
    second_prodi?: string;
    class:string;
}[]

export const load: PageServerLoad = async () => {
    const {data,error}  = await supabase.from('users').select("*").order('rank')
    if (error) {
        throw fail(500,{message:error.message})
    }
    if (data.length===0){
        throw fail(404,{message:"Data not found"})
    }
    return {
        users:data as Datas
    }
};