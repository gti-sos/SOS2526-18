<script>
    const members = [
        {
            name: "Jose Luis Alcon Del Villar",
            data: "cereal-productions",
            api: "/api/v2/cereal-productions",
            frontend: "/cereal-productions",
            postman: "https://documenter.getpostman.com/view/52314819/2sBXihrDdQ"
        },
        {
            name: "Nazaret Villalba Delgado",
            data: "cost-of-healthy-diet-by-countries",
            api: "/api/v1/cost-of-healthy-diet-by-countries",
            frontend: "/cost-of-healthy-diet",
            postman: "https://documenter.getpostman.com/view/52413337/2sBXigKYBy"
        },
        {
            name: "Manuel Castro Sánchez",
            data: "food-supply-utilization-accounts",
            api: "/api/v1/food-supply-utilization-accounts",
            frontend: "/food-supply-utilization-accounts",
            postman: "https://documenter.getpostman.com/view/52349546/2sBXigMDpj"
        }
    ];
 
    const githubUrl = "https://github.com/gti-sos/SOS2526-18";
</script>

<main class="container">
    <h1>SOS2526-18 - Portal de Grupo</h1>
    <p>Proyecto enfocado en producciones de cereales, utilización de suministros alimentarios y coste de dietas saludables.</p>
    
    <div class="repo-link">
        <a href={githubUrl} target="_blank">Enlace al Repositorio de GitHub</a>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Miembro</th>
                <th>Fuente de Datos</th>
                <th>Frontend</th>
                <th>API (v1/v2)</th>
                <th>Documentación</th>
            </tr>
        </thead>
        <tbody>
            {#each members as m}
                <tr>
                    <td>{m.name}</td>
                    <td><code>{m.data}</code></td>
                    <td><a href={m.frontend}>Ir al Frontend</a></td>
                    <td><a href={m.api} target="_blank">Ver API</a></td>
                    <td><a href={m.postman} target="_blank">Postman</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
    .container {
        font-family: sans-serif;
        padding: 40px;
        text-align: center;
    }
    .table {
        margin: 20px auto;
        border-collapse: collapse;
        width: 90%;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
    }
    th { background-color: #f4f4f4; }
    .repo-link { margin: 20px; font-weight: bold; }
    code { background: #eee; padding: 2px 4px; }
</style>