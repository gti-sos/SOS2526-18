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
            cereals = await res.json();
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
            message = "Aviso: Los datos ya existen.";
            messageType = "danger";
        }
    }

    async function deleteAllCereals() {
        if (confirm("¿Borrar todo?")) {
            const res = await fetch("/api/v2/cereal-productions", { method: "DELETE" });
            if (res.ok) {
                message = "Registros eliminados.";
                messageType = "success";
                await getCereals();
            }
        }
    }

    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <div class="botones-principales">
        <button onclick={loadInitialData} class="btn-verde">
            Cargar Datos Iniciales
        </button>
        <button onclick={deleteAllCereals} class="btn-rojo">
            Borrar todo
        </button>
    </div>

    <hr />

    <CerealForm {getCereals} bind:message bind:messageType />
    <br />
    <CerealTable {cereals} {getCereals} bind:message bind:messageType />
</main>

<style>
    main { 
        font-family: sans-serif; 
        padding: 30px; 
        max-width: 1200px; 
        margin: 0 auto; 
    }

    h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; text-align: center; }

    /* Estilo para que los botones salgan juntos y bonitos */
    .botones-principales { 
        display: flex; 
        gap: 10px; 
        margin: 20px 0; 
    }

    .btn-verde { 
        background-color: #28a745; 
        color: white; 
        padding: 10px 20px; 
        border: none; 
        border-radius: 5px; 
        cursor: pointer; 
        font-weight: bold; 
    }

    .btn-rojo { 
        background-color: #dc3545; 
        color: white; 
        padding: 10px 20px; 
        border: none; 
        border-radius: 5px; 
        cursor: pointer; 
        font-weight: bold; 
    }

    .btn-verde:hover { background-color: #218838; }
    .btn-rojo:hover { background-color: #c82333; }

    hr { margin: 30px 0; border: 0; border-top: 1px solid #ddd; }
</style>