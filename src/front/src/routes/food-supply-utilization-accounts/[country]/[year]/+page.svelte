<script>
    import { page } from "$app/state";

    let country = page.params.country;
    let year = page.params.year;
    let ex=10

    // Importante: Inicializar como null
    let record = $state(null);

    let message = $state("");
    const API = "/api/v2/food-supply-utilization-accounts";

    $effect(async () => {
        const res = await fetch(
            `${API}/${encodeURIComponent(country)}?year=${year}`
        );

        if (res.ok) {
            record = await res.json();   // ahora no desaparece
        } else {
            message = "Error: No se pudo encontrar el registro.";
        }
    });

    async function save(event) {
        event.preventDefault();

        const res = await fetch(
            `${API}/${encodeURIComponent(country)}/${year}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record[0])
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
        <input type="number" bind:value={record[0].faostat}>
    </label>

    <label>
        Código M49:
        <input type="number" bind:value={record[0].m49_code}>
    </label>

    <label>
        Código de Ítem:
        <input type="number" bind:value={record[0].item_code}>
    </label>

    <label>
        Ítem:
        <input type="text" bind:value={record[0].item}>
    </label>

    <label>
        Stock inicial (t):
        <input type="number" step="any" bind:value={record[0].opening_stocks_tonnes}>
    </label>

    <label>
        Producción (t):
        <input type="number" step="any" bind:value={record[0].production_tonnes}>
    </label>

    <label>
        Importación (t):
        <input type="number" step="any" bind:value={record[0].import_quantity_tonnes}>
    </label>

    <label>
        Variación de stock (t):
        <input type="number" step="any" bind:value={record[0].stock_variation_tonnes}>
    </label>

    <label>
        Exportación (t):
        <input type="number" step="any" bind:value={record[0].export_quantity_tonnes}>
    </label>

    <div class="actions">
        <button type="submit" class="btn-save">Guardar Cambios</button>
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