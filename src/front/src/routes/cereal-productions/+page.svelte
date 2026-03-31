<script>
    import { onMount } from 'svelte'; 
    import { page } from '$app/state'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // Variables de búsqueda ampliadas (Apartado 6)
    let sCountry = $state("");
    let sYear = $state("");
    let sFrom = $state(""); // Año inicio
    let sTo = $state("");   // Año fin

    // DETECTAR ACTUALIZACIÓN (Apartado 5)
    $effect(() => {
        if (page.url.searchParams.get('updated') === 'true') {
            message = "¡El registro se ha actualizado correctamente!";
            messageType = "success";
            window.history.replaceState({}, '', window.location.pathname);
            getCereals();
        }
    });

    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
            // Limpiamos todos los campos al resetear
            sCountry = ""; sYear = ""; sFrom = ""; sTo = "";
        } else {
            message = "Error al cargar datos.";
            messageType = "danger";
        }
    }

    // BUSCADOR MEJORADO (Apartado 6: Soporta rangos y filtros múltiples)
    async function fetchSpecific() {
        // Usamos URLSearchParams para manejar los filtros limpiamente
        let params = new URLSearchParams();
        if (sCountry) params.append("country", sCountry);
        if (sYear) params.append("year", sYear);
        if (sFrom) params.append("from", sFrom);
        if (sTo) params.append("to", sTo);

        // Si es una búsqueda de recurso único (país + año exacto)
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
        } 
        // Búsqueda por filtros generales y RANGOS
        else {
            const res = await fetch(`/api/v2/cereal-productions?${params.toString()}`);
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
            message = "Datos iniciales cargados.";
            messageType = "success";
            await getCereals();
        }
    }

    async function deleteAll() {
        if (confirm("¿Vaciar tabla?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) { getCereals(); message = "Datos borrados."; messageType = "success"; }
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
            <input bind:value={sYear} type="number" placeholder="Año exacto..." />
            <input bind:value={sFrom} type="number" placeholder="Desde (año)..." style="width: 100px;"/>
            <input bind:value={sTo} type="number" placeholder="Hasta (año)..." style="width: 100px;"/>
            <button onclick={fetchSpecific} class="btn-search">Buscar</button>
            <button onclick={getCereals} class="btn-reset">Limpiar</button>
        </div>
    </div>

    <CerealForm {getCereals} bind:message bind:messageType />
    <hr />
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
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
        flex-wrap: wrap; /* Para que no se rompa en móviles */
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
</style>