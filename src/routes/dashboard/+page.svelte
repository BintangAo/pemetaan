<script lang="ts">
    import * as Card from '$lib/components/ui/card/index'
	import { Separator } from '$lib/components/ui/separator';
    import * as Table from '$lib/components/ui/table/index'
    import { PieChart } from 'layerchart';
	import type { PageProps } from './$types';
    const {data}:PageProps = $props()
    const dataPertama = [
        {
            "nama" : `${data.user.first_prodi ?? "-"} (ranking di atasmu)`,
            "jumlah": data.jumlahRankAtasPertama ?? 0
        },
        {
            "nama" : `${data.user.second_prodi ?? "-"} (ranking di bawahmu)`,
            "jumlah" : data.jumlahRankDiBawahPertama ?? 0
        },
        {
            "nama" : "Prodi lain",
            "jumlah" : data.selainProdiPertama ?? 0
        }
    ]
    const dataKedua = [
        {
            "nama": `${data.user.second_prodi??"-"} (ranking di atasmu)`,
            "jumlah":data.jumlahRankAtasKedua ??0
        }, 
        {
            "nama" :`${data.user.second_prodi??"-"} (ranking di bawahmu)`,
            "jumlah":data.jumlahRankDiBawahKedua??0
        },
        {
            "nama": `Prodi Lain`,
            "jumlah":data.selainProdiKedua??0
        }
    ]
</script>

<Card.Root class="overflow-scroll m-4 sm:m-28">
    <Card.Header>
        <Card.Title class="text-4xl">
            Dashboard
        </Card.Title>
        <Separator/>
    </Card.Header>
    <Card.Content class="flex flex-col min-w-[824px] h-fit">
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
                        <Table.Cell>{data.user.first_univ??"-"}</Table.Cell>
                        <Table.Cell>{data.user.first_prodi??"-"}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>{data.user.second_univ??"-"}</Table.Cell>
                        <Table.Cell>{data.user.second_prodi??"-"}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>
        <div class="flex flex-col mb-8"> 
            <p class="w-full text-2xl font-medium">Persentase Pemilihan</p>
            <div class="h-56 pt-10">
                <p class="text-lg font-medium block text-center">Pilihan Pertama {`(${data.user.first_univ??'-'})`}</p>
                <PieChart legend data={dataPertama} key="nama" value="jumlah" ssr renderContext="svg" debug={false} cRange={["#F93827","#FFD65A","#16C47F",]}    range={[-90, 90]}
            outerRadius={180 / 2}
            innerRadius={-20}
            cornerRadius={10}
            padAngle={0.02}
            props={{ group: { y: 50 } }} />
            </div>      
            <div class="h-56 pt-10">
                <p class="text-lg font-medium block text-center">Pilihan Kedua {`(${data.user.second_univ??'-'})`}</p>
                <PieChart legend data={dataKedua} key="nama" value="jumlah" ssr renderContext="svg" debug={false} cRange={["#F93827","#FFD65A","#16C47F",]}    range={[-90, 90]}
            outerRadius={180 / 2}
            innerRadius={-20}
            cornerRadius={10}
            padAngle={0.02}
            props={{ group: { y: 50 } }} />
            </div>      
        </div>
    </Card.Content>
</Card.Root>