<script>
    // En Svelte 5 ya no se usa "export let", se usa $props()
    let { message = $bindable(""), type = $bindable("danger") } = $props();
</script>

{#if message}
    <div class="alert {type}">
        <strong>{type === 'success' ? 'Éxito:' : 'Aviso:'}</strong> {message}
        <button onclick={() => message = ""}>X</button>
    </div>
{/if}

<style>
    .alert { padding: 15px; margin: 10px 0; border-radius: 4px; position: relative; }
    .danger { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    button { position: absolute; right: 10px; top: 10px; background: none; border: none; cursor: pointer; font-weight: bold; }
</style>