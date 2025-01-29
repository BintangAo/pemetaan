<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
    import {Input} from '$lib/components/ui/input/index.js'
    import {Label} from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
    import type {ActionData} from './$types'
    let {form} :{form:ActionData} = $props()
    let disable = $state(false)
    $effect(()=>{
        if(form?.success){
            toast.success('Berhasil masuk, mengalihkan ke halaman user!')
            setTimeout(()=>{
                goto('/user')
            },1000)
        }
        if(form?.incorrect){
            toast.error('Password atau NISN salah, ayo coba lagi!')
        }
        if(form?.error){
            toast.error('Terjadi masalah pada server!')
        }
    })
    $effect(()=>{
        if(form?.incorrect){
            disable = !disable
        }
        if(form?.error){
            disable = !disable
        }
    })
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen ">
    <Card.Root>
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>Masukkan password untuk melanjutkan</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" class="space-y-4 flex flex-col" use:enhance>
                <Label for="nisn">NISN</Label>
                <Input type="nisn" name="nisn" id="nisn" placeholder="Masukan NISN"/>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Masukan Password"/>
                <Button class="ml-auto w-16" type="submit" disabled={disable} onclick={()=>disable=!disable}>Login</Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>
