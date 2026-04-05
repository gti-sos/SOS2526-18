<script>
    let { diets = [], getDiets, message = $bindable(""), messageType = $bindable("danger") } = $props();

    async function deleteDiet(country, year) {
        const res = await fetch(`/api/v1/cost-of-healthy-diet-by-countries/${country}/${year}`, {
            method: "DELETE"
        });

        if (res.ok) {
            message = `El registro de '${country}' del año ${year} se ha eliminado correctamente.`;
            messageType = "success";
            await getDiets();
        } else if (res.status === 404) {
            message = `No existe ningún registro para '${country}' en el año ${year}.`;
            messageType = "danger";
        } else {
            message = `No se ha podido eliminar el registro de '${country}' (${year}). Inténtalo de nuevo.`;
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
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Cód.</th>
                <th>País</th>
                <th>Región</th>
                <th>Año</th>
                <th>Coste diario (PPP)</th>
                <th>Coste anual</th>
                <th>Verduras</th>
                <th>Frutas</th>
                <th>Total comp.</th>
                <th>Categoría</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each diets as d}
                <tr>
                    <td>{d.country_code}</td>
                    <td>{d.country}</td>
                    <td>{d.region}</td>
                    <td>{d.year}</td>
                    <td>{d.cost_healthy_diet_ppp_usd}</td>
                    <td>{d.annual_cost_healthy_diet_usd}</td>
                    <td>{d.cost_vegetables_ppp_usd}</td>
                    <td>{d.cost_fruits_ppp_usd}</td>
                    <td>{d.total_food_components_cost}</td>
                    <td>{categoryLabel(d.cost_category)}</td>
                    <td>
                        <a href="/cost-of-healthy-diet/{d.country}/{d.year}" class="btn-edit">Editar</a>
                        <button onclick={() => deleteDiet(d.country, d.year)} class="btn-delete">
                            Eliminar
                        </button>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="11" class="empty">No hay datos disponibles.</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container { overflow-x: auto; }
    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        font-size: 0.88rem;
    }
    th, td {
        padding: 10px 12px;
        border: 1px solid #ddd;
        text-align: left;
        white-space: nowrap;
    }
    th { background: #f5f5f5; color: #333; font-weight: 600; }
    tr:hover { background: #fafafa; }
    .empty { text-align: center; color: #999; padding: 24px; }
    .btn-delete {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.82rem;
    }
    .btn-delete:hover { background: #c0392b; }
    .btn-edit {
        background: #2980b9;
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.82rem;
        text-decoration: none;
        margin-right: 4px;
    }
</style>