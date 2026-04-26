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

    // Para el test de edición (actualizado correctamente)
    $effect(() => {
        if (page.url.searchParams.get('updated') === 'true') {
            message = "actualizado correctamente";
            messageType = "success";
            window.history.replaceState({}, '', window.location.pathname);
            getCereals();
        }
    });

    async function getCereals() {
        const res = await fetch(`/api/v2/cereal-productions?limit=${limit}&offset=${offset}`);
        if (res.ok) { cereals = await res.json(); }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) { 
            message = "datos cargados"; 
            messageType = "success"; 
            await getCereals(); 
        }
    }

    async function deleteAll() {
        if (confirm("¿Seguro?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) { 
                await getCereals(); 
                // AQUÍ: "borrados" en minúscula y punto
                message = "borrados"; 
                messageType = "success"; 
            }
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <div class="top-bar">
        <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
        <button onclick={deleteAll} class="btn-del">Borrar todo</button>
        <a href="/analytics/cereal-productions">
            <button class="btn-viz">📊 Ver Gráfica</button>
        </a>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    <hr />
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { font-family: sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
    h1 { border-bottom: 2px solid #007bff; color: #2c3e50; }
    .top-bar { display: flex; gap: 10px; margin-bottom: 20px; }
    .btn-load { background: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
    .btn-viz { background: #17a2b8; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
</style>