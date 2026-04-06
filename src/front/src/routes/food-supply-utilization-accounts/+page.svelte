<script>
  import { onMount } from 'svelte';
  import Message from './Message.svelte';
  import FoodForm from './FoodForm.svelte';
  import FoodTable from './FoodTable.svelte';

  let fsua = $state([]);
  let message = $state("");
  let messageType = $state("danger");

  let sCountry = $state("");

  // NUEVOS FILTROS
  let sYear = $state("");       // búsqueda por año específico
  let sYearFrom = $state("");   // rango desde
  let sYearTo = $state("");     // rango hasta

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

  async function getFSUA() {
    const res = await fetch(`${BASE}`);
    if (res.ok) {
      fsua = await res.json();
      sCountry = "";
      sYear = "";
      sYearFrom = "";
      sYearTo = "";
    } else {
      showMessage("No se ha podido cargar la lista de datos.", "danger", 7000);
    }
  }

  async function fetchSpecific() {

    const params = new URLSearchParams();

    if (sCountry.trim()) {
      params.set("country_name_en", sCountry.trim());
    }

    // ✅ Año específico
    if (String(sYear).trim()) {
      params.set("year", Number(sYear));
    }

    // ✅ Rango desde / hasta
    if (String(sYearFrom).trim()) {
      params.set("from", Number(sYearFrom));
    }
    if (String(sYearTo).trim()) {
      params.set("to", Number(sYearTo));
    }

    // Si no hay filtros → obtener todo
    if ([sCountry, sYear, sYearFrom, sYearTo].every(v => !String(v).trim())) {
      await getFSUA();
      return;
    }

    const res = await fetch(`${BASE}?${params.toString()}`);

    if (res.ok) {
      fsua = await res.json();
      if (fsua.length > 0) {
        showMessage(`Encontrados ${fsua.length} registros.`, "success");
      } else {
        showMessage("No se han encontrado resultados.", "danger", 7000);
      }
    } else {
      showMessage(`Error en búsqueda (código ${res.status}).`, "danger", 7000);
    }
  }

  async function loadInitialData() {
    const res = await fetch(`${BASE}/loadInitialData`);
    if (res.ok) {
      await getFSUA();
      showMessage("Datos iniciales cargados.", "success");
    } else if (res.status === 409) {
      await getFSUA();
      showMessage("Los datos ya estaban cargados.", "danger", 5000);
    } else {
      showMessage("Error inesperado al cargar datos.", "danger", 7000);
    }
  }

  async function deleteAll() {
    if (confirm("¿Vaciar toda la tabla?")) {
      const res = await fetch(`${BASE}`, { method: "DELETE" });
      if (res.ok) {
        await getFSUA();
        showMessage("Tabla vaciada.", "success");
      } else {
        showMessage("Error al borrar.", "danger", 7000);
      }
    }
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

    <div class="search-container">
  <input bind:value={sCountry} placeholder="País (country_name_en)..." />

  <input bind:value={sYear} type="number" placeholder="Año exacto..." />

  <input bind:value={sYearFrom} type="number" placeholder="Desde año..." />
  <input bind:value={sYearTo} type="number" placeholder="Hasta año..." />

  <button on:click={fetchSpecific} class="btn-search">Buscar</button>
  <button on:click={getFSUA} class="btn-reset">Limpiar</button>
</div>
``
  </div>

  <FoodForm {getFSUA} bind:message bind:messageType />
  <hr />
  <FoodTable {fsua} {getFSUA} bind:message bind:messageType />
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
``