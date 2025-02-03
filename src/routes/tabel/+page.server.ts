import type {PageServerLoad} from "./$types"
import supabase from "$lib/supabase";
import { error as err } from "@sveltejs/kit";

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
    const {data,error}  = await supabase.from('users').select("first_univ,second_univ")
    if (error) {
        throw err(500,{message:error.message})
    }
    if (data.length===0){
        throw err(404,{message:"Data not found"})
    }
    const respondCount = data.filter((e)=>e.first_univ).length
    const countUniv:{[key:string]:number} = {}
    data.forEach((e)=>{
        if(e.first_univ){
            const first_univ = e.first_univ  as string
            countUniv[first_univ] = (countUniv[first_univ]||0)+1
        } 
        if(e.second_univ){
            const second_univ =e.second_univ as string
            countUniv[second_univ] = (countUniv[second_univ]||0)+1
        }
    })
    return {
        countUniv,
        respondCount,
        users:data as Datas
    }
};