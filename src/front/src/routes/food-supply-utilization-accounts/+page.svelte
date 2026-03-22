<script>
  import { onMount } from 'svelte';
  import Message from './Message.svelte';
  import FoodForm from './FoodForm.svelte';
  import FoodTable from './FoodTable.svelte';


  let fsua = $state([]);
  let message = $state("");
  let messageType = $state("danger");

  let sCountry = $state("");   // country_name_en (texto)
  let sYear = $state("");      // year (número)
  let sItem = $state("");      // item (texto) - opcional para búsqueda exacta v1

  const BASE = "/api/v1/food-supply-utilization-accounts";

  async function getFSUA() {
    const res = await fetch(`${BASE}`);
    if (res.ok) {
      fsua = await res.json();
      sCountry = "";
      sYear = "";
      sItem = "";
      message = "";
    } else {
      message = "No se ha podido cargar la lista de datos desde el servidor.";
      messageType = "danger";
    }
  }

  async function fetchSpecific() {
    const hasCountry = !!sCountry?.trim();
    const hasYear = !!String(sYear).trim();
    const hasItem = !!sItem?.trim();

    if (hasCountry && hasYear && hasItem) {
      const url = `${BASE}/${encodeURIComponent(sCountry)}/${Number(sYear)}/${encodeURIComponent(sItem)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        fsua = [data];
        message = `Se ha localizado el registro de '${sCountry}' / ${sYear} / '${sItem}'.`;
        messageType = "success";
      } else if (res.status === 404) {
        message = `No existe ningún registro para '${sCountry}' / ${sYear} / '${sItem}'.`;
        messageType = "danger";
        fsua = [];
      } else {
        message = `Error inesperado (código ${res.status}).`;
        messageType = "danger";
      }
      return;
    }

    if (hasCountry || hasYear) {
      const params = new URLSearchParams();
      if (hasCountry) params.set("country_name_en", sCountry);
      if (hasYear) params.set("year", String(Number(sYear)));
      const res = await fetch(`${BASE}?${params.toString()}`);
      if (res.ok) {
        fsua = await res.json();
        if (fsua.length > 0) {
          message = `Búsqueda finalizada: se han encontrado ${fsua.length} registros.`;
          messageType = "success";
        } else {
          message = "No se han encontrado resultados para esa búsqueda.";
          messageType = "danger";
        }
      } else {
        message = `No se ha podido realizar la búsqueda (código ${res.status}).`;
        messageType = "danger";
      }
      return;
    }

    await getFSUA();
  }

  async function loadInitialData() {
    const res = await fetch(`${BASE}/loadInitialData`);
    if (res.ok) {
      message = "¡Éxito! Los datos de ejemplo se han cargado correctamente.";
      messageType = "success";
      await getFSUA();
    } else if (res.status === 409) {
      message = "Los datos ya estaban presentes.";
      messageType = "danger";
      await getFSUA();
    } else {
      message = "Aviso: el servidor no respondió como se esperaba al cargar iniciales.";
      messageType = "danger";
    }
  }

  async function deleteAll() {
    if (confirm("¿Estás seguro de que quieres vaciar toda la tabla?")) {
      const res = await fetch(`${BASE}`, { method: "DELETE" });
      if (res.ok) {
        message = "La tabla se ha vaciado por completo.";
        messageType = "success";
        await getFSUA();
      } else if (res.status === 404) {
        message = "No hay registros que borrar.";
        messageType = "danger";
        await getFSUA();
      } else {
        message = "Error: no se ha podido realizar la limpieza de datos.";
        messageType = "danger";
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
      <button onclick={loadInitialData} class="btn-load">Cargar iniciales</button>
      <button onclick={deleteAll} class="btn-del">Borrar todo</button>
    </div>

    <div class="search-container">
      <input bind:value={sCountry} placeholder="País (country_name_en)..." />
      <input bind:value={sYear} type="number" placeholder="Año..." />
      <input bind:value={sItem} placeholder="Ítem (opcional)..." />
      <button onclick={fetchSpecific} class="btn-search">Buscar</button>
      <button onclick={getFSUA} class="btn-reset">Limpiar</button>
    </div>
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
  .btn-reset { background: #6c757d; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; }
  .btn-load:hover { background: #218838; }
  .btn-del:hover { background: #c82333; }
  hr { margin: 30px 0; border: 0; border-top: 1px solid #eee; }
</style>