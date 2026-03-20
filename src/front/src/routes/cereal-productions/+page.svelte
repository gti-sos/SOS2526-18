<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    // 1. ESTADO GLOBAL (Svelte 5)
    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // Variables para la búsqueda de un recurso concreto
    let searchCountry = $state("");
    let searchYear = $state("");

    // 2. FUNCIONES DE LÓGICA

    // Obtener todos los registros (GET acumulado)
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
            searchCountry = ""; // Limpiamos campos de búsqueda
            searchYear = "";
        } else {
            message = "Lo sentimos, no hemos podido cargar la lista de datos.";
            messageType = "danger";
        }
    }

    // ACCEDER A UN RECURSO CONCRETO (Buscador por País y Año)
    async function getSingleCereal() {
        if (!searchCountry || !searchYear) {
            message = "Por favor, introduce un país y un año para realizar la búsqueda.";
            messageType = "danger";
            return;
        }

        const res = await fetch(`/api/v2/cereal-productions/${searchCountry}/${searchYear}`);
        
        if (res.ok) {
            const data = await res.json();
            cereals = [data]; // Mostramos solo el resultado encontrado
            message = `¡Registro encontrado! Mostrando los datos de ${searchCountry} para el año ${searchYear}.`;
            messageType = "success";
        } else {
            messageType = "danger";
            if (res.status === 404) {
                // MENSAJE REQUERIDO: "No existe un contacto con nombre Pedro" (adaptado)
                message = `No existe ningún registro de producción para el país '${searchCountry}' en el año ${searchYear}.`;
            } else {
                message = "Ha ocurrido un error inesperado al intentar buscar el registro.";
            }
            cereals = []; // Vaciamos la tabla si no hay resultados
        }
    }

    // Cargar datos de ejemplo (POST masivo)
    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Éxito! Se han restaurado los datos de ejemplo correctamente.";
            messageType = "success";
            await getCereals();
        } else {
            message = "Aviso: Los datos ya están cargados o el servidor no responde.";
            messageType = "danger";
        }
    }

    // Borrar todo (DELETE masivo)
    async function deleteAllCereals() {
        if (confirm("¿Estás seguro de que quieres borrar todos los datos de la tabla? Esta acción no se puede deshacer.")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) {
                message = "Se han eliminado todos los registros de la tabla con éxito.";
                messageType = "success";
                await getCereals();
            } else {
                message = "Error: No se ha podido completar la limpieza de la tabla.";
                messageType = "danger";
            }
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <section class="search-box">
        <div class="search-inputs">
            <label>País: <input bind:value={searchCountry} placeholder="Ej: Spain" /></label>
            <label>Año: <input bind:value={searchYear} type="number" placeholder="Ej: 2024" /></label>
        </div>
        <div class="search-buttons">
            <button onclick={getSingleCereal} class="btn-search">Buscar registro específico</button>
            <button onclick={getCereals} class="btn-clear">Ver todos los datos</button>
        </div>
    </section>

    <section class="controls">
        <button onclick={loadInitialData} class="btn-load">
            Restablecer datos de ejemplo
        </button>
        <button onclick={deleteAllCereals} class="btn-delete-all">
            Borrar toda la tabla
        </button>
    </section>

    <hr />

    <CerealForm {getCereals} bind:message bind:messageType />

    <br />

    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { 
        font-family: 'Segoe UI', sans-serif; 
        padding: 40px; 
        max-width: 1250px; 
        margin: 0 auto; 
    }

    h1 { border-bottom: 3px solid #007bff; padding-bottom: 15px; text-align: center; color: #2c3e50; }

    /* Buscador */
    .search-box {
        background: #f8fbff;
        padding: 20px;
        border: 1px solid #cce5ff;
        border-radius: 8px;
        margin-bottom: 25px;
    }
    .search-inputs { display: flex; gap: 20px; margin-bottom: 15px; }
    .search-inputs label { font-weight: bold; display: flex; flex-direction: column; flex: 1; }
    .search-inputs input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-top: 5px; }
    .search-buttons { display: flex; gap: 10px; }
    
    .btn-search { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .btn-clear { background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }

    /* Controles generales */
    .controls { display: flex; gap: 15px; margin-bottom: 25px; }
    .btn-load { background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .btn-delete-all { background: #dc3545; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: bold; }

    hr { margin: 40px 0; border: 0; border-top: 2px solid #eee; }
</style>