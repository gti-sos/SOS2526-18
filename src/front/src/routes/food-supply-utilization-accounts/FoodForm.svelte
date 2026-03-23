<script>
  let { 
    getFSUA, 
    message = $bindable(""), 
    messageType = $bindable("danger") 
  } = $props();

  let nuevo = $state({
    faostat: "",
    m49_code: "",
    country_name_en: "",
    item_code: "",
    item: "",
    year: "",
    opening_stocks_tonnes: "",
    production_tonnes: "",
    import_quantity_tonnes: "",
    stock_variation_tonnes: "",
    export_quantity_tonnes: ""
  });

  async function crearRegistro() {
    message = "";
    const body = {
      faostat: Number(nuevo.faostat),
      m49_code: Number(nuevo.m49_code),
      country_name_en: (nuevo.country_name_en ?? "").trim(),
      item_code: Number(nuevo.item_code),
      item: (nuevo.item ?? "").trim(),
      year: Number(nuevo.year),
      opening_stocks_tonnes: Number(nuevo.opening_stocks_tonnes),
      production_tonnes: Number(nuevo.production_tonnes),
      import_quantity_tonnes: Number(nuevo.import_quantity_tonnes),
      stock_variation_tonnes: Number(nuevo.stock_variation_tonnes),
      export_quantity_tonnes: Number(nuevo.export_quantity_tonnes)
    };

    const res = await fetch("/api/v2/food-supply-utilization-accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      message = `¡Éxito! Se añadió ${body.country_name_en} / ${body.year} / ${body.item}.`;
      messageType = "success";
      Object.keys(nuevo).forEach(k => (nuevo[k] = ""));
      await getFSUA?.();
    } else {
      messageType = "danger";
      if (res.status === 409)       message = `Conflicto: ya existe ${body.country_name_en} / ${body.year} / ${body.item}.`;
      else if (res.status === 400)  message = "Error en los datos: revisa que los campos requeridos sean correctos.";
      else if (res.status === 500)  message = "Error interno: el servidor ha fallado. Inténtalo más tarde.";
      else                          message = `Error inesperado: código ${res.status}.`;
    }
  }
</script>

<div class="form-container">
  <h3>Añadir nuevo registro</h3>
  <table>
    <thead>
      <tr>
        <th>FAOSTAT</th><th>Cód. M49</th><th>País (en inglés)</th><th>Cód. ítem</th>
        <th>Ítem</th><th>Año</th><th>Stock inicial (t)</th><th>Producción (t)</th>
        <th>Importación (t)</th><th>Variación stock (t)</th><th>Exportación (t)</th><th>Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr class="create-row">
        <td><input bind:value={nuevo.faostat} type="number" placeholder="41" /></td>
        <td><input bind:value={nuevo.m49_code} type="number" placeholder="156" /></td>
        <td><input bind:value={nuevo.country_name_en} placeholder="China, mainland" /></td>
        <td><input bind:value={nuevo.item_code} type="number" placeholder="221" /></td>
        <td><input bind:value={nuevo.item} placeholder="Almonds, in shell" /></td>
        <td><input bind:value={nuevo.year} type="number" placeholder="2017" /></td>
        <td><input bind:value={nuevo.opening_stocks_tonnes} type="number" step="any" placeholder="9951.89" /></td>
        <td><input bind:value={nuevo.production_tonnes} type="number" step="any" placeholder="43000" /></td>
        <td><input bind:value={nuevo.import_quantity_tonnes} type="number" step="any" placeholder="5497.24" /></td>
        <td><input bind:value={nuevo.stock_variation_tonnes} type="number" step="any" placeholder="125.76" /></td>
        <td><input bind:value={nuevo.export_quantity_tonnes} type="number" step="any" placeholder="89.23" /></td>
        <td><button class="btn-add" onclick={crearRegistro}>Añadir</button></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .form-container { background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px; }
  h3 { margin-top: 0; color: #0056b3; font-family: sans-serif; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-family: sans-serif; font-size: 0.9rem; }
  input { width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; }
  .btn-add { background-color: #007bff; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold; }
  .btn-add:hover { background-color: #0056b3; }
  .create-row { background-color: #eef7ff; }
</style>
``