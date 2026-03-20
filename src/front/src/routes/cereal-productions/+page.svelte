<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    let cereals = $state([]); 
    let message = $state("");
    let messageType = $state("danger"); 

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
        gap: 10px; /* Esto separa los botones automáticamente */
    }

    .btn-load { 
        background-color: #28a745; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .btn-load:hover { background-color: #218838; }

    /* ESTO ES LO QUE TE FALTABA EN EL STYLE */
    .btn-delete-all { 
        background-color: #dc3545; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .btn-delete-all:hover { background-color: #c82333; }

    hr { 
        margin: 40px 0; 
        border: 0; 
        border-top: 2px solid #eee; 
    }
</style>