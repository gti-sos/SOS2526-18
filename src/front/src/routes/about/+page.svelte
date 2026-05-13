<script>
    let videos = {
        jlav: "https://vimeo.com/ejemplo1",
        nvd: "https://vimeo.com/ejemplo2",
        mcs: "https://vimeo.com/ejemplo3"
    };
</script>

<main class="container">
    <h1>Videos de Presentación del Grupo</h1>

    <div class="video-grid">
        <!-- Jose Luis Alcon Del Villar -->
        <div class="card">
            <h3>Jose Luis Alcon Del Villar</h3>
            <p><strong>Recurso:</strong> <code>cereal-productions</code></p>
            <a href={videos.jlav} target="_blank" class="btn-video">Ver Vídeo</a>
        </div>
 
        <!-- Nazaret Villalba Delgado -->
        <div class="card">
            <h3>Nazaret Villalba Delgado</h3>
            <p><strong>Recurso:</strong> <code>cost-of-healthy-diet-by-countries</code></p>
            <a href={videos.nvd} target="_blank" class="btn-video">Ver Vídeo</a>
        </div> 

        <!-- Manuel Castro Sánchez -->
        <div class="card">
            <h3>Manuel Castro Sánchez</h3>
            <p><strong>Recurso:</strong> <code>food-supply-utilization-accounts</code></p>
            <a href={videos.mcs} target="_blank" class="btn-video">Ver Vídeo</a>
        </div>
    </div>

    <hr />

    <div class="footer-actions">
        <a href="/">
            <button class="btn-back">← Volver al Inicio</button>
        </a>
    </div>
</main>

<style>
    .container {
        padding: 40px;
        text-align: center;
        font-family: Arial, sans-serif;
    }

    .subtitle {
        color: #666;
        margin-bottom: 40px;
    }

    .video-grid {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }

    .card {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        width: 300px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    code {
        background: #eee;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 0.9em;
    }

    .btn-video {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }

    .btn-video:hover {
        background-color: #0056b3;
    }

    .btn-back {
        padding: 10px 25px;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-back:hover {
        background-color: #5a6268;
    }

    .footer-actions {
        margin-top: 20px;
    }
</style>