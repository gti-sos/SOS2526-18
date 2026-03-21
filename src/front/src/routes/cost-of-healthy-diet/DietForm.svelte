<script>
    let { getDiets, message = $bindable(""), messageType = $bindable("danger") } = $props();

    let country_code = $state(""), country = $state(""), region = $state(""), year = $state("");
    let cost_diet = $state(""), cost_annual = $state(""), cost_veg = $state("");
    let cost_fruit = $state(""), cost_total = $state(""), cost_category = $state("");

    async function createDiet() {
        if (!country || !region || !year) {
            message = "Rellena al menos el país, la región y el año.";
            messageType = "danger";
            return;
        }
        const res = await fetch("/api/v1/cost-of-healthy-diet-by-countries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                country_code: parseInt(country_code) || 0,
                country, region, year: parseInt(year),
                cost_healthy_diet_ppp_usd: parseFloat(cost_diet) || 0,
                annual_cost_healthy_diet_usd: parseFloat(cost_annual) || 0,
                cost_vegetables_ppp_usd: parseFloat(cost_veg) || 0,
                cost_fruits_ppp_usd: parseFloat(cost_fruit) || 0,
                total_food_components_cost: parseFloat(cost_total) || 0,
                cost_category
            })
        });
        if (res.ok) {
            message = `Registro de '${country}' (${year}) añadido correctamente.`;
            messageType = "success";
            country_code = ""; country = ""; region = ""; year = "";
            cost_diet = ""; cost_annual = ""; cost_veg = "";
            cost_fruit = ""; cost_total = ""; cost_category = "";
            await getDiets();
        } else if (res.status === 409) {
            message = `Ya existe un registro para '${country}' en el año ${year}.`;
            messageType = "danger";
        } else if (res.status === 400) {
            message = "Datos incorrectos o incompletos. Revisa el formulario.";
            messageType = "danger";
        } else {
            message = "No se ha podido guardar el registro. Inténtalo más tarde.";
            messageType = "danger";
        }
    }
</script>

<div class="form-wrap">
    <h3>Añadir nuevo registro</h3>
    <div class="fila">
        <input bind:value={country_code} type="number" placeholder="Cód. país" />
        <input bind:value={country} placeholder="País *" />
        <input bind:value={region} placeholder="Región *" />
        <input bind:value={year} type="number" placeholder="Año *" />
        <input bind:value={cost_diet} type="number" step="0.01" placeholder="Coste diario" />
        <input bind:value={cost_annual} type="number" step="0.01" placeholder="Coste anual" />
        <input bind:value={cost_veg} type="number" step="0.01" placeholder="Verduras" />
        <input bind:value={cost_fruit} type="number" step="0.01" placeholder="Frutas" />
        <input bind:value={cost_total} type="number" step="0.01" placeholder="Total comp." />
        <select bind:value={cost_category}>
            <option value="">Categoría</option>
            <option value="Low Cost">Coste bajo</option>
            <option value="Medium Cost">Coste medio</option>
            <option value="High Cost">Coste alto</option>
        </select>
        <button onclick={createDiet} class="btn-add">Añadir</button>
    </div>
</div>

<style>
    .form-wrap { background: #f9f9f9; border: 1px solid #ddd; border-radius: 6px; padding: 14px; margin-bottom: 20px; }
    h3 { margin: 0 0 10px; font-size: 1rem; color: #333; }
    .fila { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    input, select { padding: 6px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.85rem; font-family: inherit; }
    .btn-add { background: #e67e22; color: white; border: none; padding: 7px 16px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .btn-add:hover { background: #d35400; }
</style>