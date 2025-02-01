import type {PageServerLoad} from "./$types"
import supabase from "$lib/supabase"

export const load:PageServerLoad = async ({locals})=>{
    const firstProdi = locals.user.first_prodi;
    const secondProdi = locals.user.second_prodi;
    const firstUniv = locals.user.first_univ
    const secondUniv = locals.user.second_univ
    const rank = locals.user.rank
    const firstProdiFormated = firstProdi.split(" (")[0]
    const secondProdiFormated = secondProdi.split(" (")[0]
    const jumlahProdiPertama = await supabase.from('users').select('rank').or(`first_prodi.ilike.%${firstProdiFormated}%,second_prodi.ilike.%${firstProdiFormated}%`).order('rank')
    const jumlahProdiKedua = await supabase.from('users').select('rank').or(`first_prodi.ilike.%${secondProdiFormated}%,second_prodi.ilike.%${secondProdiFormated}%`).order('rank')
    const jumlahUnivPertama = await supabase.from('users').select('first_prodi,second_prodi',).or(`first_univ.eq.${firstUniv},second_univ.eq.${firstUniv}`).not('id','eq',locals.user.id)
    const jumlahUnivKedua = await supabase.from('users').select('first_prodi,second_prodi',).or(`first_univ.eq.${secondUniv},second_univ.eq.${secondUniv}`).not('id','eq',locals.user.id)

    const selainProdiPertama = jumlahUnivPertama.data?.filter((e)=>e.first_prodi!==firstProdi&&e.second_prodi!==firstProdi).length
    const selainProdiKedua = jumlahUnivKedua.data?.filter((e)=>e.first_prodi!==secondProdi&&e.second_prodi!==secondProdi).length

    console.log(jumlahUnivPertama.data!,selainProdiPertama)
    console.log(jumlahUnivKedua.data!,selainProdiKedua)
    const rankPertama = jumlahProdiPertama.data!.findIndex((e)=>e.rank===rank) + 1
    const jumlahRankAtasPertama = rankPertama-1 
    const jumlahRankDiBawahPertama = rankPertama>0?jumlahProdiPertama.data!.length - rankPertama:0
    const rankKedua = jumlahProdiKedua.data!.findIndex((e)=>e.rank===rank) + 1
    const jumlahRankAtasKedua = rankKedua-1
    const jumlahRankDiBawahKedua = rankKedua>0?jumlahProdiKedua.data!.length - rankKedua:0 

        return {
        rankPertama,jumlahRankAtasPertama,jumlahRankDiBawahPertama,rankKedua,jumlahRankAtasKedua,jumlahRankDiBawahKedua,selainProdiPertama,selainProdiKedua,"user":locals.user
    }

}