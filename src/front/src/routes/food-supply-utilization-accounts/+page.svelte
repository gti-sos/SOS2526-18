<script>
  import { onMount } from 'svelte';
  import Message from './Message.svelte';
  import FoodForm from './FoodForm.svelte';
  import FoodTable from './FoodTable.svelte';

  let fsua = $state([]);
  let message = $state("");
  let messageType = $state("danger");

  let sCountry = $state("");
  let sYear = $state("");
  let sYearFrom = $state("");
  let sYearTo = $state("");

  let sFaostat = $state("");
  let sM49 = $state("");
  let sItemCode = $state("");
  let sItem = $state("");
  let sOpening = $state("");
  let sProduction = $state("");
  let sImport = $state("");
  let sStockVariation = $state("");
  let sExport = $state("");

  let limit = 5;
  let offset = 0;
  let total = 0;

  const BASE = "/api/v2/food-supply-utilization-accounts";

  let lastMsgId = 0;
  function showMessage(text, type = "success", timeoutMs = 5000) {
    const id = ++lastMsgId;
    message = text;
    messageType = type;
    if (timeoutMs > 0) {
      setTimeout(() => {
        if (id === lastMsgId) message = "";
      }, timeoutMs);
    }
  }


async function fetchFSUA(showSearchMessage = false) {
  const params = new URLSearchParams();

  const addParam = (key, value) => {
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      params.set(key, value);
    }
  };

  addParam("country_name_en", sCountry);
  addParam("year", sYear);
  addParam("from", sYearFrom);
  addParam("to", sYearTo);
  addParam("faostat", sFaostat);
  addParam("m49_code", sM49);
  addParam("item_code", sItemCode);
  addParam("item", sItem);
  addParam("opening_stocks_tonnes", sOpening);
  addParam("production_tonnes", sProduction);
  addParam("import_quantity_tonnes", sImport);
  addParam("stock_variation_tonnes", sStockVariation);
  addParam("export_quantity_tonnes", sExport);

  params.set("limit", limit);
  params.set("offset", offset);

  const res = await fetch(`${BASE}?${params.toString()}`);

  if (!res.ok) {
    showMessage(`Error (código ${res.status})`, "danger", 6000);
    return;
  }

  const data = await res.json();
  fsua = data.data || data;
  total = data.total ?? fsua.length;

 
  if (showSearchMessage) {
    if (fsua.length > 0) {
      showMessage(`Encontrados ${fsua.length} registros.`, "success");
    } else {
      showMessage("No se encontraron resultados.", "danger", 4000);
    }
  }
}


  async function getFSUA() {
    offset = 0;
    await fetchFSUA();
  }

  function nextPage() {
    offset += limit;
    fetchFSUA();
  }

  function prevPage() {
    if (offset >= limit) {
      offset -= limit;
      fetchFSUA();
    }
  }

  async function loadInitialData() {
    const res = await fetch(`${BASE}/loadInitialData`);
    if (res.ok) {
      await getFSUA();
      showMessage("Datos iniciales cargados.", "success");
    } else if (res.status === 409) {
      await getFSUA();
      showMessage("Los datos ya estaban cargados.", "danger");
    } else {
      showMessage("Error inesperado.", "danger");
    }
  }

  async function deleteAll() {
    if (confirm("¿Vaciar toda la tabla?")) {
      const res = await fetch(BASE, { method: "DELETE" });
      if (res.ok) {
        await getFSUA();
        showMessage("Tabla vaciada.", "success");
      } else {
        showMessage("Error al borrar.", "danger");
      }
    }
  }
  function clearSearch() {
  // Campos de búsqueda principales
  sCountry = "";
  sYear = "";
  sYearFrom = "";
  sYearTo = "";

  // Campos adicionales
  sFaostat = "";
  sM49 = "";
  sItemCode = "";
  sItem = "";
  sOpening = "";
  sProduction = "";
  sImport = "";
  sStockVariation = "";
  sExport = "";

  // Reset de paginación
  offset = 0;

  // Recargar datos sin filtros
  fetchFSUA();

  // Mensaje opcional
  showMessage("Filtros limpiados.", "success", 3000);
}

  onMount(getFSUA);
</script>

<main>
  <h1>Food Supply Utilization Accounts (FSUA)</h1>

  <Message bind:message bind:type={messageType} />

  <div class="top-bar">
    <div class="main-btns">
      <button on:click={loadInitialData} class="btn-load">Cargar iniciales</button>
      <button on:click={deleteAll} class="btn-del">Borrar todo</button>
    </div>

<div class="search-container" style="flex-wrap: wrap;">

  <div style="display: flex; gap: 8px; flex-wrap: wrap; width: 100%;">
    <input bind:value={sCountry} placeholder="País (country_name_en)..." />
    <input bind:value={sYear} type="number" placeholder="Año exacto..." />
    <input bind:value={sYearFrom} type="number" placeholder="Desde año..." />
    <input bind:value={sYearTo} type="number" placeholder="Hasta año..." />
  </div>

  <div style="display: flex; gap: 8px; flex-wrap: wrap; width: 100%; margin-top: 5px;">
    <input bind:value={sFaostat} type="number" placeholder="faostat..." />
    <input bind:value={sM49} type="number" placeholder="m49_code..." />
    <input bind:value={sItemCode} type="number" placeholder="item_code..." />
    <input bind:value={sItem} placeholder="item..." />

    <input bind:value={sOpening} type="number" placeholder="opening_stocks_tonnes..." />
    <input bind:value={sProduction} type="number" placeholder="production_tonnes..." />
    <input bind:value={sImport} type="number" placeholder="import_quantity_tonnes..." />
    <input bind:value={sStockVariation} type="number" placeholder="stock_variation_tonnes..." />
    <input bind:value={sExport} type="number" placeholder="export_quantity_tonnes..." />
  </div>

  <button on:click={fetchFSUA(true)} class="btn-search">Buscar</button>
  <button on:click={clearSearch} class="btn-reset">Limpiar</button>

</div>

  </div>

  <FoodForm {getFSUA} bind:message bind:messageType />
  <hr />
  <FoodTable {fsua} {getFSUA} bind:message bind:messageType />

  <div style="margin-top: 15px; display: flex; gap: 10px;">
    <button on:click={prevPage} class="btn-search" disabled={offset === 0}>
      ⟵ Anterior
    </button>

    <button on:click={nextPage} class="btn-search" disabled={fsua.length < limit}>
      Siguiente ⟶
    </button>
  </div>
</main>

<style>
  main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; color: #2c3e50; }
  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    gap: 15px;
    align-items: center;
    background: #fdfdfd;
    padding: 10px;
    border-radius: 8px;
  }
  .main-btns { display: flex; gap: 10px; }
  .search-container {
    display: flex;
    gap: 8px;
    background: #f1f3f5;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #dee2e6;
  }
  .search-container input { border: 1px solid #ced4da; padding: 6px; border-radius: 4px; width: 160px; }
  .btn-load { background: #28a745; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
  .btn-del { background: #dc3545; color: white; border: none; padding: 10px 18px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s; }
  .btn-search { background: #007bff; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
  .btn-reset { background: #6c757d; color: white; border: none; padding: 6px 15px; border-radius: 4px; }
  .btn-load:hover { background: #218838; }
  .btn-del:hover { background: #c82333; }
  hr { margin: 30px 0; border: 0; border-top: 1px solid #eee; }
</style>