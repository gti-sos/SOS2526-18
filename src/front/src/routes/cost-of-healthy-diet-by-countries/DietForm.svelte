<script>
    let { getDiets, message = $bindable(""), messageType = $bindable("danger") } = $props();

    let open = $state(false);
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
            message = "Por favor, rellena al menos el nombre del país, la región y el año antes de continuar.";
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
            const res = await fetch("/api/v2/cost-of-healthy-diet-by-countries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toPost)
            });

            if (res.ok) {
                message = `El registro de '${toPost.country}' para el año ${toPost.year} se ha añadido correctamente.`;
                messageType = "success";
                resetForm();
                open = false;
                await getDiets();
            } else if (res.status === 409) {
                message = `Ya existe un registro para '${toPost.country}' en el año ${toPost.year}. No es posible añadir entradas duplicadas.`;
                messageType = "danger";
            } else if (res.status === 400) {
                message = "Algunos datos introducidos no son válidos o están incompletos. Revisa el formulario e inténtalo de nuevo.";
                messageType = "danger";
            } else {
                message = "No se ha podido guardar el registro. Por favor, inténtalo de nuevo más tarde.";
                messageType = "danger";
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión a internet e inténtalo de nuevo.";
            messageType = "danger";
        }

        loading = false;
    }
</script>

<div class="form-section">
    <button class="toggle-btn" onclick={() => { open = !open; message = ""; }}>
        <span class="toggle-icon">{open ? '−' : '+'}</span>
        {open ? 'Ocultar formulario' : 'Añadir nuevo registro'}
    </button>

    {#if open}
    <div class="form-body">
        <p class="form-desc">
            Introduce los datos del nuevo país y año. Los campos marcados con <abbr title="Obligatorio">*</abbr> son obligatorios.
        </p>

        <div class="fields-grid">
            <div class="field col-narrow">
                <label for="f-code">Código de país</label>
                <input id="f-code" bind:value={country_code} type="number" placeholder="724" />
            </div>
            <div class="field col-wide">
                <label for="f-country">País <span class="req">*</span></label>
                <input id="f-country" bind:value={country} placeholder="Ej: Spain" />
            </div>
            <div class="field">
                <label for="f-region">Región del mundo <span class="req">*</span></label>
                <input id="f-region" bind:value={region} placeholder="Ej: Europe" />
            </div>
            <div class="field col-narrow">
                <label for="f-year">Año <span class="req">*</span></label>
                <input id="f-year" bind:value={year} type="number" placeholder="2023" />
            </div>
            <div class="field">
                <label for="f-diet">Coste diario de dieta saludable (USD, paridad de poder adquisitivo)</label>
                <input id="f-diet" bind:value={cost_healthy_diet_ppp_usd} type="number" step="0.01" placeholder="2.75" />
            </div>
            <div class="field">
                <label for="f-annual">Coste anual de dieta saludable (USD)</label>
                <input id="f-annual" bind:value={annual_cost_healthy_diet_usd} type="number" step="0.01" placeholder="1003.75" />
            </div>
            <div class="field">
                <label for="f-veg">Coste diario de verduras (USD, paridad)</label>
                <input id="f-veg" bind:value={cost_vegetables_ppp_usd} type="number" step="0.01" placeholder="0.71" />
            </div>
            <div class="field">
                <label for="f-fruit">Coste diario de frutas (USD, paridad)</label>
                <input id="f-fruit" bind:value={cost_fruits_ppp_usd} type="number" step="0.01" placeholder="0.67" />
            </div>
            <div class="field">
                <label for="f-total">Coste total de componentes alimentarios</label>
                <input id="f-total" bind:value={total_food_components_cost} type="number" step="0.01" placeholder="1.52" />
            </div>
            <div class="field">
                <label for="f-cat">Categoría de coste</label>
                <select id="f-cat" bind:value={cost_category}>
                    <option value="">— Selecciona —</option>
                    <option value="Low Cost">Coste bajo</option>
                    <option value="Medium Cost">Coste medio</option>
                    <option value="High Cost">Coste alto</option>
                </select>
            </div>
        </div>

        <div class="form-actions">
            <span class="req-note"><abbr title="Obligatorio">*</abbr> Campos obligatorios</span>
            <button class="btn-secondary" onclick={() => { resetForm(); open = false; message = ""; }}>
                Cancelar
            </button>
            <button class="btn-primary" onclick={createDiet} disabled={loading}>
                {loading ? 'Guardando…' : 'Guardar registro'}
            </button>
        </div>
    </div>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    .form-section {
        margin-bottom: 32px;
        border-top: 2px solid #1a1a1a;
        padding-top: 20px;
    }

    .toggle-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        background: none;
        border: 1px solid #1a1a1a;
        padding: 10px 20px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.88rem;
        font-weight: 500;
        color: #1a1a1a;
        cursor: pointer;
        border-radius: 2px;
        letter-spacing: 0.02em;
        transition: background 0.15s;
        margin-bottom: 0;
    }
    .toggle-btn:hover { background: #f5f0eb; }

    .toggle-icon {
        font-size: 1.2rem;
        line-height: 1;
        color: #c0522a;
        font-weight: 300;
    }

    .form-body {
        margin-top: 20px;
        padding: 28px;
        background: #faf8f5;
        border: 1px solid #e8e0d6;
        border-radius: 2px;
        animation: slideDown 0.2s ease;
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .form-desc {
        font-family: 'Libre Baskerville', Georgia, serif;
        font-size: 0.85rem;
        color: #6b5e52;
        margin: 0 0 22px;
        line-height: 1.7;
        font-style: italic;
    }

    .fields-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 18px 24px;
        margin-bottom: 24px;
    }
    .col-narrow { grid-column: span 1; max-width: 160px; }
    .col-wide   { grid-column: span 1; }

    .field { display: flex; flex-direction: column; gap: 6px; }

    label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        color: #4a3f35;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        line-height: 1.4;
    }
    .req { color: #c0522a; }
    .req-note {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        color: #9a8b80;
        flex: 1;
    }
    abbr { text-decoration: none; color: #c0522a; }

    input, select {
        border: none;
        border-bottom: 1.5px solid #c8bdb5;
        background: transparent;
        padding: 8px 4px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.92rem;
        color: #1a1a1a;
        transition: border-color 0.2s;
        border-radius: 0;
        -webkit-appearance: none;
    }
    input:focus, select:focus {
        outline: none;
        border-bottom-color: #c0522a;
    }
    input::placeholder { color: #c8bdb5; }
    select option { background: #fff; }

    .form-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-top: 20px;
        border-top: 1px solid #e8e0d6;
        flex-wrap: wrap;
    }

    .btn-secondary {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        background: none;
        border: 1px solid #c8bdb5;
        color: #6b5e52;
        padding: 9px 20px;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color 0.15s, color 0.15s;
    }
    .btn-secondary:hover { border-color: #1a1a1a; color: #1a1a1a; }

    .btn-primary {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        background: #1a1a1a;
        color: #fff;
        border: none;
        padding: 10px 24px;
        border-radius: 2px;
        cursor: pointer;
        letter-spacing: 0.03em;
        transition: background 0.15s;
    }
    .btn-primary:hover { background: #c0522a; }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
</style>