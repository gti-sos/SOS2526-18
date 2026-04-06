import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/cereal-productions';

test.describe('Cereal Productions E2E Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        // Aumentamos el timeout porque Render (donde está la web) puede tardar en "despertar"
        test.setTimeout(120000); 
        await page.goto(URL, { waitUntil: 'networkidle' });
    });

    test('1. Debería cargar y listar los recursos', async ({ page }) => {
        // 1. Miramos si la tabla está vacía
        const rows = page.locator('table tbody tr');
        
        // 2. Si no hay filas (o solo está el mensaje de "No hay datos"), cargamos
        if (await rows.count() <= 1) { 
            await page.locator('.btn-load').click();
            // Esperamos a que aparezca al menos una fila real
            await expect(page.locator('.btn-edit').first()).toBeVisible({ timeout: 10000 });
        }
        
        // 3. Ahora sí, verificamos que la tabla tiene contenido
        await expect(page.locator('table').last()).toBeVisible();
        console.log("Datos listados correctamente.");
    });

    test('2. Debería crear un nuevo recurso', async ({ page }) => {
        // Esperamos a que el formulario esté listo antes de escribir
        await page.waitForSelector('.form-container', { state: 'visible' });

        await page.getByPlaceholder('Ej: Spain').fill('TestCountry');
        await page.getByPlaceholder('ESP').fill('TST');
        await page.getByPlaceholder('2024').fill('2099');
        
        const createRowInputs = page.locator('.create-row input');
        await createRowInputs.nth(3).fill('10');  // land_used
        await createRowInputs.nth(4).fill('20');  // cereal_production
        await createRowInputs.nth(5).fill('1');   // cereal_yield
        await createRowInputs.nth(6).fill('100'); // population

        await page.locator('.btn-add').click();

        // Verificamos mensaje de éxito
        await expect(page.locator('body')).toContainText('Se ha añadido correctamente', { timeout: 15000 });
    });

    test('3. Debería editar un recurso', async ({ page }) => {      
        // Buscamos el primer botón de editar y esperamos a que sea clicable
        const editBtn = page.locator('.btn-edit').first();
        await editBtn.waitFor({ state: 'visible' });
        await editBtn.click();

        // ESPERA CLAVE 1: Esperar a que la URL cambie a la de edición
        await expect(page).toHaveURL(/.*\/[a-zA-Z0-9]+\/\d+/, { timeout: 15000 });

        // ESPERA CLAVE 2: Esperar a que los inputs del formulario de edición aparezcan
        const firstInput = page.locator('input[type="number"]').first();
        await firstInput.waitFor({ state: 'visible' });

        // ESPERA CLAVE 3: Asegurarse de que el input NO esté vacío (indica que los datos de la API ya cargaron)
        await expect(firstInput).not.toHaveValue('', { timeout: 10000 });

        await firstInput.fill('888');
        await page.getByRole('button', { name: /Guardar/i }).click(); 

        // Verificamos tu mensaje de éxito
        await expect(page.locator('body')).toContainText('actualizado correctamente', { timeout: 15000 });
    });

    test('4. Debería buscar por rango (Apartado 6)', async ({ page }) => {
        await page.getByPlaceholder(/Desde/i).fill('2000');  
        await page.getByPlaceholder(/Hasta/i).fill('2100');
        await page.locator('.btn-search').click();

        // Verificamos que aparezca el texto de resultados encontrados
        await expect(page.locator('body')).toContainText('Encontrados', { timeout: 15000 });
    });

    test('5. Debería borrar un recurso', async ({ page }) => {
        // Manejador del confirm de JS
        page.on('dialog', dialog => dialog.accept());
        
        const delBtn = page.locator('.btn-delete').first();
        await delBtn.waitFor({ state: 'visible' });
        await delBtn.click();
        
        await expect(page.locator('body')).toContainText('eliminado correctamente', { timeout: 15000 });
    });
        
    test('6. Debería borrar TODO', async ({ page }) => { 
        page.on('dialog', dialog => dialog.accept());    
        
        const delAllBtn = page.locator('.btn-del');
        await delAllBtn.waitFor({ state: 'visible' });
        await delAllBtn.click();
        
        await expect(page.locator('body')).toContainText('Datos borrados', { timeout: 15000 });
    });
});