<script lang="ts">
	import { toast } from 'svelte-sonner';
    import type {ActionData} from './$types'
	import { goto } from '$app/navigation';
    import * as Card from '$lib/components/ui/card'
    import {Input} from '$lib/components/ui/input'
    import {Label} from '$lib/components/ui/label'
    import {Button} from '$lib/components/ui/button'
    import { enhance } from '$app/forms';
    const {form}:{form:ActionData} = $props()
$effect(()=>{
    if(form?.success){
        toast.success('Kamu berhasil mengganti password-mu. Mengalihkan ke halaman dashboard')
        setTimeout(()=>{
            goto('/dashboard')
        },3000)
    }
    if(form?.invalidPass){
        toast.error('Passowrd-mu salah dan tidak sesuai!')
    }
    if(form?.serverErr){
        toast.error('Terjadi error di dalam server!')
    }
})
</script>
<div class="flex flex-col items-center justify-center w-screen h-screen ">
    <Card.Root>
        <Card.Header>
            <Card.Title>Ubah Password</Card.Title>
            <Card.Description>Masukkan password lama dan baru</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" class="space-y-4 flex flex-col" use:enhance>
                <Label for="oldPass">Password lama</Label>
                <Input type="password" name="oldPass" id="oldPass" placeholder="Masukan password lama"/>
                <Label for="newPass">Password baru</Label>
                <Input type="password" name="newPass" id="newPass" placeholder="Masukan password baru"/>
                <Button class="ml-auto w-16" type="submit">Login</Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>