<script>
    import { onMount } from 'svelte'; 
    import { page } from '$app/state'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // --- VARIABLES DE PAGINACIÓN ---
    let limit = 10;
    let offset = $state(0);

    // Variables de búsqueda
    let sCountry = $state("");
    let sYear = $state("");
    let sFrom = $state(""); 
    let sTo = $state("");   

    // DETECTAR ACTUALIZACIÓN
    $effect(() => {
        if (page.url.searchParams.get('updated') === 'true') {
            message = "¡El registro se ha actualizado correctamente!";
            messageType = "success";
            window.history.replaceState({}, '', window.location.pathname);
            getCereals();
        }
    });

    // Función de carga con PAGINACIÓN
    async function getCereals() {
        // Añadimos limit y offset a la URL
        const res = await fetch(`/api/v2/cereal-productions?limit=${limit}&offset=${offset}`);
        if (res.ok) {
            cereals = await res.json();
            // No reseteamos los campos aquí para que el usuario vea qué buscó, 
            // pero si la tabla viene vacía y el offset > 0, avisamos.
            if (cereals.length === 0 && offset > 0) {
                message = "No hay más registros en esta página.";
                messageType = "warning";
            }
        } else {
            message = "Error al cargar datos.";
            messageType = "danger";
        }
    }

    // Navegación de páginas
    function nextPage() {
        if (cereals.length >= limit) {
            offset += limit;
            getCereals();
        }
    }

    function prevPage() {
        if (offset >= limit) {
            offset -= limit;
            getCereals();
        }
    }

    // Resetear todo
    function resetSearch() {
        sCountry = ""; sYear = ""; sFrom = ""; sTo = "";
        offset = 0;
        getCereals();
        message = "Búsqueda limpiada.";
        messageType = "success";
    }

    // BUSCADOR MEJORADO
    async function fetchSpecific() {
        let params = new URLSearchParams();
        if (sCountry) params.append("country", sCountry);
        if (sYear) params.append("year", sYear);
        if (sFrom) params.append("from", sFrom);
        if (sTo) params.append("to", sTo);
        
        // Al buscar, siempre volvemos a la página 1 (offset 0)
        offset = 0;

        if (sCountry && sYear) {
            const res = await fetch(`/api/v2/cereal-productions/${sCountry}/${sYear}`);
            if (res.ok) {
                const data = await res.json();
                cereals = [data]; 
                message = `Registro encontrado.`;
                messageType = "success";
            } else {
                message = `No existe el registro para ${sCountry} en ${sYear}.`;
                messageType = "danger";
                cereals = [];
            }
        } else {
            const res = await fetch(`/api/v2/cereal-productions?${params.toString()}&limit=${limit}&offset=${offset}`);
            if (res.ok) {
                cereals = await res.json();
                message = cereals.length > 0 ? `Encontrados ${cereals.length} registros.` : "Sin resultados.";
                messageType = cereals.length > 0 ? "success" : "danger";
            }
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "Datos iniciales cargados correctamente.";
            messageType = "success";
            offset = 0;
            await getCereals();
        }
    }

    async function deleteAll() {
        if (confirm("¿Seguro que quieres vaciar toda la tabla?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) { 
                offset = 0; 
                getCereals(); 
                message = "Todos los datos han sido borrados."; 
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
        <div class="main-btns">
            <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
            <button onclick={deleteAll} class="btn-del">Borrar todo</button>
        </div>

        <div class="search-container">
            <input bind:value={sCountry} placeholder="País..." />
            <input bind:value={sYear} type="number" placeholder="Año..." />
            <input bind:value={sFrom} type="number" placeholder="Desde (año)" style="width: 100px;"/>
            <input bind:value={sTo} type="number" placeholder="Hasta (año)" style="width: 100px;"/>
            <button onclick={fetchSpecific} class="btn-search">Buscar</button>
            <button onclick={resetSearch} class="btn-reset">Limpiar</button>
        </div>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    
    <hr />
    
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />

    <div class="pagination-controls">
        <button onclick={prevPage} disabled={offset === 0} class="btn-page">
            &laquo; Anterior
        </button>
        <span class="page-indicator">
            Página <strong>{(offset / limit) + 1}</strong>
        </span>
        <button onclick={nextPage} disabled={cereals.length < limit} class="btn-page">
            Siguiente &raquo;
        </button>
    </div>
</main>

<style>
    main { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        padding: 20px; 
        max-width: 1200px; 
        margin: 0 auto; 
    }
     
    h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; color: #2c3e50; }
    
    .top-bar { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 25px; 
        gap: 15px; 
        align-items: center; 
        background: #fdfdfd; 
        padding: 10px; 
        border-radius: 8px;
        flex-wrap: wrap;
    }

    .main-btns { display: flex; gap: 10px; }
    
    .search-container { 
        display: flex; 
        gap: 8px; 
        background: #f1f3f5; 
        padding: 8px; 
        border-radius: 6px; 
        border: 1px solid #dee2e6;
        flex-wrap: wrap;
    }
    
    .search-container input { 
        border: 1px solid #ced4da; 
        padding: 6px; 
        border-radius: 4px; 
        width: 130px; 
    }
    
    .btn-load { background: #28a745; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-search { background: #007bff; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-reset { background: #6c757d; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; }
    
    .btn-load:hover { background: #218838; }
    .btn-del:hover { background: #c82333; }
    
    hr { margin: 30px 0; border: 0; border-top: 1px solid #eee; }

    /* ESTILOS NUEVOS DE PAGINACIÓN */
    .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 30px;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 10px;
        border: 1px solid #e9ecef;
    }

    .btn-page {
        background-color: #ffffff;
        color: #007bff;
        border: 1px solid #007bff;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: 0.3s;
    }

    .btn-page:hover:not(:disabled) {
        background-color: #007bff;
        color: white;
    }

    .btn-page:disabled {
        color: #adb5bd;
        border-color: #dee2e6;
        cursor: not-allowed;
    }

    .page-indicator {
        font-size: 1.1rem;
        color: #495057;
    }
</style>