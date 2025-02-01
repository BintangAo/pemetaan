<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { PageProps } from './$types';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let { data }: PageProps = $props();
</script>

<Button class={cn('m-12 mb-0')} href="/user">Kembali ke Halaman Pengguna</Button>
<Card.Root class={cn('m-12')}>
	<Card.Header>
		<Card.Title>Tabel Universitas Pilihan</Card.Title>
		<Card.Description>Berikut adalah tabel pemetaan pilihan universitas seluruh peserta</Card.Description>
	</Card.Header>
	<Card.Content class="min-w-full">
		<Table.Root class="min-w-full">
			<Table.Header>
				<Table.Row>
					<Table.Head class="c w-[16px]">No</Table.Head>
					<!-- <Table.Head class="text-center">Kelas</Table.Head>
					<Table.Head class="min-w-52 text-center">Nama</Table.Head> -->
					<Table.Head class="min-w-52 text-center">Universitas</Table.Head>
					<Table.Head class="min-w-52 text-center">Jumlah</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each Object.entries(data.countUniv) as [univ,jumlah],i}
					<Table.Row>
						<Table.Cell class="text-center">{i+1}</Table.Cell>
						<Table.Cell class="text-center">{univ}</Table.Cell>
						<Table.Cell class="text-center">{jumlah}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
<!-- <div class="flex flex-col items-center justify-center gap-4 w-screen p-16">
    
</div> -->
