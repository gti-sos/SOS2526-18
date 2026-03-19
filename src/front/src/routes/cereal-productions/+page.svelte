<script>
    import { onMount } from 'svelte';

    // 1. VARIABLES (Estado de la aplicación)
    let cereals = []; 
    let message = ""; 
    
    // Objeto para el formulario de CREAR
    let newCereal = {
        country: "",
        country_code: "",
        year: "",
        land_used: 0,
        cereal_production: 0,
        cereal_yield: 0,
        population: 0
    };

    // 2. FUNCIONES (Lógica de API)

    // GET - Listar todos los recursos
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            const data = await res.json();
            cereals = data;
            if (cereals.length === 0) {
                message = "La base de datos está vacía. Pulsa 'Cargar Datos Iniciales'.";
            }
        } else {
            message = "Error: No se ha podido conectar con el servidor.";
        }
    }

    // GET - Cargar datos de prueba
    async function loadInitialData() {
        message = "Cargando datos iniciales...";
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Datos cargados con éxito!";
            getCereals(); 
        } else {
            message = "Error: Los datos ya existen o el servidor ha fallado.";
        }
    }

    // POST - Crear un nuevo recurso
    async function createCereal() {
        const cerealToPost = {
            ...newCereal,
            year: parseInt(newCereal.year),
            land_used: parseFloat(newCereal.land_used),
            cereal_production: parseFloat(newCereal.cereal_production),
            cereal_yield: parseFloat(newCereal.cereal_yield),
            population: parseInt(newCereal.population)
        };

        const res = await fetch("/api/v2/cereal-productions", {
            method: "POST",
            body: JSON.stringify(cerealToPost),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            message = `¡Recurso ${newCereal.country} (${newCereal.year}) creado correctamente!`;
            newCereal = { country: "", country_code: "", year: "", land_used: 0, cereal_production: 0, cereal_yield: 0, population: 0 };
            getCereals(); 
        } else if (res.status === 409) {
            message = "Error: Ese país y año ya existen en la base de datos.";
        } else {
            message = "Error: Datos incorrectos. Recuerda que Producción y Población deben ser > 0.";
        }
    }

    // DELETE - Borrar un recurso
    async function deleteCereal(country, year) {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "DELETE"
        });
        if (res.ok) {
            message = `Borrado: ${country} (${year})`;
            getCereals();
        } else {
            message = "Error: No se ha podido borrar el recurso.";
        }
    }

    // DELETE - Borrar todo
    async function deleteAllCereals() {
        if (confirm("¿Estás seguro de que quieres borrar TODOS los datos?")) {
            const res = await fetch("/api/v2/cereal-productions", {
                method: "DELETE"
            });
            if (res.ok) {
                message = "Todos los recursos han sido eliminados correctamente.";
                getCereals();
            }
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    {#if message}
        <div class="alert">
            <strong>Aviso del sistema:</strong> {message}
            <button on:click={() => message = ""} class="close-btn">X</button>
        </div>
    {/if}

    <div class="actions">
        <button on:click={loadInitialData} class="btn-load">Cargar Datos Iniciales</button>
        <button on:click={deleteAllCereals} class="btn-delete-all">Borrar Todo</button>
    </div>

    <table>
        <thead>
            <tr>
                <th>País</th>
                <th>Código</th>
                <th>Año</th>
                <th>Uso Tierra</th>
                <th>Producción</th>
                <th>Rendimiento</th>
                <th>Población</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr class="create-row">
                <td><input bind:value={newCereal.country} placeholder="Ej: Spain"></td>
                <td><input bind:value={newCereal.country_code} placeholder="ESP"></td>
                <td><input bind:value={newCereal.year} type="number"></td>
                <td><input bind:value={newCereal.land_used} type="number"></td>
                <td><input bind:value={newCereal.cereal_production} type="number"></td>
                <td><input bind:value={newCereal.cereal_yield} type="number"></td>
                <td><input bind:value={newCereal.population} type="number"></td>
                <td><button on:click={createCereal} class="btn-add">Añadir</button></td>
            </tr>

            {#each cereals as c}
                <tr>
                    <td>{c.country}</td>
                    <td>{c.country_code}</td>
                    <td>{c.year}</td>
                    <td>{c.land_used}</td>
                    <td>{c.cereal_production}</td>
                    <td>{c.cereal_yield}</td>
                    <td>{c.population}</td>
                    <td>
                        <a href="/cereal-productions/{c.country}/{c.year}"><button class="btn-edit">Editar</button></a>
                        <button on:click={() => deleteCereal(c.country, c.year)} class="btn-delete">Borrar</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
    main { font-family: sans-serif; padding: 20px; }
    h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
    
    .alert { 
        background-color: #f8d7da; color: #721c24; 
        padding: 15px; margin: 20px 0; 
        border: 1px solid #f5c6cb; border-radius: 4px; 
        position: relative;
    }
    .close-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; font-weight: bold; cursor: pointer; }

    .actions { margin-bottom: 20px; }
    button { padding: 8px 12px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; margin-right: 5px; }
    
    .btn-load { background-color: #4CAF50; color: white; border: none; }
    .btn-delete-all { background-color: #f44336; color: white; border: none; }
    .btn-add { background-color: #007bff; color: white; width: 100%; border: none; }
    .btn-edit { background-color: #ffc107; }
    .btn-delete { color: #dc3545; border-color: #dc3545; }

    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f4f4f4; }
    .create-row { background-color: #eef7ff; }
    input { width: 80px; padding: 5px; }
</style>