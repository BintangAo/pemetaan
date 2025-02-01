<script lang="ts">
    import type {PageProps} from "./$types"
    import { enhance } from '$app/forms';
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import {univData} from "$lib/data"
	import { cn } from "$lib/utils";
	import { toast } from "svelte-sonner";
    const univArr = univData.map((e)=>e.nama)
    let {data,form}:PageProps = $props() 
    let firstUniv = $state(data.user.first_univ) 
    let firstProdi = $state(data.user.first_prodi)
    let secondUniv = $state(data.user.second_univ)
    let secondProdi = $state(data.user.second_prodi)
    let disable = $state(false)
    let changedValue = $state(false)
    const toggleDisable = ()=>{
        disable=false
    }
    $effect(()=>{
        if(form?.success){
            toast.success('Berhasil menyimpan pilihan!')
        if(form?.error){
            toast.error('Terjadi masalah pada server!')
        } 
    }
    })
    $effect(()=>{
        if(form?.success||form?.error){
            toggleDisable()
        }
    }
    )
    let selectableFirstProdi = $derived(univData.find((e)=>e.nama === firstUniv)?.namaProdi)
    let selectableSecondProdi = $derived(univData.find((e)=>e.nama === secondUniv)?.namaProdi)
</script>

<div class="relative flex h-screen w-full flex-col items-center justify-center gap-4">
	<Card.Root class={cn('w-[350px] shadow-xl')}>
		<Card.Header>
			<Card.Title>
				Halo
				{data.user.name},
			</Card.Title>
			<Card.Description>Pilih jurusan yang kamu impikan.</Card.Description>
			<Card.Content>
				<form
					method="POST"
					class="flex flex-col gap-y-4"
					use:enhance
					onsubmit={() => (disable = !disable)}
				>
					<Select.Root
						type="single"
						bind:value={firstUniv}
						onValueChange={() => {
                            firstProdi = ''
                            changedValue=true
                            }}
						disabled={disable}
					>
						<Label for="firstUniv">Pilih Universitas dan Prodi Pertama</Label>
						<Select.Trigger id="firstUniv" name="firstUniv" class="shadow-md"
							>{firstUniv}</Select.Trigger
						>
						<Select.Content class="">
							{#each univArr as univ}
								<Select.Item value={univ}>{univ}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root
						type="single"
						bind:value={firstProdi}
						disabled={!selectableFirstProdi || disable}
                        onValueChange={()=>changedValue=true}
					>
						<Select.Trigger class="shadow-md" name="firstProdi">{firstProdi}</Select.Trigger>
						<Select.Content class="sm:w-[252px]">
							{#each selectableFirstProdi! as prodi}
								<Select.Item value={prodi}>{prodi}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root
						type="single"
						bind:value={secondUniv}
						onValueChange={() => {
                            changedValue=true
                            secondProdi = ''
                            }}
						disabled={!firstProdi || disable}
					>
						<Label for="secondUniv">Pilih Universitas dan Prodi Kedua</Label>
						<Select.Trigger id="secondUniv" name="secondUniv" class="shadow-md"
							>{secondUniv}</Select.Trigger
						>
						<Select.Content class="">
							{#each univArr as univ}
								<Select.Item value={univ}>{univ}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root
						type="single"
						bind:value={secondProdi}
						disabled={!selectableSecondProdi || disable||!firstProdi}
                        onValueChange={()=>changedValue=true}
					>
						<Select.Trigger class="shadow-md" name="secondProdi">{secondProdi}</Select.Trigger>
						<Select.Content>
							{#each selectableSecondProdi! as prodi}
								<Select.Item value={prodi}>{prodi}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input type="hidden" name="firstUniv" value={firstUniv} />
					<input type="hidden" name="firstProdi" value={firstProdi} />
					<input type="hidden" name="secondUniv" value={secondUniv} />
					<input type="hidden" name="secondProdi" value={secondProdi} />
					<Button type="submit" disabled={disable || !firstProdi || !secondProdi||!changedValue}
						>Submit</Button
					>
				</form>
			</Card.Content>
		</Card.Header>
	</Card.Root>
	<Button variant="outline" class="w-[350px] shadow-xl" href="/tabel">Lihat Tabel</Button>
	<Button variant="outline" class="w-[350px] shadow-xl" href="/dashboard">Lihat Dashboard</Button>
</div>
