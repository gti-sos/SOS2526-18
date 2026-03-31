<script>
    import { page } from "$app/state"; 
    import Message from "../../Message.svelte";

    // Parámetros desde la URL (runes mode)
    let country = page.params.country;
    let year = page.params.year;

    // Estado reactivo DEL FORMULARIO — se sobrescribe al GET
    let record = $state(null);

    let message = $state("");
    let messageType = $state("success");

    const API = "/api/v2/food-supply-utilization-accounts";

    // 🔥 Cargar datos ORIGINALES desde la API
    $effect(async () => {
        const res = await fetch(
            `${API}/${encodeURIComponent(country)}?year=${year}`
        );

        if (res.ok) {
            // 👇 ESTA LÍNEA ES LA CLAVE:
            // record pasa a contener TODOS los datos reales del backend
            record = await res.json();
        } else {
            message = "No se encontraron datos para ese país y año.";
            messageType = "danger";
        }
    });

    // Guardar cambios con PUT
    async function save(event) {
        event.preventDefault();

        const res = await fetch(
            `${API}/${encodeURIComponent(country)}?year=${year}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            }
        );

        if (res.ok) {
            window.location.href =
                "/food-supply-utilization-accounts?updated=true";
        } else {
            alert("Error al guardar: " + res.status);
        }
    }
</script>

<h1>Editando registro de {country} ({year})</h1>

{#if message}
    <p style="color: red;">{message}</p>
{/if}

{#if record}
<form onsubmit={save}>

    <label>
        FAOSTAT:
        <input type="number" bind:value={record.faostat} disabled>
    </label>

    <label>
        Código M49:
        <input type="number" bind:value={record.m49_code}>
    </label>

    <label>
        País:
        <input type="text" bind:value={record.country_name_en}>
    </label>

    <label>
        Código de Ítem:
        <input type="number" bind:value={record.item_code}>
    </label>

    <label>
        Ítem:
        <input type="text" bind:value={record.item}>
    </label>

    <label>
        Año:
        <input type="number" bind:value={record.year}>
    </label>

    <label>
        Stock inicial (t):
        <input type="number" step="any" bind:value={record.opening_stocks_tonnes}>
    </label>

    <label>
        Producción (t):
        <input type="number" step="any" bind:value={record.production_tonnes}>
    </label>

    <label>
        Importación (t):
        <input type="number" step="any" bind:value={record.import_quantity_tonnes}>
    </label>

    <label>
        Variación de stock (t):
        <input type="number" step="any" bind:value={record.stock_variation_tonnes}>
    </label>

    <label>
        Exportación (t):
        <input type="number" step="any" bind:value={record.export_quantity_tonnes}>
    </label>

    <div class="actions">
        <button type="submit" class="btn-save">Guardar Cambios</button>
        /food-supply-utilization-accounts
            <span class="btn-cancel">Cancelar y volver</span>
        
    </div>
</form>

{:else}
<p>Cargando datos…</p>
{/if}

<style>
    h1 { font-family: sans-serif; color: #333; }
    form { display: flex; flex-direction: column; gap: 15px; max-width: 400px; font-family: sans-serif; }
    label { display: flex; flex-direction: column; font-weight: bold; }
    input { padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; }
    .actions { display: flex; gap: 10px; align-items: center; }
    .btn-save { background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-save:hover { background-color: #218838; }
    .btn-cancel { text-decoration: none; color: #dc3545; font-weight: bold; cursor: pointer; }
</style>