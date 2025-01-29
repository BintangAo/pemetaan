// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user :{
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
				session_key:string
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
