import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/cereal-productions';

test.describe('Cereal Productions E2E Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000); 
        await page.goto(URL, { waitUntil: 'networkidle' });
    });

    test('1. Debería listar los recursos al cargar la página', async ({ page }) => {
        await expect(page.locator('table').last()).toBeVisible();
    }); 

    test('2. Debería crear un nuevo recurso', async ({ page }) => {
        // Esperamos a que el formulario esté listo
        await page.waitForSelector('.form-container');

        // Usamos los placeholders EXACTOS de tu CerealForm.svelte
        await page.getByPlaceholder('Ej: Spain').fill('TestCountry');
        await page.getByPlaceholder('ESP').fill('TST');
        await page.getByPlaceholder('2024').fill('2099');
        
        // Los campos numéricos que no tienen placeholder los rellenamos por orden
        // Dentro de la fila "create-row"
        const createRowInputs = page.locator('.create-row input');
        await createRowInputs.nth(3).fill('10');  // land_used
        await createRowInputs.nth(4).fill('20');  // cereal_production
        await createRowInputs.nth(5).fill('1');   // cereal_yield
        await createRowInputs.nth(6).fill('100'); // population

        // Click en el botón Añadir de ese formulario
        await page.locator('.btn-add').click();

        // Verificamos tu mensaje de éxito exacto: "¡Éxito! Se ha añadido correctamente..."
        await expect(page.locator('body')).toContainText('Se ha añadido correctamente', { timeout: 15000 });
    });

    test('3. Debería editar un recurso', async ({ page }) => {      
        const editBtn = page.locator('.btn-edit').first();
        await editBtn.scrollIntoViewIfNeeded();
        await editBtn.click();

        await expect(page).toHaveURL(/.*\/[a-zA-Z0-9]+\/\d+/);
        await page.locator('input[type="number"]').first().fill('888');
        await page.getByRole('button', { name: /Guardar/i }).click();

        // Tu mensaje de éxito en page.svelte
        await expect(page.locator('body')).toContainText('actualizado correctamente', { timeout: 15000 });
    });

    test('4. Debería buscar por rango (Apartado 6)', async ({ page }) => {
        await page.getByPlaceholder(/Desde/i).fill('2000');
        await page.getByPlaceholder(/Hasta/i).fill('2100');
        await page.locator('.btn-search').click();

        await expect(page.locator('body')).toContainText('Encontrados', { timeout: 15000 });
    });

    test('5. Debería borrar un recurso', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        const delBtn = page.locator('.btn-delete').first();
        await delBtn.click();
        await expect(page.locator('body')).toContainText('eliminado correctamente', { timeout: 15000 });
    });
       
    test('6. Debería borrar TODO', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());    
        await page.locator('.btn-del').click();
        await expect(page.locator('body')).toContainText('Datos borrados', { timeout: 15000 });
    });
});   