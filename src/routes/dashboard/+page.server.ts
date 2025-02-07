import type { PageServerLoad } from './$types';
import supabase from '$lib/supabase';

export const load: PageServerLoad = async ({ locals }) => {
	const firstProdi = locals.user.first_prodi;
	const secondProdi = locals.user.second_prodi;
	const firstUniv = locals.user.first_univ;
	const secondUniv = locals.user.second_univ;
	const rank = locals.user.rank;
	if (!firstUniv) {
		return { user: locals.user };
	}
	const firstProdiFormated = firstProdi.split(' (')[0];
	const jumlahProdiPertama = await supabase
		.from('users')
		.select('rank,first_prodi,second_prodi')
		.or(
			`and(first_prodi.ilike.%${firstProdiFormated}%,first_univ.eq.${firstUniv}),and(second_prodi.ilike.%${firstProdiFormated}%,second_univ.eq.${firstUniv})`
		)
		.order('rank');
	const jumlahUnivPertama = await supabase
		.from('users')
		.select('name,first_prodi,first_univ,second_prodi,second_univ')
		.or(`first_univ.eq.${firstUniv},second_univ.eq.${firstUniv}`)
		.not('id', 'eq', locals.user.id);
	const selainProdiPertama = jumlahUnivPertama.data?.filter(
		(e) =>
			(e.first_prodi !== firstProdi && e.first_univ === firstUniv) ||
			(e.second_prodi !== firstProdi && e.second_univ === firstUniv)
	);
	let jumlahSelainProdiPertama = 0;
	selainProdiPertama?.forEach((e) => {
		if (e.first_univ === firstUniv) {
			jumlahSelainProdiPertama += 1;
		}
		if (e.second_univ === firstUniv) {
			jumlahSelainProdiPertama += 1;
		}
	});
	const cleanJumlahProdiPertama = jumlahProdiPertama.data?.filter(
		(e) => e.first_prodi === firstProdi || e.second_prodi === firstProdi
	);
	const rankPertama = cleanJumlahProdiPertama!.findIndex((e) => e.rank === rank) + 1;
	const jumlahRankAtasPertama = rankPertama - 1;
	const jumlahRankDiBawahPertama =
		rankPertama > 0 ? cleanJumlahProdiPertama!.length - rankPertama : 0;

	if (!secondUniv && !secondUniv) {
		return {
			rankPertama,
			jumlahRankAtasPertama,
			jumlahRankDiBawahPertama,
			jumlahSelainProdiPertama,
			user: locals.user
		};
	}
	const secondProdiFormated = secondProdi.split(' (')[0];
	const jumlahProdiKedua = await supabase
		.from('users')
		.select('rank,first_prodi,second_prodi')
		.or(
			`and(first_prodi.ilike.%${secondProdiFormated}%,first_univ.eq.${secondUniv}),and(second_prodi.ilike.%${secondProdiFormated}%,second_univ.eq.${secondUniv})`
		)
		.order('rank');
	const jumlahUnivKedua = await supabase
		.from('users')
		.select('name,first_univ,first_prodi,second_univ,second_prodi')
		.or(`first_univ.eq.${secondUniv},second_univ.eq.${secondUniv}`)
		.not('id', 'eq', locals.user.id);
	const selainProdiKedua = jumlahUnivKedua.data?.filter(
		(e) =>
			(e.first_prodi !== secondProdi && e.first_univ === secondUniv) ||
			(e.second_prodi !== secondProdi && e.second_univ === secondUniv)
	);
	let jumlahSelainProdiKedua = 0;
	selainProdiKedua?.forEach((e) => {
		if (e.first_univ === secondUniv) {
			jumlahSelainProdiKedua += 1;
		}
		if (e.second_univ === secondUniv) {
			jumlahSelainProdiKedua += 1;
		}
	});
	const cleanJumlahProdiKedua = jumlahProdiKedua.data?.filter(
		(e) => e.first_prodi === secondProdi || e.second_prodi === secondProdi
	);	
	const rankKedua = cleanJumlahProdiKedua!.findIndex((e) => e.rank === rank) + 1;
	const jumlahRankAtasKedua = rankKedua - 1;
	const jumlahRankDiBawahKedua = rankKedua > 0 ? cleanJumlahProdiKedua!.length - rankKedua : 0;
	return {
		rankPertama,
		jumlahRankAtasPertama,
		jumlahRankDiBawahPertama,
		rankKedua,
		jumlahRankAtasKedua,
		jumlahRankDiBawahKedua,
		jumlahSelainProdiPertama,
		jumlahSelainProdiKedua,
		user: locals.user
	};
};
