<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
        } else {
            message = "Error al cargar la lista de datos.";
            messageType = "danger";
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Datos de ejemplo cargados con éxito!";
            messageType = "success";
            await getCereals();
        } else {
            message = "Aviso: Los datos ya están cargados.";
            messageType = "danger";
        }
    }

    async function deleteAllCereals() {
        if (confirm("¿Borrar toda la tabla?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) {
                message = "La tabla se ha vaciado correctamente.";
                messageType = "success";
                await getCereals();
            }
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <div class="toolbar">
        <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
        <button onclick={deleteAllCereals} class="btn-del">Borrar todo</button>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    
    <hr />

    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { font-family: sans-serif; padding: 20px; max-width: 1100px; margin: 0 auto; }
    h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; color: #333; }
    
    .toolbar { display: flex; gap: 10px; margin-bottom: 20px; }
    
    .btn-load { background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    
    hr { margin: 25px 0; border: 0; border-top: 1px solid #eee; }
</style>