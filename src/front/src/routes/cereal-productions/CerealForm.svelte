<script>
    // SVELTE 5: Recibimos las funciones y variables mediante $props
    // Usamos $bindable para que el mensaje "suba" al componente padre
    let { 
        getCereals, 
        message = $bindable(""), 
        messageType = $bindable("danger") 
    } = $props();

    // SVELTE 5: Para que los inputs reaccionen, el objeto debe ser reactivo con $state
    let newCereal = $state({
        country: "",
        country_code: "",
        year: "",
        land_used: 0,
        cereal_production: 0,
        cereal_yield: 0,
        population: 0
    });

    async function createCereal() {
        message = "";

        // Conversión de tipos
        const cerealToPost = {
            country: newCereal.country,
            country_code: newCereal.country_code,
            year: parseInt(newCereal.year),
            land_used: parseFloat(newCereal.land_used),
            cereal_production: parseFloat(newCereal.cereal_production),
            cereal_yield: parseFloat(newCereal.cereal_yield),
            population: parseInt(newCereal.population)
        };

        const res = await fetch("/api/v2/cereal-productions", {
            method: "POST",
            body: JSON.stringify(cerealToPost),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            message = `¡Éxito! Se ha añadido correctamente la producción de ${cerealToPost.country} para el año ${cerealToPost.year}.`;
            messageType = "success";
            
            // Reiniciar el formulario
            newCereal.country = "";
            newCereal.country_code = "";
            newCereal.year = "";
            newCereal.land_used = 0;
            newCereal.cereal_production = 0;
            newCereal.cereal_yield = 0;
            newCereal.population = 0;
            
            await getCereals();
        } 
        else {
            messageType = "danger";
            if (res.status === 409) {
                message = `Conflicto: Ya existen datos registrados para ${cerealToPost.country} en el año ${cerealToPost.year}.`;
            } 
            else if (res.status === 400) {
                message = "Error en los datos: Revisa que los campos numéricos sean correctos.";
            } 
            else if (res.status === 500) {
                message = "Error interno: El servidor ha fallado. Inténtalo más tarde.";
            } 
            else {
                message = `Error inesperado: Código ${res.status}.`;
            }
        }
    }
</script>

<div class="form-container">
    <h3>Añadir nuevo registro</h3>
    <table>
        <thead>
            <tr>
                <th>País</th>
                <th>Código</th>
                <th>Año</th>
                <th>Uso Tierra</th>
                <th>Producción</th>
                <th>Rendimiento</th>
                <th>Población</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr class="create-row">
                <td><input bind:value={newCereal.country} placeholder="Ej: Spain"></td>
                <td><input bind:value={newCereal.country_code} placeholder="ESP"></td>
                <td><input bind:value={newCereal.year} type="number" placeholder="2024"></td>
                <td><input bind:value={newCereal.land_used} type="number"></td>
                <td><input bind:value={newCereal.cereal_production} type="number"></td>
                <td><input bind:value={newCereal.cereal_yield} type="number"></td>
                <td><input bind:value={newCereal.population} type="number"></td>
                <td><button onclick={createCereal} class="btn-add">Añadir</button></td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .form-container {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
    }
    h3 { margin-top: 0; color: #0056b3; font-family: sans-serif; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-family: sans-serif; font-size: 0.9rem; }
    input { width: 90%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
    .btn-add { 
        background-color: #007bff; 
        color: white; 
        border: none; 
        padding: 8px 15px; 
        cursor: pointer; 
        border-radius: 4px;
        font-weight: bold;
    }
    .btn-add:hover { background-color: #0056b3; }
    .create-row { background-color: #eef7ff; }
</style>