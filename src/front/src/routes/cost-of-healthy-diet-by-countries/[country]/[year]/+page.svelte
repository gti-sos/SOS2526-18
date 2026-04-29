<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    const country = $page.params.country;
    const year = $page.params.year;
    const API = `/api/v1/cost-of-healthy-diet-by-countries/${country}/${year}`;

    let diet = $state(null);
    let message = $state('');
    let messageType = $state('success');

    onMount(async () => {
        const res = await fetch(API);
        if (res.ok) {
            diet = await res.json();
        } else {
            message = `No se encontró el registro de '${country}' para el año ${year}.`;
            messageType = 'danger';
        }
    });

    async function guardar() {
        const res = await fetch(API, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diet)
        });
        if (res.ok) {
            message = `Registro de '${country}' (${year}) actualizado correctamente.`;
            messageType = 'success';
        } else if (res.status === 400) {
            message = 'Datos incorrectos. Revisa los campos.';
            messageType = 'danger';
        } else if (res.status === 404) {
            message = `No existe el registro de '${country}' para el año ${year}.`;
            messageType = 'danger';
        } else {
            message = 'Error al guardar. Inténtalo de nuevo.';
            messageType = 'danger';
        }
    }
</script>

<main>
    <h1>Editar registro: {country} ({year})</h1>

    {#if message}
        <div class="banner {messageType}">{message}</div>
    {/if}

    {#if diet}
        <div class="form-wrap">
            <div class="campo">
                <label>Código de país</label>
                <input type="number" bind:value={diet.country_code} />
            </div>
            <div class="campo">
                <label>Región</label>
                <input bind:value={diet.region} />
            </div>
            <div class="campo">
                <label>Coste diario dieta (USD)</label>
                <input type="number" step="0.01" bind:value={diet.cost_healthy_diet_ppp_usd} />
            </div>
            <div class="campo">
                <label>Coste anual dieta (USD)</label>
                <input type="number" step="0.01" bind:value={diet.annual_cost_healthy_diet_usd} />
            </div>
            <div class="campo">
                <label>Coste verduras/día (USD)</label>
                <input type="number" step="0.01" bind:value={diet.cost_vegetables_ppp_usd} />
            </div>
            <div class="campo">
                <label>Coste frutas/día (USD)</label>
                <input type="number" step="0.01" bind:value={diet.cost_fruits_ppp_usd} />
            </div>
            <div class="campo">
                <label>Coste total componentes (USD)</label>
                <input type="number" step="0.01" bind:value={diet.total_food_components_cost} />
            </div>
            <div class="campo">
                <label>Categoría de coste</label>
                <select bind:value={diet.cost_category}>
                    <option value="Low Cost">Coste bajo</option>
                    <option value="Medium Cost">Coste medio</option>
                    <option value="High Cost">Coste alto</option>
                </select>
            </div>

            <div class="botones">
                <button onclick={() => goto('/cost-of-healthy-diet')} class="btn-back">← Volver</button>
                <button onclick={guardar} class="btn-save">Guardar cambios</button>
            </div>
        </div>
    {/if}
</main>

<style>
    main { font-family: 'Segoe UI', sans-serif; padding: 20px; max-width: 700px; margin: 0 auto; }
    h1 { border-bottom: 2px solid #e67e22; padding-bottom: 10px; color: #2c3e50; font-size: 1.3rem; }
    .form-wrap { background: #f9f9f9; border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-top: 20px; display: flex; flex-direction: column; gap: 14px; }
    .campo { display: flex; flex-direction: column; gap: 4px; }
    label { font-size: 0.8rem; font-weight: 600; color: #555; }
    input, select { padding: 7px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9rem; }
    input:focus, select:focus { outline: none; border-color: #e67e22; }
    .botones { display: flex; justify-content: space-between; margin-top: 10px; }
    .btn-back { background: #95a5a6; color: white; border: none; padding: 9px 18px; border-radius: 4px; cursor: pointer; }
    .btn-save { background: #e67e22; color: white; border: none; padding: 9px 20px; border-radius: 4px; cursor: pointer; }
    .banner { padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; font-size: 0.9rem; }
    .banner.success { background: #f5fbf5; border: 1px solid #b6dbb6; color: #2d6a2d; }
    .banner.danger { background: #fdf6f3; border: 1px solid #e8c4b4; color: #8b3a1a; }
</style>