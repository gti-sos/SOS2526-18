<script>
    import { onMount } from 'svelte'; 
    import Message from './Message.svelte';
    import CerealForm from './CerealForm.svelte';
    import CerealTable from './CerealTable.svelte';

    // 1. VARIABLES GLOBALES (El estado de tu página)
    let cereals = []; 
    let message = "";
    let messageType = "danger"; 

    // 2. FUNCIONES DE LÓGICA (Se quedan en el script)
    
    // Trae los datos de la API para llenar la tabla
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

    // Acción del botón verde para meter datos de prueba
    async function loadInitialData() {
        const res = await fetch("/api/v2/cereal-productions/loadInitialData");
        if (res.ok) {
            message = "¡Datos iniciales cargados con éxito!";
            messageType = "success";
            await getCereals(); // Refrescamos la lista automáticamente
        } else {
            message = "Aviso: Los datos ya existen o el servidor no responde.";
            messageType = "danger";
        }
    }

    // Esto hace que nada más entrar en la web se cargue la tabla
    onMount(getCereals);
</script>

<main>
    <h1>Gestión de Producción de Cereales (JLAV)</h1>

    <Message bind:message bind:type={messageType} />

    <section class="controls">
        <button on:click={loadInitialData} class="btn-load">
            Cargar Datos Iniciales
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
        justify-content: flex-start;
    }

    .btn-load { 
        background-color: #28a745; 
        color: white; 
        padding: 12px 24px; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-weight: bold;
        font-size: 1rem;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-load:hover {
        background-color: #218838;
        transform: translateY(-1px);
    }

    .btn-load:active {
        transform: translateY(0);
    }

    hr { 
        margin: 40px 0; 
        border: 0; 
        border-top: 2px solid #eee; 
    }

    br {
        margin-bottom: 20px;
    }
</style>