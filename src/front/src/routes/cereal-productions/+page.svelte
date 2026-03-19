<script>
    import { onMount } from 'svelte';
    let cereals = [];
    let message = "";

    // Función para obtener los datos de tu API v2
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            cereals = await res.json();
        } else {
            message = "Error al cargar los datos";
        }
    }

    // Cargar datos iniciales (Botón)
    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            getCereals(); // Recargamos la tabla
        }
    }

    // Borrar un recurso concreto
    async function deleteCereal(country, year) {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "DELETE"
        });
        if (res.ok) {
            getCereals();
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>
    
    {#if message}
        <p style="color: red;">{message}</p>
    {/if}

    <button on:click={loadInitialData}>Cargar datos iniciales</button>

    <table>
        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Producción</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each cereals as c}
                <tr>
                    <td>{c.country}</td>
                    <td>{c.year}</td>
                    <td>{c.cereal_production}</td>
                    <td>
                        <button on:click={() => deleteCereal(c.country, c.year)}>Borrar</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>