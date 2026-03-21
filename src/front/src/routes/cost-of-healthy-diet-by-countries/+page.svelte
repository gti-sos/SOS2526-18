<script>
    import { onMount } from 'svelte';
    import Message from './Message.svelte';
    import DietForm from './DietForm.svelte';
    import DietTable from './DietTable.svelte';

    let diets = $state([]);
    let message = $state("");
    let messageType = $state("danger");
    let loading = $state(true);
    let showConfirmDeleteAll = $state(false);

    let sCountry = $state("");
    let sYear = $state("");

    // Estadísticas calculadas
    let avgCost = $derived(
        diets.length > 0
            ? (diets.reduce((s, d) => s + (d.cost_healthy_diet_ppp_usd || 0), 0) / diets.length).toFixed(2)
            : null
    );
    let highCostCount  = $derived(diets.filter(d => d.cost_category === "High Cost").length);
    let uniqueCountries = $derived(new Set(diets.map(d => d.country)).size);

    async function getDiets() {
        loading = true;
        try {
            const res = await fetch("/api/v2/cost-of-healthy-diet-by-countries");
            if (res.ok) {
                diets = await res.json();
                sCountry = "";
                sYear = "";
            } else {
                message = "No se han podido cargar los datos. Por favor, recarga la página o inténtalo más tarde.";
                messageType = "danger";
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión a internet.";
            messageType = "danger";
        }
        loading = false;
    }

    async function fetchSpecific() {
        if (!sCountry && !sYear) { await getDiets(); return; }

        loading = true;
        message = "";
        try {
            if (sCountry && sYear) {
                const res = await fetch(`/api/v2/cost-of-healthy-diet-by-countries/${sCountry}/${sYear}`);
                if (res.ok) {
                    diets = [await res.json()];
                    message = `Se ha encontrado el registro de '${sCountry}' para el año ${sYear}.`;
                    messageType = "success";
                } else if (res.status === 404) {
                    message = `No existe ningún registro para el país '${sCountry}' en el año ${sYear}.`;
                    messageType = "danger";
                    diets = [];
                } else {
                    message = "Ha ocurrido un problema al realizar la búsqueda. Inténtalo de nuevo.";
                    messageType = "danger";
                }
            } else {
                let query = "";
                if (sCountry) query += `country=${encodeURIComponent(sCountry)}&`;
                if (sYear)    query += `year=${sYear}`;
                const res = await fetch(`/api/v2/cost-of-healthy-diet-by-countries?${query}`);
                if (res.ok) {
                    diets = await res.json();
                    message = diets.length > 0
                        ? `Se han encontrado ${diets.length} registro${diets.length !== 1 ? 's' : ''}.`
                        : "No se han encontrado registros que coincidan con la búsqueda.";
                    messageType = diets.length > 0 ? "success" : "danger";
                } else {
                    message = "Ha ocurrido un problema al filtrar los datos. Inténtalo de nuevo.";
                    messageType = "danger";
                }
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión e inténtalo más tarde.";
            messageType = "danger";
        }
        loading = false;
    }

    async function loadInitialData() {
        message = "";
        try {
            const res = await fetch("/api/v2/cost-of-healthy-diet-by-countries/loadInitialData");
            if (res.ok) {
                message = "Los datos de ejemplo se han cargado correctamente en la base de datos.";
                messageType = "success";
                await getDiets();
            } else if (res.status === 409 || res.status === 400) {
                message = "Los datos de ejemplo ya estaban cargados. No es necesario volver a cargarlos.";
                messageType = "danger";
            } else {
                message = "No se han podido cargar los datos de ejemplo. Inténtalo de nuevo más tarde.";
                messageType = "danger";
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión e inténtalo más tarde.";
            messageType = "danger";
        }
    }

    async function deleteAll() {
        showConfirmDeleteAll = false;
        message = "";
        try {
            const res = await fetch("/api/v2/cost-of-healthy-diet-by-countries", { method: "DELETE" });
            if (res.ok) {
                message = "Se han eliminado todos los registros de la base de datos.";
                messageType = "success";
                await getDiets();
            } else {
                message = "No se han podido eliminar los registros. Por favor, inténtalo de nuevo.";
                messageType = "danger";
            }
        } catch {
            message = "No se ha podido conectar con el servidor. Comprueba tu conexión e inténtalo más tarde.";
            messageType = "danger";
        }
    }

    onMount(getDiets);
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div class="page">

    <!-- Franja superior de navegación -->
    <div class="topbar">
        <span class="topbar-label">SOS2526-18 · NVD</span>
        <span class="topbar-sep">|</span>
        <span class="topbar-label">API v2</span>
        <span class="topbar-spacer"></span>
        <a href="/" class="topbar-link">← Volver al inicio</a>
    </div>

    <!-- Cabecera editorial -->
    <header>
        <div class="header-top">
            <div class="header-rule"></div>
            <h1>
                Coste de la dieta saludable
                <em>por países</em>
            </h1>
            <p class="header-deck">
                Base de datos sobre el precio diario y anual de acceder a una dieta saludable
                en distintos países del mundo, desglosado por componentes alimentarios.
            </p>
            <div class="header-rule thin"></div>
        </div>

        <!-- Estadísticas en franja horizontal -->
        <div class="stats-strip">
            <div class="stat">
                <span class="stat-num">{diets.length}</span>
                <span class="stat-lbl">registros totales</span>
            </div>
            <div class="stat-div"></div>
            <div class="stat">
                <span class="stat-num">{uniqueCountries}</span>
                <span class="stat-lbl">países distintos</span>
            </div>
            <div class="stat-div"></div>
            <div class="stat">
                <span class="stat-num">{avgCost !== null ? '$' + avgCost : '—'}</span>
                <span class="stat-lbl">coste medio diario</span>
            </div>
            <div class="stat-div"></div>
            <div class="stat">
                <span class="stat-num accent">{highCostCount}</span>
                <span class="stat-lbl">registros de coste alto</span>
            </div>

            <span class="stat-spacer"></span>

            <!-- Acciones globales -->
            <button class="btn-action" onclick={loadInitialData}>
                Cargar datos de ejemplo
            </button>
            <button class="btn-action danger" onclick={() => showConfirmDeleteAll = true}>
                Eliminar todos
            </button>
        </div>
    </header>

    <!-- Banner de confirmación de borrado total -->
    {#if showConfirmDeleteAll}
        <div class="confirm-strip">
            <span class="confirm-text">
                ¿Estás seguro de que quieres eliminar <strong>todos</strong> los registros?
                Esta acción no se puede deshacer.
            </span>
            <button class="btn-yes" onclick={deleteAll}>Sí, eliminar todo</button>
            <button class="btn-no"  onclick={() => showConfirmDeleteAll = false}>Cancelar</button>
        </div>
    {/if}

    <main>
        <!-- Aviso de operación -->
        <Message bind:message bind:type={messageType} />

        <!-- Buscador -->
        <div class="search-row">
            <label class="search-lbl" for="s-country">Buscar:</label>
            <input
                id="s-country"
                bind:value={sCountry}
                placeholder="Nombre del país"
                aria-label="Filtrar por país"
            />
            <input
                bind:value={sYear}
                type="number"
                placeholder="Año"
                aria-label="Filtrar por año"
            />
            <button class="btn-search" onclick={fetchSpecific}>Buscar</button>
            <button class="btn-clear"  onclick={getDiets}>Mostrar todos</button>
        </div>

        <!-- Formulario nuevo registro -->
        <DietForm {getDiets} bind:message bind:messageType />

        <!-- Tabla / lista de datos -->
        {#if loading}
            <div class="loading-row">
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
                <span class="loading-text">Cargando registros…</span>
            </div>
        {:else}
            <DietTable {diets} {getDiets} bind:message bind:messageType />
        {/if}
    </main>

    <footer>
        <span>Producción de datos: Nazaret Villalba Delgado · SOS2526-18</span>
    </footer>
</div>

<style>
    :global(*, *::before, *::after) { box-sizing: border-box; }
    :global(body) {
        margin: 0;
        background: #ffffff;
        color: #1a1a1a;
    }

    .page {
        min-height: 100vh;
        background: #fff;
        display: flex;
        flex-direction: column;
    }

    /* ── Topbar ── */
    .topbar {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 48px;
        background: #1a1a1a;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #c8bdb5;
    }
    .topbar-sep   { color: #4a3f35; }
    .topbar-spacer { flex: 1; }
    .topbar-link {
        color: #c8bdb5;
        text-decoration: none;
        font-size: 0.72rem;
        letter-spacing: 0.06em;
        transition: color 0.15s;
    }
    .topbar-link:hover { color: #fff; }
    .topbar-label { color: #9a8b80; }

    /* ── Cabecera ── */
    header {
        padding: 0 48px;
        border-bottom: 1px solid #e8e0d6;
    }

    .header-top { padding: 40px 0 0; }

    .header-rule {
        height: 2px;
        background: #1a1a1a;
        margin-bottom: 24px;
    }
    .header-rule.thin {
        height: 1px;
        background: #e8e0d6;
        margin-top: 24px;
        margin-bottom: 0;
    }

    h1 {
        font-family: 'Libre Baskerville', Georgia, serif;
        font-size: clamp(1.8rem, 4vw, 3rem);
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 12px;
        line-height: 1.15;
        letter-spacing: -0.01em;
    }
    h1 em {
        font-style: italic;
        color: #c0522a;
        display: block;
    }

    .header-deck {
        font-family: 'Libre Baskerville', Georgia, serif;
        font-size: 0.95rem;
        color: #6b5e52;
        line-height: 1.75;
        margin: 0;
        max-width: 680px;
        font-style: italic;
    }

    /* ── Franja de estadísticas ── */
    .stats-strip {
        display: flex;
        align-items: center;
        gap: 0;
        padding: 18px 0;
        flex-wrap: wrap;
        row-gap: 12px;
    }

    .stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0 28px 0 0;
    }
    .stat-num {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 1;
    }
    .stat-num.accent { color: #c0522a; }
    .stat-lbl {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.68rem;
        color: #9a8b80;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .stat-div {
        width: 1px;
        height: 32px;
        background: #e8e0d6;
        margin: 0 28px 0 0;
        flex-shrink: 0;
    }

    .stat-spacer { flex: 1; }

    .btn-action {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.8rem;
        font-weight: 500;
        background: none;
        border: 1px solid #1a1a1a;
        color: #1a1a1a;
        padding: 8px 18px;
        border-radius: 2px;
        cursor: pointer;
        letter-spacing: 0.02em;
        transition: background 0.15s, color 0.15s;
        margin-left: 10px;
    }
    .btn-action:hover { background: #1a1a1a; color: #fff; }
    .btn-action.danger {
        border-color: #e8d8d0;
        color: #c0522a;
    }
    .btn-action.danger:hover { background: #c0522a; color: #fff; border-color: #c0522a; }

    /* ── Confirmación eliminar todo ── */
    .confirm-strip {
        display: flex;
        align-items: center;
        gap: 16px;
        background: #fdf6f3;
        border-bottom: 1px solid #e8c4b4;
        padding: 14px 48px;
        flex-wrap: wrap;
    }
    .confirm-text {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.88rem;
        color: #8b3a1a;
        flex: 1;
        line-height: 1.5;
    }
    .btn-yes {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        background: #c0522a;
        color: #fff;
        border: none;
        padding: 8px 18px;
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.15s;
    }
    .btn-yes:hover { background: #a04020; }
    .btn-no {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        background: none;
        border: 1px solid #c8bdb5;
        color: #6b5e52;
        padding: 8px 14px;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color 0.15s;
    }
    .btn-no:hover { border-color: #1a1a1a; }

    /* ── Main ── */
    main {
        padding: 36px 48px 60px;
        flex: 1;
    }

    /* ── Buscador ── */
    .search-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 32px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e8e0d6;
        flex-wrap: wrap;
    }

    .search-lbl {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        font-weight: 500;
        color: #6b5e52;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        flex-shrink: 0;
    }

    .search-row input {
        border: none;
        border-bottom: 1.5px solid #c8bdb5;
        background: transparent;
        padding: 7px 4px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        color: #1a1a1a;
        min-width: 140px;
        transition: border-color 0.15s;
        border-radius: 0;
    }
    .search-row input:focus { outline: none; border-bottom-color: #c0522a; }
    .search-row input::placeholder { color: #c8bdb5; }

    .btn-search {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        background: #1a1a1a;
        color: #fff;
        border: none;
        padding: 9px 20px;
        border-radius: 2px;
        cursor: pointer;
        letter-spacing: 0.02em;
        transition: background 0.15s;
    }
    .btn-search:hover { background: #c0522a; }

    .btn-clear {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        background: none;
        border: 1px solid #c8bdb5;
        color: #6b5e52;
        padding: 8px 16px;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color 0.15s, color 0.15s;
    }
    .btn-clear:hover { border-color: #1a1a1a; color: #1a1a1a; }

    /* ── Cargando ── */
    .loading-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 40px 0;
    }
    .loading-dot {
        width: 6px;
        height: 6px;
        background: #c0522a;
        border-radius: 50%;
        animation: pulse 1.2s ease-in-out infinite;
    }
    .loading-dot:nth-child(2) { animation-delay: 0.2s; }
    .loading-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50%       { opacity: 1;   transform: scale(1); }
    }
    .loading-text {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        color: #9a8b80;
        margin-left: 8px;
    }

    /* ── Footer ── */
    footer {
        border-top: 1px solid #e8e0d6;
        padding: 16px 48px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.72rem;
        color: #c8bdb5;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
        .topbar, header, main, .confirm-strip, footer { padding-left: 20px; padding-right: 20px; }
        h1 { font-size: 1.8rem; }
        .stats-strip { gap: 0; }
        .stat { padding-right: 16px; }
        .stat-div { margin-right: 16px; }
        .btn-action { margin-left: 0; }
    }
</style>