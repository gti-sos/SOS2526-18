import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/cereal-productions';

test.describe('Cereal Productions E2E Tests (JLAV)', () => {
    
    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000); 
        await page.goto(URL, { waitUntil: 'networkidle' });
    });

    test('1. Debería cargar y listar los recursos', async ({ page }) => {
        const rows = page.locator('table tbody tr');
        if (await rows.count() <= 1) { 
            await page.locator('.btn-load').click();
            await expect(page.locator('.btn-edit').first()).toBeVisible({ timeout: 25000 });
        }
        await expect(page.locator('table').last()).toBeVisible();
    });

    test('2. Debería crear un nuevo recurso', async ({ page }) => {
        const form = page.locator('.create-row');
        await form.waitFor({ state: 'visible' });
        
        const randomYear = Math.floor(Math.random() * (2100 - 2050 + 1)) + 2050;

        const inputs = form.locator('input');
        await inputs.nth(0).fill('TestCountry'); 
        await inputs.nth(1).fill('TST');         
        await inputs.nth(2).fill(randomYear.toString()); 
        await inputs.nth(3).fill('100');         
        await inputs.nth(4).fill('500');         
        await inputs.nth(5).fill('5');           
        await inputs.nth(6).fill('1000');        

        await page.locator('.btn-add').click();
        // FLEXIBLE: Acepta cualquier variante de "correctamente"
        await expect(page.locator('body')).toContainText(/correctamente/i, { timeout: 20000 });
    });

    test('3. Debería editar un recurso', async ({ page }) => {      
        const editBtn = page.locator('.btn-edit').first();
        if (!await editBtn.isVisible()) {
            await page.locator('.btn-load').click();
            await editBtn.waitFor({ state: 'visible' });
        }
        await editBtn.click();

        await expect(page).toHaveURL(/.*\/[a-zA-Z0-9]+\/\d+/, { timeout: 15000 });
        const firstInput = page.locator('input[type="number"]').first();
        await firstInput.waitFor({ state: 'visible' });
        await firstInput.fill('888');
        
        await page.locator('button:has-text("Guardar")').click();
        // FLEXIBLE: Acepta "actualizado", "Actualizado", etc.
        await expect(page.locator('body')).toContainText(/actualizado/i, { timeout: 40000 });
    });

    test('4. Debería buscar por país', async ({ page }) => {
        const searchInput = page.locator('.search-container input').first();
        await searchInput.waitFor({ state: 'visible' });
        
        await searchInput.fill('TestCountry');
        await page.locator('.btn-search').click();

        await expect(page.locator('body')).toContainText(/Encontrados|registros|encontrado/i, { timeout: 20000 });
    });

    test('5. Debería borrar un recurso', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        const delBtn = page.locator('.btn-delete').first();
        if (await delBtn.isVisible()) {
            await delBtn.click();
            // FLEXIBLE: Acepta "eliminado", "Eliminado", etc.
            await expect(page.locator('body')).toContainText(/eliminado/i, { timeout: 15000 });
        }
    });
        
    test('6. Debería borrar TODO', async ({ page }) => { 
        page.on('dialog', dialog => dialog.accept());    
        const delAllBtn = page.locator('.btn-del');
        await delAllBtn.waitFor({ state: 'visible' });
        await delAllBtn.click();
        // FLEXIBLE: Aquí está la clave, acepta /borrados/i (mayúsculas o minúsculas)
        await expect(page.locator('body')).toContainText(/borrados/i, { timeout: 15000 });
    });
});