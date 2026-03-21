<script>
    let { diets = [], getDiets, message = $bindable(""), messageType = $bindable("danger") } = $props();

    let confirmDelete = $state(null); // { country, year }

    async function deleteDiet(country, year) {
        try {
            const res = await fetch(`/api/v2/cost-of-healthy-diet-by-countries/${country}/${year}`, {
                method: "DELETE"
            });
            confirmDelete = null;

            if (res.ok) {
                message = `El registro de '${country}' correspondiente al año ${year} ha sido eliminado correctamente.`;
                messageType = "success";
                await getDiets();
            } else if (res.status === 404) {
                message = `No se ha encontrado ningún registro para '${country}' en el año ${year}. Es posible que ya fuese eliminado anteriormente.`;
                messageType = "danger";
            } else {
                message = `No se ha podido eliminar el registro de '${country}' (${year}). Inténtalo de nuevo más tarde.`;
                messageType = "danger";
            }
        } catch {
            confirmDelete = null;
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión e inténtalo más tarde.";
            messageType = "danger";
        }
    }

    function categoryLabel(cat) {
        if (!cat) return '—';
        if (cat.includes('Low'))    return 'Coste bajo';
        if (cat.includes('Medium')) return 'Coste medio';
        if (cat.includes('High'))   return 'Coste alto';
        return cat;
    }

    function categoryClass(cat) {
        if (!cat) return '';
        if (cat.includes('Low'))    return 'cat-low';
        if (cat.includes('Medium')) return 'cat-mid';
        return 'cat-high';
    }
</script>

{#if diets.length === 0}
    <div class="empty">
        <p class="empty-title">Sin datos disponibles</p>
        <p class="empty-sub">
            Carga los datos de ejemplo desde la parte superior o añade un nuevo registro con el formulario.
        </p>
    </div>
{:else}
    <div class="list-header-row">
        <span class="list-count">{diets.length} registro{diets.length !== 1 ? 's' : ''}</span>
        <div class="list-cols-label">
            <span>País</span>
            <span>Año</span>
            <span>Región</span>
            <span>Coste diario</span>
            <span>Coste anual</span>
            <span>Verduras</span>
            <span>Frutas</span>
            <span>Total comp.</span>
            <span>Categoría</span>
            <span></span>
        </div>
    </div>

    <div class="list">
        {#each diets as d (d.country + '-' + d.year)}
            <div class="list-item">
                <div class="item-main">
                    <span class="item-country">{d.country}</span>
                    <span class="item-year">{d.year}</span>
                    <span class="item-region">{d.region}</span>
                    <span class="item-val">${d.cost_healthy_diet_ppp_usd}</span>
                    <span class="item-val">${d.annual_cost_healthy_diet_usd}</span>
                    <span class="item-val">${d.cost_vegetables_ppp_usd}</span>
                    <span class="item-val">${d.cost_fruits_ppp_usd}</span>
                    <span class="item-val">${d.total_food_components_cost}</span>
                    <span class="item-cat {categoryClass(d.cost_category)}">
                        {categoryLabel(d.cost_category)}
                    </span>
                    <div class="item-actions">
                        {#if confirmDelete && confirmDelete.country === d.country && confirmDelete.year === d.year}
                            <span class="confirm-inline">¿Seguro?</span>
                            <button class="btn-yes" onclick={() => deleteDiet(d.country, d.year)}>Sí</button>
                            <button class="btn-no"  onclick={() => confirmDelete = null}>No</button>
                        {:else}
                            <button
                                class="btn-del"
                                onclick={() => confirmDelete = { country: d.country, year: d.year }}
                                title="Eliminar este registro"
                            >
                                Eliminar
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    /* Estado vacío */
    .empty {
        padding: 60px 0 40px;
        border-top: 2px solid #1a1a1a;
    }
    .empty-title {
        font-family: 'Libre Baskerville', Georgia, serif;
        font-size: 1.2rem;
        color: #1a1a1a;
        margin: 0 0 10px;
    }
    .empty-sub {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.88rem;
        color: #9a8b80;
        margin: 0;
        line-height: 1.7;
    }

    /* Cabecera de la lista */
    .list-header-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 2px solid #1a1a1a;
        padding: 12px 0 0;
        margin-bottom: 0;
    }

    .list-count {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        color: #c0522a;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .list-cols-label {
        display: grid;
        grid-template-columns: 2fr 0.8fr 1fr 1fr 1.2fr 0.9fr 0.9fr 1fr 1.1fr 1fr;
        gap: 8px;
        padding: 6px 12px;
        background: #f5f0eb;
        border-radius: 2px;
    }
    .list-cols-label span {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.68rem;
        font-weight: 500;
        color: #6b5e52;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    /* Lista de registros */
    .list { display: flex; flex-direction: column; }

    .list-item {
        border-bottom: 1px solid #e8e0d6;
        transition: background 0.12s;
    }
    .list-item:hover { background: #faf8f5; }

    .item-main {
        display: grid;
        grid-template-columns: 2fr 0.8fr 1fr 1fr 1.2fr 0.9fr 0.9fr 1fr 1.1fr 1fr;
        gap: 8px;
        align-items: center;
        padding: 14px 12px;
    }

    .item-country {
        font-family: 'Libre Baskerville', Georgia, serif;
        font-size: 0.92rem;
        font-weight: 700;
        color: #1a1a1a;
    }

    .item-year {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.88rem;
        color: #4a3f35;
        font-weight: 500;
    }

    .item-region {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        color: #6b5e52;
    }

    .item-val {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        color: #1a1a1a;
        font-variant-numeric: tabular-nums;
    }

    .item-cat {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 3px 8px;
        border-radius: 2px;
        display: inline-block;
        width: fit-content;
        letter-spacing: 0.02em;
    }
    .cat-low  { background: #eaf6ea; color: #2d6a2d; }
    .cat-mid  { background: #fef9ec; color: #7a5c10; }
    .cat-high { background: #fdf0ec; color: #8b3a1a; }

    .item-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        justify-content: flex-end;
    }

    .confirm-inline {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        color: #8b3a1a;
    }

    .btn-del {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        background: none;
        border: 1px solid #e8d8d0;
        color: #c0522a;
        padding: 5px 12px;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color 0.15s, background 0.15s;
    }
    .btn-del:hover { border-color: #c0522a; background: #fdf0ec; }

    .btn-yes {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        background: #c0522a;
        color: #fff;
        border: none;
        padding: 5px 12px;
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.15s;
    }
    .btn-yes:hover { background: #a04020; }

    .btn-no {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        background: none;
        border: 1px solid #c8bdb5;
        color: #6b5e52;
        padding: 5px 10px;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color 0.15s;
    }
    .btn-no:hover { border-color: #1a1a1a; }

    /* Responsive: en móvil ocultamos algunas columnas */
    @media (max-width: 900px) {
        .list-cols-label,
        .item-main {
            grid-template-columns: 2fr 0.7fr 1fr 1fr 1fr 1fr;
        }
        .item-main > :nth-child(5),
        .item-main > :nth-child(6),
        .item-main > :nth-child(7),
        .item-main > :nth-child(8),
        .list-cols-label > :nth-child(5),
        .list-cols-label > :nth-child(6),
        .list-cols-label > :nth-child(7),
        .list-cols-label > :nth-child(8) {
            display: none;
        }
    }
</style>