<script>
    let miNombre = "JLAV"; 
</script>

<main class="container">
    <header>
        <h1>Índice de Integraciones</h1>
        <hr />
    </header>

    <section class="author-section">
        <div class="author-header">
            <h2>Integraciones de {miNombre}</h2>
        </div>
        
        <div class="grid">
            <a href="/integrations/G13JLAVIntegration" class="card my-card">
                <h3>Integración G13</h3>
                <p>Cereales (G18) + Exportaciones (G13)</p>
            </a>

            <a href="/integrations/G15JLAVIntegration" class="card my-card">
                <h3>Integración G15</h3>
                <p>Cereales (G18) + Densidad (G15)</p>
            </a>

            <a href="/integrations/G21JLAVIntegration" class="card my-card">
                <h3>Integración G21</h3>
                <p>Cereales (G18) + Sida (G21)</p>
            </a>

             <a href="/integrations/externa1JLAVIntegration" class="card my-card">
                <h3>Integración Externa 1</h3>
                <p>Cereales (G18) + Rest Countries(Europa)</p>
            </a>

            <a href="/integrations/externa2JLAVIntegration" class="card my-card">
                <h3>Integración Externa 2</h3>
                <p>Cereales (G18) + World Bank</p>
            </a>

            <div class="card pending external-slot">
                <h3>Integración Externa 3</h3>
                <p>Pendiente de desarrollar</p>
                <span class="status">Hueco 3 (JLAV)</span>
            </div>
        </div>
    </section>

    <section class="author-section">
        <div class="author-header">
            <h2>Integraciones de Compañeros</h2>
        </div>
        <div class="grid">
            <div class="card pending">
                <h3>Integración Compañero 1</h3>
                <p>Espacio reservado</p>
            </div>
            <div class="card pending">
                <h3>Integración Compañero 2</h3>
                <p>Espacio reservado</p>
            </div>
            <div class="card pending">
                <h3>Integración Compañero 3</h3>
                <p>Espacio reservado</p>
            </div>
        </div>
    </section>

    <div class="footer">
        <a href="/" class="btn-back">Volver al Inicio</a>
    </div>
</main>

<style>
    .container {
        font-family: 'Segoe UI', system-ui, sans-serif;
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 20px;
        color: #2d3748;
    }
    header { text-align: center; margin-bottom: 50px; }
    h1 { font-size: 2.8rem; color: #1a202c; }
    
    .author-section {
        margin-bottom: 60px;
        padding: 25px;
        background: #f8fafc;
        border-radius: 15px;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }

    .author-header {
        border-bottom: 3px solid #cbd5e0;
        margin-bottom: 25px;
        padding-bottom: 10px;
    }

    h2 { color: #2d3748; font-size: 1.7rem; margin: 0; }
    
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        min-height: 140px;
        transition: all 0.3s ease;
    }

    /* Tu integración principal */
    .my-card {
        border-top: 6px solid #48bb78;
        background: #f0fff4;
    }

    .my-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        border-color: #38a169;
    }

    /* Estilo para las externas de JLAV */
    .external-slot {
        border-top: 6px solid #ecc94b;
    }

    /* Estilo para las vacías de compañeros */
    .pending {
        border: 1px dashed #a0aec0;
        background: #edf2f7;
        opacity: 0.8;
    }

    .badge {
        background: #48bb78;
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        width: fit-content;
        margin-top: auto;
    }

    .status {
        font-size: 0.85rem;
        color: #718096;
        margin-top: auto;
        font-weight: 500;
    }

    .footer { text-align: center; margin-top: 40px; }
    .btn-back {
        display: inline-block;
        padding: 12px 30px;
        background: #2d3748;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
    }
</style>