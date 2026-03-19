<script>
    import { onMount } from 'svelte';

    // 1. VARIABLES (El estado de nuestra aplicación)
    let cereals = []; // Aquí guardamos la lista que viene del servidor
    let message = ""; // Para mostrar avisos de éxito o error
    
    // Objeto vacío para el formulario de CREAR
    let newCereal = {
        country: "",
        country_code: "",
        year: "",
        land_used: 0,
        cereal_production: 0,
        cereal_yield: 0,
        population: 0
    };

    // 2. FUNCIONES (La lógica que habla con la API)

    // GET - Obtener todos los recursos (LISTAR)
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            const data = await res.json();
            cereals = data;
            if (cereals.length === 0) message = "La base de datos está vacía.";
        } else {
            message = "Error al conectar con el servidor.";
        }
    }

    // GET - Cargar datos iniciales
    async function loadInitialData() {
        message = "Cargando datos iniciales...";
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "Datos cargados con éxito.";
            getCereals(); // Refrescamos la tabla
        } else {
            message = "Error: Los datos ya existen o el servidor falló.";
        }
    }

    // POST - Crear un nuevo recurso
    async function createCereal() {
        const res = await fetch("/api/v2/cereal-productions", {
            method: "POST",
            body: JSON.stringify(newCereal),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            message = `Recurso ${newCereal.country} creado correctamente.`;
            // Limpiamos el formulario
            newCereal = { country: "", country_code: "", year: "", land_used: 0, cereal_production: 0, cereal_yield: 0, population: 0 };
            getCereals(); // Refrescamos la tabla
        } else if (res.status === 409) {
            message = "Error: Ese país y año ya existen.";
        } else {
            message = "Error: Faltan campos o los datos son incorrectos (v2 no acepta negativos).";
        }
    }

    // DELETE - Borrar un recurso concreto
    async function deleteCereal(country, year) {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "DELETE"
        });
        if (res.ok) {
            message = `Borrado: ${country} (${year})`;
            getCereals();
        } else {
            message = "No se pudo borrar el recurso.";
        }
    }

    // DELETE - Borrar TODOS los recursos
    async function deleteAllCereals() {
        if (confirm("¿Estás seguro de que quieres borrar TODOS los datos?")) {
            const res = await fetch("/api/v2/cereal-productions", {
                method: "DELETE"
            });
            if (res.ok) {
                message = "Todos los recursos han sido eliminados.";
                getCereals();
            }
        }
    }

    // Al cargar la página, pedimos los datos
    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    {#if message}
        <div style="background-color: #f0f0f0; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc;">
            <strong>Aviso:</strong> {message}
        </div>
    {/if}

    <div style="margin-bottom: 20px;">
        <button on:click={loadInitialData} style="background-color: #4CAF50; color: white;">Cargar Datos Iniciales</button>
        <button on:click={deleteAllCereals} style="background-color: #f44336; color: white;">Borrar Todo</button>
    </div>

    <table border="1" style="width: 100%; text-align: left; border-collapse: collapse;">
        <thead>
            <tr style="background-color: #ddd;">
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
            <tr style="background-color: #e8f4fd;">
                <td><input bind:value={newCereal.country} placeholder="Ej: Spain" size="10"></td>
                <td><input bind:value={newCereal.country_code} placeholder="ESP" size="5"></td>
                <td><input bind:value={newCereal.year} type="number" placeholder="2024" style="width: 60px;"></td>
                <td><input bind:value={newCereal.land_used} type="number" style="width: 80px;"></td>
                <td><input bind:value={newCereal.cereal_production} type="number" style="width: 80px;"></td>
                <td><input bind:value={newCereal.cereal_yield} type="number" style="width: 60px;"></td>
                <td><input bind:value={newCereal.population} type="number" style="width: 100px;"></td>
                <td><button on:click={createCereal} style="width: 100%;">Añadir</button></td>
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
                        <a href="/cereal-productions/{c.country}/{c.year}"><button>Editar</button></a>
                        <button on:click={() => deleteCereal(c.country, c.year)} style="color: red;">Borrar</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>   
</main>

<style>
    main { font-family: sans-serif; padding: 20px; }
    table td, table th { padding: 8px; }
    button { cursor: pointer; }
</style>

{#if message}
    <div style="background-color: #f8d7da; color: #721c24; padding: 15px; margin: 20px 0; border: 1px solid #f5c6cb; border-radius: 5px;">
        <strong>Aviso del sistema:</strong> {message}
        
        <button on:click={() => message = ""} style="float: right; background: none; border: none; cursor: pointer; font-weight: bold;">X</button>
    </div>
{/if}