<script>
    let { getDiets, message = $bindable(""), messageType = $bindable("danger") } = $props();

    let loading = $state(false);

    let country_code = $state("");
    let country = $state("");
    let region = $state("");
    let year = $state("");
    let cost_healthy_diet_ppp_usd = $state("");
    let annual_cost_healthy_diet_usd = $state("");
    let cost_vegetables_ppp_usd = $state("");
    let cost_fruits_ppp_usd = $state("");
    let total_food_components_cost = $state("");
    let cost_category = $state("");

    function resetForm() {
        country_code = ""; country = ""; region = ""; year = "";
        cost_healthy_diet_ppp_usd = ""; annual_cost_healthy_diet_usd = "";
        cost_vegetables_ppp_usd = ""; cost_fruits_ppp_usd = "";
        total_food_components_cost = ""; cost_category = "";
    }

    async function createDiet() {
        if (!country.trim() || !region.trim() || !year) {
            message = "Por favor, rellena al menos el país, la región y el año.";
            messageType = "danger";
            return;
        }

        loading = true;
        message = "";

        const toPost = {
            country_code: parseInt(country_code) || 0,
            country: country.trim(),
            region: region.trim(),
            year: parseInt(year),
            cost_healthy_diet_ppp_usd: parseFloat(cost_healthy_diet_ppp_usd) || 0,
            annual_cost_healthy_diet_usd: parseFloat(annual_cost_healthy_diet_usd) || 0,
            cost_vegetables_ppp_usd: parseFloat(cost_vegetables_ppp_usd) || 0,
            cost_fruits_ppp_usd: parseFloat(cost_fruits_ppp_usd) || 0,
            total_food_components_cost: parseFloat(total_food_components_cost) || 0,
            cost_category
        };

        try {
            const res = await fetch("/api/v1/cost-of-healthy-diet-by-countries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toPost)
            });

            if (res.ok) {
                message = `El registro de '${toPost.country}' para el año ${toPost.year} se ha añadido correctamente.`;
                messageType = "success";
                resetForm();
                await getDiets();
            } else if (res.status === 409) {
                message = `Ya existe un registro para '${toPost.country}' en el año ${toPost.year}.`;
                messageType = "danger";
            } else if (res.status === 400) {
                message = "Datos incorrectos o incompletos. Revisa el formulario e inténtalo de nuevo.";
                messageType = "danger";
            } else {
                message = "No se ha podido guardar el registro. Inténtalo de nuevo más tarde.";
                messageType = "danger";
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión.";
            messageType = "danger";
        }

        loading = false;
    }
</script>

<div class="form-container">
    <h3>Añadir nuevo registro</h3>
    <table>
        <thead>
            <tr>
                <th>Cód. país</th>
                <th>País</th>
                <th>Región</th>
                <th>Año</th>
                <th>Coste diario (PPP)</th>
                <th>Coste anual</th>
                <th>Verduras</th>
                <th>Frutas</th>
                <th>Total comp.</th>
                <th>Categoría</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={country_code} type="number" placeholder="724" /></td>
                <td><input bind:value={country} placeholder="Spain" /></td>
                <td><input bind:value={region} placeholder="Europe" /></td>
                <td><input bind:value={year} type="number" placeholder="2023" /></td>
                <td><input bind:value={cost_healthy_diet_ppp_usd} type="number" step="0.01" placeholder="2.75" /></td>
                <td><input bind:value={annual_cost_healthy_diet_usd} type="number" step="0.01" placeholder="1003.75" /></td>
                <td><input bind:value={cost_vegetables_ppp_usd} type="number" step="0.01" placeholder="0.71" /></td>
                <td><input bind:value={cost_fruits_ppp_usd} type="number" step="0.01" placeholder="0.67" /></td>
                <td><input bind:value={total_food_components_cost} type="number" step="0.01" placeholder="1.52" /></td>
                <td>
                    <select bind:value={cost_category}>
                        <option value="">--</option>
                        <option value="Low Cost">Coste bajo</option>
                        <option value="Medium Cost">Coste medio</option>
                        <option value="High Cost">Coste alto</option>
                    </select>
                </td>
                <td>
                    <button onclick={createDiet} disabled={loading} class="btn-add">
                        {loading ? '...' : 'Añadir'}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .form-container {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
        overflow-x: auto;
    }
    h3 { margin: 0 0 12px; color: #333; font-size: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th {
        padding: 8px;
        text-align: left;
        font-size: 0.8rem;
        color: #555;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
    }
    td { padding: 6px 8px; }
    input, select {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.85rem;
        box-sizing: border-box;
    }
    .btn-add {
        background: #e67e22;
        color: white;
        border: none;
        padding: 7px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        white-space: nowrap;
    }
    .btn-add:hover { background: #d35400; }
    .btn-add:disabled { opacity: 0.5; cursor: not-allowed; }
</style>