<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // Variables discretas para el acceso concreto
    let sCountry = $state("");
    let sYear = $state("");

    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
        }
    }

    // ACCESO AL RECURSO CONCRETO (El punto del examen)
    async function fetchSpecific() {
        if (!sCountry || !sYear) return;
        
        const res = await fetch(`/api/v2/cereal-productions/${sCountry}/${sYear}`);
        if (res.ok) {
            const data = await res.json();
            cereals = [data]; // Mostramos solo ese
            message = `Mostrando datos de ${sCountry} (${sYear}).`;
            messageType = "success";
        } else {
            messageType = "danger";
            if (res.status === 404) {
                // Mensaje exacto tipo "Pedro"
                message = `No existe ningún registro para el país '${sCountry}' en el año ${sYear}.`;
            } else {
                message = "Error al intentar acceder al dato.";
            }
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Datos cargados con éxito!";
            messageType = "success";
            await getCereals();
        }
    }

    async function deleteAll() {
        if (confirm("¿Borrar todo?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) {
                message = "Tabla vaciada.";
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

    <div class="top-bar">
        <div class="main-btns">
            <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
            <button onclick={deleteAll} class="btn-del">Borrar todo</button>
        </div>

        <div class="search-mini">
            <input bind:value={sCountry} placeholder="País..." />
            <input bind:value={sYear} type="number" placeholder="Año..." />
            <button onclick={fetchSpecific} class="btn-search">🔍 Buscar</button>
            <button onclick={getCereals} class="btn-reset">✖</button>
        </div>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    
    <hr />

    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { font-family: sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
    h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; color: #333; }
    
    .top-bar { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 10px;
    }

    .main-btns { display: flex; gap: 8px; }
    
    .search-mini { 
        display: flex; 
        gap: 5px; 
        background: #f8f9fa; 
        padding: 5px; 
        border-radius: 6px; 
        border: 1px solid #ddd;
    }
    .search-mini input { border: 1px solid #ccc; padding: 5px; border-radius: 3px; width: 100px; }
    
    .btn-load { background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-search { background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; }
    .btn-reset { background: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; }
    
    hr { margin: 25px 0; border: 0; border-top: 1px solid #eee; }
</style>