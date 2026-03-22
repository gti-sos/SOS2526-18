<script>
  let { 
    fsua = [], 
    getFSUA, 
    message = $bindable(""), 
    messageType = $bindable("danger") 
  } = $props();

  async function deleteRecord(country, year, item) {
    const res = await fetch(`/api/v1/food-supply-utilization-accounts/${encodeURIComponent(country)}/${year}/${encodeURIComponent(item)}`, {
      method: "DELETE"
    });

    if (res.ok) {
      message = `El registro de ${country} / ${year} / ${item} ha sido eliminado correctamente.`;
      messageType = "success";
      await getFSUA?.();
    } else {
      messageType = "danger";
      if (res.status === 404) {
        message = `No existe un registro para ${country} / ${year} / ${item}.`;
      } else if (res.status === 400) {
        message = "La petición no es válida. Revisa los datos.";
      } else {
        message = `Error inesperado al intentar borrar (código ${res.status}).`;
      }
    }
  }
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>FAOSTAT</th>
        <th>Cód. M49</th>
        <th>País (en inglés)</th>
        <th>Cód. ítem</th>
        <th>Ítem</th>
        <th>Año</th>
        <th>Stock inicial (t)</th>
        <th>Producción (t)</th>
        <th>Importación (t)</th>
        <th>Variación stock (t)</th>
        <th>Exportación (t)</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each fsua as r}
        <tr>
          <td>{r.faostat}</td>
          <td>{r.m49_code}</td>
          <td>{r.country_name_en}</td>
          <td>{r.item_code}</td>
          <td>{r.item}</td>
          <td>{r.year}</td>
          <td>{r.opening_stocks_tonnes}</td>
          <td>{r.production_tonnes}</td>
          <td>{r.import_quantity_tonnes}</td>
          <td>{r.stock_variation_tonnes}</td>
          <td>{r.export_quantity_tonnes}</td>
          <td class="actions">
            <a href={`/datos/editar/${encodeURIComponent(r.country_name_en)}/${r.year}/${encodeURIComponent(r.item)}`}>
              <button class="btn-edit">Editar</button>
            </a>
            <button 
              onclick={() => deleteRecord(r.country_name_en, r.year, r.item)} 
              class="btn-delete">
              Borrar
            </button>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="12" style="text-align:center; padding:20px;">
            No hay datos disponibles en la base de datos.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container { margin-top: 20px; overflow-x: auto; font-family: sans-serif; }
  table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  th, td { padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 0.92rem; }
  th { background-color: #f8f9fa; color: #333; font-weight: 600; white-space: nowrap; }
  tr:hover { background-color: #f6f9ff; }
  .actions { white-space: nowrap; }
  .btn-edit { 
    background-color: #ffc107; 
    border: none; 
    padding: 6px 12px; 
    cursor: pointer; 
    border-radius: 4px;
    margin-right: 6px;
    font-weight: 500;
  }
  .btn-edit:hover { background-color: #e0a800; }
  .btn-delete { 
    background-color: #dc3545; 
    color: white; 
    border: none; 
    padding: 6px 12px; 
    cursor: pointer; 
    border-radius: 4px;
    font-weight: 500;
  }
  .btn-delete:hover { background-color: #c82333; }
  a { text-decoration: none; }
</style>