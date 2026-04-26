<script>
    import { onMount } from 'svelte'; 
    import { page } from '$app/state'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    let limit = 10;
    let offset = $state(0);

    // Control de mensajes por URL (Para el Test 3 de edición)
    $effect(() => {
        if (page.url.searchParams.get('updated') === 'true') {
            message = "actualizado correctamente"; // <--- Texto exacto que busca el Test 3
            messageType = "success";
            // Limpiamos la URL para que no salga el mensaje siempre
            window.history.replaceState({}, '', window.location.pathname);
            getCereals();
        }
    });

    async function getCereals() {
        const res = await fetch(`/api/v2/cereal-productions?limit=${limit}&offset=${offset}`);
        if (res.ok) { cereals = await res.json(); }
    }

    async function deleteAll() {
        if (confirm("¿Seguro?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) { 
                offset = 0; 
                getCereals(); 
                message = "borrados"; // <--- Texto exacto que busca el Test 6
                messageType = "success"; 
            }
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) { message = "datos cargados"; messageType = "success"; getCereals(); }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <div class="top-bar">
        <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
        <button onclick={deleteAll} class="btn-del">Borrar todo</button>
        <a href="/analytics/cereal-productions"><button class="btn-viz">📊 Gráfica</button></a>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    <hr />
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { padding: 20px; max-width: 1200px; margin: 0 auto; font-family: sans-serif; }
    .top-bar { margin-bottom: 20px; display: flex; gap: 10px; }
    .btn-load { background: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
</style>