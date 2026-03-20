<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    // 1. VARIABLES GLOBALES (Estado Svelte 5)
    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

    // 2. FUNCIONES DE LÓGICA
    
    // Obtener datos de la API
    async function getCereals() {
        const res = await fetch("/api/v2/cereal-productions");
        if (res.ok) {
            const data = await res.json();
            cereals = data;
        } else {
            message = "Error al conectar con la base de datos.";
            messageType = "danger";
        }
    }

    // Cargar datos iniciales (Botón Verde)
    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Datos iniciales cargados con éxito!";
            messageType = "success";
            await getCereals();
        } else {
            message = "Aviso: Los datos ya existen o el servidor no responde.";
            messageType = "danger";
        }
    }

    // Borrar todos los registros (Botón Rojo)
    async function deleteAllCereals() {
        if (confirm("¿Estás seguro de que quieres borrar TODOS los datos?")) {
            const res = await fetch("/api/v2/cereal-productions", {
                method: "DELETE"
            });
            if (res.ok) {
                message = "Se han eliminado todos los registros correctamente.";
                messageType = "success";
                await getCereals();
            } else {
                message = "Error: No se han podido borrar los datos.";
                messageType = "danger";
            }
        }
    }

    // Carga automática al abrir
    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <section class="controls">
        <button onclick={loadInitialData} class="btn-load">
            Cargar Datos Iniciales
        </button>
        <button onclick={deleteAllCereals} class="btn-delete-all">
            Borrar todo
        </button>
    </section>

    <hr />

    <CerealForm {getCereals} bind:message bind:messageType />

    <br />

    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        padding: 40px; 
        max-width: 1200px; 
        margin: 0 auto; 
        color: #333;
    }

    h1 { 
        border-bottom: 3px solid #007bff; 
        padding-bottom: 15px; 
        margin-bottom: 30px;
        color: #2c3e50;
        text-align: center;
    }

    .controls { 
        margin-bottom: 25px; 
        display: flex;
        gap: 15px; /* Espacio elegante entre botones */
        justify-content: flex-start;
    }

    /* Estilo Botón Verde */
    .btn-load { 
        background-color: #28a745; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        font-size: 1rem;
        transition: background-color 0.3s ease, transform 0.1s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-load:hover { background-color: #218838; transform: translateY(-1px); }

    /* Estilo Botón Rojo */
    .btn-delete-all { 
        background-color: #dc3545; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        font-size: 1rem;
        transition: background-color 0.3s ease, transform 0.1s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-delete-all:hover { background-color: #c82333; transform: translateY(-1px); }

    .btn-load:active, .btn-delete-all:active { transform: translateY(0); }

    hr { 
        margin: 40px 0; 
        border: 0; 
        border-top: 2px solid #eee; 
    }
</style>