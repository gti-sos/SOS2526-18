<script>
    import { page } from '$app/state'; // Lee la URL automáticamente

    // Extraemos los datos de la URL (ej: Spain y 2024)
    let country = page.params.country;
    let year = page.params.year;

    let cereal = $state({}); // Aquí guardaremos los datos que nos traiga la API

    // Al entrar, pedimos los datos actuales a la API
    $effect(async () => {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`);
        if (res.ok) {
            cereal = await res.json();
        }
    });

    // Función para guardar los cambios
    async function updateCereal() {
        const res = await fetch(`/api/v2/cereal-productions/${country}/${year}`, {
            method: "PUT",
            body: JSON.stringify(cereal),
            headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
            alert("¡Cambios guardados con éxito!");
            window.location.href = "/cereal-productions"; // Nos devuelve a la tabla
        }
    }
</script>

<h1>Editando registro de {country} ({year})</h1>

<form onsubmit={updateCereal}>
    <label>Producción: <input type="number" bind:value={cereal.cereal_production}></label><br>
    <label>Rendimiento: <input type="number" bind:value={cereal.cereal_yield}></label><br>
    <button type="submit">Guardar Cambios</button>
    <a href="/cereal-productions">Cancelar y volver</a>
</form>

<style>
    form { display: flex; flex-direction: column; gap: 10px; max-width: 300px; }
    h1 { font-family: sans-serif; }
</style>