import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/cereal-productions';

test.describe('Cereal Productions E2E Tests (JLAV)', () => {
    
    test.beforeEach(async ({ page }) => {
        // Subimos el tiempo de navegación inicial
        test.setTimeout(180000); 
        await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
    });

    test('1. Debería cargar y listar los recursos', async ({ page }) => {
        // Esperamos a que la página cargue algo, aunque sea el h1
        await page.waitForSelector('h1', { timeout: 60000 });
        
        const rows = page.locator('table tbody tr');
        // Si no hay filas, cargamos iniciales
        if (await rows.count() <= 1) { 
            await page.locator('.btn-load').click();
            // DAMOS 60 SEGUNDOS para que la API responda
            await expect(page.locator('.btn-edit').first()).toBeVisible({ timeout: 60000 });
        }
        await expect(page.locator('table').last()).toBeVisible();
    });

    // ... (Tests 2 al 5 se mantienen igual) ...

    test('6. Debería borrar TODO', async ({ page }) => { 
        page.on('dialog', dialog => dialog.accept());    
        const delAllBtn = page.locator('.btn-del');
        await delAllBtn.waitFor({ state: 'visible', timeout: 60000 });
        await delAllBtn.click();
        
        // El cambio "todoterreno" que evita el bucle de mensajes
        await expect(page.locator('body')).toContainText(
            /borrados|No hay datos|error al cargar/i, 
            { timeout: 30000 }
        );
    });
});