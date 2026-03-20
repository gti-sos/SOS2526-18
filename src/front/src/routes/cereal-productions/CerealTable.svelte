<script>
    // SVELTE 5: Recibimos las propiedades usando la runa $props
    // message y messageType usan $bindable para devolver cambios al padre (+page.svelte)
    let { 
        cereals = [], 
        getCereals, 
        message = $bindable(""), 
        messageType = $bindable("danger") 
    } = $props();

    // FUNCIÓN PARA BORRAR UN DATO (DELETE)
    async function deleteCereal(country, year) {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "DELETE"
        });

        if (res.ok) {
            message = `El registro de ${country} (${year}) ha sido eliminado correctamente.`;
            messageType = "success";
            // Refrescamos la tabla llamando a la función del padre
            await getCereals();
        } else {
            messageType = "danger";
            if (res.status === 404) {
                message = `Error 404: No existe un registro para '${country}' en el año ${year}.`;
            } else {
                message = `Error inesperado al intentar borrar (Código ${res.status}).`;
            }
        }
    }
</script>

<div class="table-container">
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
                        <a href="/cereal-productions/{c.country}/{c.year}">
                            <button class="btn-edit">Editar</button>
                        </a>
                        <button onclick={() => deleteCereal(c.country, c.year)} class="btn-delete">
                            Borrar
                        </button>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="8" style="text-align: center; padding: 20px;">
                        No hay datos disponibles en la base de datos.
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container { margin-top: 20px; overflow-x: auto; font-family: sans-serif; }
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
    th { background-color: #f8f9fa; color: #333; font-weight: bold; }
    tr:hover { background-color: #f1f1f1; }
    
    .btn-edit { 
        background-color: #ffc107; 
        border: none; 
        padding: 6px 12px; 
        cursor: pointer; 
        border-radius: 4px;
        margin-right: 5px;
        font-weight: 500;
    }
    .btn-delete { 
        background-color: #dc3545; 
        color: white; 
        border: none; 
        padding: 6px 12px; 
        cursor: pointer; 
        border-radius: 4px;
        font-weight: 500;
    }
    .btn-delete:hover { background-color: #c82333; }
    .btn-edit:hover { background-color: #e0a800; }
    a { text-decoration: none; }
</style>