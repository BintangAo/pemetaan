<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Separator } from '$lib/components/ui/separator';
	import * as Table from '$lib/components/ui/table/index';
	import { PieChart } from 'layerchart';
	import type { PageProps } from './$types';
	import { Button } from '$lib/components/ui/button';
	const { data }: PageProps = $props();
	const dataPertama = [
		{
			nama: `${data.user.first_prodi ?? '-'} (ranking di atasmu)`,
			jumlah: data.jumlahRankAtasPertama ?? 0
		},
		{
			nama: `${data.user.first_prodi ?? '-'} (ranking di bawahmu)`,
			jumlah: data.jumlahRankDiBawahPertama ?? 0
		},
		{
			nama: 'Prodi lain',
			jumlah: data.selainProdiPertama ?? 0
		}
	];
	const dataKedua = [
		{
			nama: `${data.user.second_prodi ?? '-'} (ranking di atasmu)`,
			jumlah: data.jumlahRankAtasKedua ?? 0
		},
		{
			nama: `${data.user.second_prodi ?? '-'} (ranking di bawahmu)`,
			jumlah: data.jumlahRankDiBawahKedua ?? 0
		},
		{
			nama: `Prodi lain`,
			jumlah: data.selainProdiKedua ?? 0
		}
	];
</script>

<Card.Root class="m-4 overflow-scroll sm:m-28">
	<Card.Header>
		<Card.Title class="text-4xl">Dashboard
			<Button href="/password">Ganti Password</Button>
		</Card.Title>
		<Separator />
	</Card.Header>
	<Card.Content class="flex h-fit min-w-[824px] flex-col">
		<p class="text-md font-medium">Pilihan Universitas</p>
		<div>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Pilihan ke-</Table.Head>
						<Table.Head>Universitas</Table.Head>
						<Table.Head>Prodi</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>{data.user.first_univ ?? '-'}</Table.Cell>
						<Table.Cell>{data.user.first_prodi ?? '-'}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>2</Table.Cell>
						<Table.Cell>{data.user.second_univ ?? '-'}</Table.Cell>
						<Table.Cell>{data.user.second_prodi ?? '-'}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
			<Button href="/user">Ganti Pilihan</Button>
		</div>
		<div class="mb-8 flex flex-col">
			<p class="w-full text-2xl font-medium">Persentase Pemilihan</p>
			<div class="h-56 pt-10">
				<p class="block text-center text-lg font-medium">
					Pilihan Pertama {`(${data.user.first_univ ?? '-'})`}
				</p>
                {#if !data.user.first_univ}
                <p class="block text-center text-lg font-medium text-muted-foreground">
                    Kamu belum memilih universitas
                </p>
                {:else if  !data.jumlahRankAtasPertama&&!data.jumlahRankDiBawahPertama&&!data.selainProdiPertama}
                <p class="block text-center text-lg font-medium text-muted-foreground">
                    Kamu seorang diri di {data.user.first_univ}
                </p>
                {:else}
                <PieChart
                legend
                data={dataPertama}
                key="nama"
                value="jumlah"
                label={(e:{nama:string}) => {
                    switch (e.nama) {
                        case `${data.user.first_prodi ?? '-'} (ranking di atasmu)`:
                            return `${data.user.first_prodi ?? '-'} (ranking di atasmu) (${data.jumlahRankAtasPertama ?? 0})`;
                        case `${data.user.first_prodi ?? '-'} (ranking di bawahmu)`:
                            return `${data.user.first_prodi ?? '-'} (ranking di bawahmu) (${data.jumlahRankDiBawahPertama ?? 0})`;
                        case 'Prodi lain':
                            return `Prodi lain (${data.selainProdiPertama ?? 0})`;
                    }
                }}
                renderContext="svg"
                debug={false}
                cRange={['#F93827', '#FFD65A', '#16C47F']}
                range={[-90, 90]}
                outerRadius={180 / 2}
                innerRadius={-20}
                cornerRadius={10}
                padAngle={0.02}
                props={{ group: { y: 50 } }}
            />
                {/if}
				
			</div>
			<div class="h-56 pt-10">
				<p class="block text-center text-lg font-medium">
					Pilihan Kedua {`(${data.user.second_univ || '-'})`}
				</p>
                {#if !data.user.second_univ}
                <p class="block text-center text-lg font-medium text-muted-foreground">
                    Kamu belum memilih universitas
                </p>
                {:else if !data.jumlahRankAtasKedua&&!data.jumlahRankDiBawahKedua&&!data.selainProdiKedua}
                <p class="block text-center text-lg font-medium text-muted-foreground">
                    Kamu seorang diri di {data.user.second_univ}
                </p>
                {:else}
                <PieChart
					legend
					data={dataKedua}
					key="nama"
					value="jumlah"
					renderContext="svg"
					debug={false}
                    label={(e:{nama:string}) => {
						switch (e.nama) {
							case `${data.user.second_prodi ?? '-'} (ranking di atasmu)`:
								return `${data.user.second_prodi ?? '-'} (ranking di atasmu) (${data.jumlahRankAtasKedua ?? 0})`;
							case `${data.user.second_prodi ?? '-'} (ranking di bawahmu)`:
								return `${data.user.second_prodi ?? '-'} (ranking di bawahmu) (${data.jumlahRankDiBawahKedua ?? 0})`;
							case 'Prodi lain':
								return `Prodi lain (${data.selainProdiKedua ?? 0})`;
						}
					}}
					cRange={['#F93827', '#FFD65A', '#16C47F']}
					range={[-90, 90]}
					outerRadius={180 / 2}
					innerRadius={-20}
					cornerRadius={10}
					padAngle={0.02}
					props={{ group: { y: 50 } }}
				></PieChart>
                {/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
