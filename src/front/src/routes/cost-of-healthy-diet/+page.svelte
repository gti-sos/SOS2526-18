<script>
    import { onMount } from 'svelte';
    import Message from './Message.svelte';
    import DietForm from './DietForm.svelte';
    import DietTable from './DietTable.svelte';

    let diets = $state([]);
    let message = $state("");
    let messageType = $state("danger");

    let sCountry = $state("");
    let sYear = $state("");
    let sFrom = $state('');
    let sTo = $state('');

    async function getDiets() {
        const res = await fetch("/api/v1/cost-of-healthy-diet-by-countries");
        if (res.ok) {
            diets = await res.json();
            sCountry = "";
            sYear = "";
        } else {
            message = "No se han podido cargar los datos. Inténtalo de nuevo más tarde.";
            messageType = "danger";
        }
    }

    async function fetchSpecific() {
        if (!sCountry && !sYear) {
            await getDiets();
            return;
        }

        // Búsqueda exacta por país Y año
        if (sCountry && sYear) {
            const res = await fetch(`/api/v1/cost-of-healthy-diet-by-countries/${sCountry}/${sYear}`);
            if (res.ok) {
                diets = [await res.json()];
                message = `Se ha encontrado el registro de '${sCountry}' para el año ${sYear}.`;
                messageType = "success";
            } else if (res.status === 404) {
                message = `No existe ningún registro para el país '${sCountry}' en el año ${sYear}.`;
                messageType = "danger";
                diets = [];
            } else {
                message = "Ha ocurrido un problema al realizar la búsqueda. Inténtalo de nuevo.";
                messageType = "danger";
            }
            return;
        }

        // Filtrado por uno solo
        let query = "";
        if (sCountry) query += `country=${encodeURIComponent(sCountry)}&`;
        if (sYear)    query += `year=${sYear}`;

        const res = await fetch(`/api/v1/cost-of-healthy-diet-by-countries?${query}`);
        if (res.ok) {
            diets = await res.json();
            message = diets.length > 0
                ? `Se han encontrado ${diets.length} registro${diets.length !== 1 ? 's' : ''}.`
                : "No se han encontrado registros con esos criterios de búsqueda.";
            messageType = diets.length > 0 ? "success" : "danger";
        } else {
            message = "Ha ocurrido un problema al filtrar los datos. Inténtalo de nuevo.";
            messageType = "danger";
        }
    }

    async function loadInitialData() {
        const res = await fetch("/api/v1/cost-of-healthy-diet-by-countries/loadInitialData");
        if (res.ok) {
            message = "Los datos de ejemplo se han cargado correctamente.";
            messageType = "success";
            await getDiets();
        } else if (res.status === 409 || res.status === 400) {
            message = "Los datos de ejemplo ya estaban cargados anteriormente.";
            messageType = "danger";
        } else {
            message = "No se han podido cargar los datos de ejemplo. Inténtalo más tarde.";
            messageType = "danger";
        }
    }

    async function deleteAll() {
        if (!confirm("¿Estás seguro de que quieres eliminar todos los registros? Esta acción no se puede deshacer.")) return;
        const res = await fetch("/api/v1/cost-of-healthy-diet-by-countries", { method: "DELETE" });
        if (res.ok) {
            message = "Se han eliminado todos los registros.";
            messageType = "success";
            await getDiets();
        } else {
            message = "No se han podido eliminar los registros. Inténtalo de nuevo.";
            messageType = "danger";
        }
    }

    onMount(getDiets);

    async function fetchByRange() {
        if (!sFrom && !sTo) {
            await getDiets();
            return;
        }
        let query = '';
        if (sFrom) query += `from=${sFrom}&`;
        if (sTo)   query += `to=${sTo}`;

        const res = await fetch(`/api/v1/cost-of-healthy-diet-by-countries?${query}`);
        if (res.ok) {
            diets = await res.json();
            message = diets.length > 0
                ? `Se han encontrado ${diets.length} registro${diets.length !== 1 ? 's' : ''}.`
                : 'No se han encontrado registros en ese rango de años.';
            messageType = diets.length > 0 ? 'success' : 'danger';
        } else {
            message = 'Error al filtrar por rango. Inténtalo de nuevo.';
            messageType = 'danger';
        }
    }
</script>

<main>
    <h1>Coste de la dieta saludable por países (NVD)</h1>

    <Message bind:message bind:type={messageType} />

    <div class="top-bar">
        <div class="left-btns">
            <button onclick={loadInitialData} class="btn-load">Cargar datos de ejemplo</button>
            <button onclick={deleteAll} class="btn-del">Eliminar todos</button>
        </div>
        <div class="search-area">
            <input bind:value={sCountry} placeholder="País..." />
            <input bind:value={sYear} type="number" placeholder="Año..." />
            <button onclick={fetchSpecific} class="btn-search">Buscar</button>
            <button onclick={getDiets} class="btn-reset">Mostrar todos</button>
            <span class="separador">|</span>
            <input bind:value={sFrom} type="number" placeholder="Desde año..." />
            <input bind:value={sTo}   type="number" placeholder="Hasta año..." />
            <button onclick={fetchByRange} class="btn-search">Buscar rango</button>
        </div>
    </div>

    <DietForm {getDiets} bind:message bind:messageType />

    <hr />

    <DietTable {diets} {getDiets} bind:message bind:messageType />
</main>

<style>
    main {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }

    h1 {
        border-bottom: 2px solid #e67e22;
        padding-bottom: 10px;
        color: #2c3e50;
        font-size: 1.4rem;
        margin-bottom: 20px;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        gap: 12px;
        flex-wrap: wrap;
        background: #f9f9f9;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #eee;
    }

    .left-btns { display: flex; gap: 8px; }

    .search-area {
        display: flex;
        gap: 6px;
        align-items: center;
        flex-wrap: wrap;
    }

    .search-area input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 6px 8px;
        font-size: 0.88rem;
        width: 120px;
    }

    .btn-load {
        background: #e67e22;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.88rem;
    }
    .btn-load:hover { background: #d35400; }

    .btn-del {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.88rem;
    }
    .btn-del:hover { background: #c0392b; }

    .btn-search {
        background: #2c3e50;
        color: white;
        border: none;
        padding: 6px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.88rem;
    }
    .btn-search:hover { background: #1a252f; }

    .btn-reset {
        background: #95a5a6;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.88rem;
    }
    .btn-reset:hover { background: #7f8c8d; }

    .separador {
        color: #ccc;
        font-size: 1.2rem;
        padding: 0 4px;
    }

    hr { margin: 20px 0; border: 0; border-top: 1px solid #eee; }
</style>