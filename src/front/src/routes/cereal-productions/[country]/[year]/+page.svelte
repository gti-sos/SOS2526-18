<script>
    import { page } from '$app/state'; 

    let country = page.params.country;
    let year = page.params.year;

    let cereal = $state({
        country: country,
        country_code: "",
        year: parseInt(year),
        land_used: 0,
        cereal_production: 0,
        cereal_yield: 0,
        population: 0
    });

    let message = $state("");

    $effect(async () => {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`);
        if (res.ok) {
            cereal = await res.json();
        } else {
            message = "Error: No se pudo encontrar el registro.";
        }
    });

    async function updateCereal(event) {
        event.preventDefault(); 
        
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "PUT",
            body: JSON.stringify(cereal),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            alert("¡Cambios guardados con éxito!");
            window.location.href = "/cereal-productions"; 
        } else {
            alert("Error al guardar: " + res.status);
        }
    }
</script>

<h1>Editando registro de {country} ({year})</h1>

{#if message}
    <p style="color: red;">{message}</p>
{/if}

<form onsubmit={updateCereal}>
    <label>
        Código de País: 
        <input type="text" bind:value={cereal.country_code}>
    </label>

    <label>
        Uso de Tierra: 
        <input type="number" step="any" bind:value={cereal.land_used}>
    </label>

    <label>
        Producción: 
        <input type="number" step="any" bind:value={cereal.cereal_production}>
    </label>

    <label>
        Rendimiento: 
        <input type="number" step="any" bind:value={cereal.cereal_yield}>
    </label>

    <label>
        Población: 
        <input type="number" step="any" bind:value={cereal.population}>
    </label>

    <div class="actions">
        <button type="submit" class="btn-save">Guardar Cambios</button>
        <a href="/cereal-productions" class="btn-cancel">Cancelar y volver</a>
    </div>
</form>

<style>
    /* Tu CSS está perfecto, no hace falta tocarlo */
    h1 { font-family: sans-serif; color: #333; }
    form { display: flex; flex-direction: column; gap: 15px; max-width: 400px; font-family: sans-serif; }
    label { display: flex; flex-direction: column; font-weight: bold; }
    input { padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; }
    .actions { display: flex; gap: 10px; align-items: center; }
    .btn-save { background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-save:hover { background-color: #218838; }
    .btn-cancel { text-decoration: none; color: #dc3545; font-weight: bold; }
</style>