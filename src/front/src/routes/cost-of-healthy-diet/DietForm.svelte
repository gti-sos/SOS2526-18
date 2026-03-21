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
        <div class="campo">
            <label for="f-code">Código de país</label>
            <input id="f-code" bind:value={country_code} type="number" placeholder="Ej: 724" />
        </div>
        <div class="campo">
            <label for="f-country">País *</label>
            <input id="f-country" bind:value={country} placeholder="Ej: Spain" />
        </div>
        <div class="campo">
            <label for="f-region">Región *</label>
            <input id="f-region" bind:value={region} placeholder="Ej: Europe" />
        </div>
        <div class="campo">
            <label for="f-year">Año *</label>
            <input id="f-year" bind:value={year} type="number" placeholder="Ej: 2023" />
        </div>
        <div class="campo">
            <label for="f-cat">Categoría de coste</label>
            <select id="f-cat" bind:value={cost_category}>
                <option value="">-- Selecciona --</option>
                <option value="Low Cost">Coste bajo</option>
                <option value="Medium Cost">Coste medio</option>
                <option value="High Cost">Coste alto</option>
            </select>
        </div>
    </div>

    <div class="fila">
        <div class="campo">
            <label for="f-diet">Coste diario dieta (USD)</label>
            <input id="f-diet" bind:value={cost_diet} type="number" step="0.01" placeholder="Ej: 2.75" />
        </div>
        <div class="campo">
            <label for="f-annual">Coste anual dieta (USD)</label>
            <input id="f-annual" bind:value={cost_annual} type="number" step="0.01" placeholder="Ej: 1003.75" />
        </div>
        <div class="campo">
            <label for="f-veg">Coste verduras/día (USD)</label>
            <input id="f-veg" bind:value={cost_veg} type="number" step="0.01" placeholder="Ej: 0.71" />
        </div>
        <div class="campo">
            <label for="f-fruit">Coste frutas/día (USD)</label>
            <input id="f-fruit" bind:value={cost_fruit} type="number" step="0.01" placeholder="Ej: 0.67" />
        </div>
        <div class="campo">
            <label for="f-total">Coste total componentes (USD)</label>
            <input id="f-total" bind:value={cost_total} type="number" step="0.01" placeholder="Ej: 1.52" />
        </div>
    </div>

    <div class="form-footer">
        <span class="nota">* Campos obligatorios</span>
        <button onclick={createDiet} class="btn-add">Añadir registro</button>
    </div>
</div>

<style>
    .form-wrap {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 16px 20px;
        margin-bottom: 20px;
    }

    h3 { margin: 0 0 14px; font-size: 1rem; color: #333; }

    .fila {
        display: flex;
        gap: 14px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .campo {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 140px;
    }

    label {
        font-size: 0.78rem;
        font-weight: 600;
        color: #555;
    }

    input, select {
        padding: 6px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.88rem;
        font-family: inherit;
        width: 100%;
        box-sizing: border-box;
        background: white;
    }

    input:focus, select:focus {
        outline: none;
        border-color: #e67e22;
    }

    .form-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #eee;
        padding-top: 12px;
        margin-top: 4px;
    }

    .nota { font-size: 0.75rem; color: #999; }

    .btn-add {
        background: #e67e22;
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.88rem;
        font-family: inherit;
    }
    .btn-add:hover { background: #d35400; }
</style>