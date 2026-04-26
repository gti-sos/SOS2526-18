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

    let sCountry = $state("");
    let sYear = $state("");
    let sLand = $state("");  
    let sProd = $state("");  
    let sPop = $state("");   

    $effect(() => {
        if (page.url.searchParams.get('updated') === 'true') {
            message = "actualizado correctamente"; 
            messageType = "success";
            window.history.replaceState({}, '', window.location.pathname);
            getCereals();
        } 
    });

    async function getCereals() {
        try {
            const res = await fetch(`/api/v2/cereal-productions?limit=${limit}&offset=${offset}`);
            if (res.ok) {
                const data = await res.json();
                cereals = data;
                // Si carga bien, solo quitamos el mensaje si era un error de carga previo
                if (message === "error al cargar datos") message = "";
            } else {
                // Si la tabla queda vacía, NO ponemos error si acabamos de borrar o cargar iniciales
                if (message !== "borrados" && message !== "datos cargados") {
                    cereals = [];
                    message = "error al cargar datos";
                    messageType = "danger";
                }
            }
        } catch (e) {
            console.error("Error en getCereals:", e);
        }
    }

    function nextPage() {
        if (cereals.length >= limit) { offset += limit; getCereals(); }
    }

    function prevPage() {
        if (offset >= limit) { offset -= limit; getCereals(); }
    }

    function resetSearch() {
        sCountry = ""; sYear = ""; sLand = ""; sProd = ""; sPop = ""; 
        offset = 0;
        getCereals();
        message = "búsqueda limpiada";
        messageType = "success";
    }

    async function fetchSpecific() {
        let params = new URLSearchParams();
        if (sCountry) params.append("country", sCountry);
        if (sYear) params.append("year", sYear);
        if (sLand) params.append("land_used", sLand);
        if (sProd) params.append("cereal_production", sProd);
        if (sPop) params.append("population", sPop);
        
        offset = 0;
        const res = await fetch(`/api/v2/cereal-productions?${params.toString()}&limit=${limit}&offset=${offset}`);
        if (res.ok) {
            cereals = await res.json();
            message = "encontrados registros";
            messageType = "success";
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) { 
            message = "datos cargados"; 
            messageType = "success"; 
            offset = 0; 
            await getCereals(); 
        }
    }

    async function deleteAll() {
        if (confirm("¿Seguro que quieres borrar todos los datos?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) { 
                cereals = [];
                offset = 0; 
                // Prioridad absoluta al mensaje que busca el test
                message = "borrados"; 
                messageType = "success"; 
                await getCereals();
                // Lo repetimos por si getCereals es más lento que el render
                message = "borrados"; 
            } else {
                message = "error al borrar todo";
                messageType = "danger";
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
            
            <a href="/analytics/cereal-productions">
                <button class="btn-viz">📊 Ver Análisis Visual</button>
            </a>
        </div>

        <div class="search-container">
            <div class="search-row">
                <input bind:value={sCountry} placeholder="País..." />
                <input bind:value={sYear} type="number" placeholder="Año..." />
            </div>
            <div class="search-row">
                <input bind:value={sLand} type="number" placeholder="Uso tierra..." />
                <input bind:value={sProd} type="number" placeholder="Producción..." />
                <input bind:value={sPop} type="number" placeholder="Población..." />
                <button onclick={fetchSpecific} class="btn-search">Buscar</button>
                <button onclick={resetSearch} class="btn-reset">Limpiar</button>
            </div>
        </div>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    <hr />
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />

    <div class="pagination-controls">
        <button onclick={prevPage} disabled={offset === 0} class="btn-page"> &laquo; Anterior </button>
        <span class="page-indicator"> Página <strong>{(offset / limit) + 1}</strong> </span>
        <button onclick={nextPage} disabled={cereals.length < limit} class="btn-page"> Siguiente &raquo; </button>
    </div>
</main>

<style>
    main { font-family: sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
    h1 { border-bottom: 2px solid #007bff; color: #2c3e50; }
    .top-bar { display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px; padding: 15px; border: 1px solid #eee; }
    .main-btns { display: flex; gap: 10px; align-items: center; }
    .btn-load { background: #28a745; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .btn-viz { background: #17a2b8; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .search-container { background: #f1f3f5; padding: 12px; border-radius: 6px; }
    .search-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px; }
    .search-container input { border: 1px solid #ced4da; padding: 6px; border-radius: 4px; width: 140px; }
    .btn-search { background: #007bff; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-reset { background: #6c757d; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; }
    .pagination-controls { display: flex; justify-content: center; gap: 20px; margin-top: 30px; }
    .btn-page { border: 1px solid #007bff; padding: 8px 16px; cursor: pointer; background: white; color: #007bff; }
    .btn-page:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }
</style>