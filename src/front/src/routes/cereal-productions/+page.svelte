<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    // ESTADO GLOBAL (Svelte 5)
    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // Variables para los campos de búsqueda
    let sCountry = $state("");
    let sYear = $state("");

    // 1. OBTENER TODO (GET general)
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
            // Limpiamos la búsqueda al resetear la tabla
            sCountry = ""; 
            sYear = "";
        } else {
            message = "No se ha podido cargar la lista de datos desde el servidor.";
            messageType = "danger";
        }
    }

    // 2. BUSCADOR INTELIGENTE (Acceso concreto + Filtrado)
    async function fetchSpecific() {
        // CASO A: RECURSO CONCRETO (País + Año) -> Requisito del examen (404)
        if (sCountry && sYear) {
            const res = await fetch(`/api/v2/cereal-productions/${sCountry}/${sYear}`);
            if (res.ok) {
                const data = await res.json();
                cereals = [data]; 
                message = `Se ha localizado el registro de '${sCountry}' para el año ${sYear}.`;
                messageType = "success";
            } else if (res.status === 404) {
                // Mensaje tipo "Pedro" (Comprensible y no técnico)
                message = `No existe ningún registro de producción para el país '${sCountry}' en el año ${sYear}.`;
                messageType = "danger";
                cereals = [];
            }
        } 
        // CASO B: FILTRADO (Solo uno de los dos) -> Lo que tú querías
        else if (sCountry || sYear) {
            let query = "";
            if (sCountry) query += `country=${sCountry}&`;
            if (sYear) query += `year=${sYear}`;

            const res = await fetch(`/api/v2/cereal-productions?${query}`);
            if (res.ok) {
                cereals = await res.json();
                if (cereals.length > 0) {
                    message = `Búsqueda finalizada: se han encontrado ${cereals.length} registros.`;
                    messageType = "success";
                } else {
                    message = `No se han encontrado resultados para esa búsqueda.`;
                    messageType = "danger";
                }
            }
        } 
        // CASO C: VACÍO -> Cargar todo
        else {
            await getCereals();
        }
    }

    // 3. CARGAR DATOS INICIALES
    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Éxito! Los datos de ejemplo se han cargado correctamente.";
            messageType = "success";
            await getCereals();
        } else {
            message = "Aviso: Los datos ya están presentes o el servidor no responde.";
            messageType = "danger";
        }
    }

    // 4. BORRAR TODO
    async function deleteAll() {
        if (confirm("¿Estás seguro de que quieres vaciar toda la tabla?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) {
                message = "La tabla se ha vaciado por completo.";
                messageType = "success";
                await getCereals();
            } else {
                message = "Error: No se ha podido realizar la limpieza de datos.";
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
        </div>

        <div class="search-container">
            <input bind:value={sCountry} placeholder="País..." />
            <input bind:value={sYear} type="number" placeholder="Año..." />
            <button onclick={fetchSpecific} class="btn-search">🔍 Buscar</button>
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
    
    /* Diseño de la barra superior */
    .top-bar { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 25px;
        gap: 15px;
        align-items: center;
        background: #fdfdfd;
        padding: 10px;
        border-radius: 8px;
    }

    .main-btns { display: flex; gap: 10px; }
    
    .search-container { 
        display: flex; 
        gap: 8px; 
        background: #f1f3f5; 
        padding: 8px; 
        border-radius: 6px; 
        border: 1px solid #dee2e6;
    }
    
    .search-container input { border: 1px solid #ced4da; padding: 6px; border-radius: 4px; width: 130px; }
    
    /* Estilos de botones */
    .btn-load { background: #28a745; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-del { background: #dc3545; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-search { background: #007bff; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-reset { background: #6c757d; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; }
    
    .btn-load:hover { background: #218838; }
    .btn-del:hover { background: #c82333; }
    
    hr { margin: 30px 0; border: 0; border-top: 1px solid #eee; }
</style>