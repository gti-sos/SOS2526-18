import { test, expect } from '@playwright/test';


const URL = 'https://sos2526-18.onrender.com/cereal-productions';
test.describe('Cereal Productions E2E Tests', () => {

    test('1. Debería listar los recursos al cargar la página', async ({ page }) => {
        await page.goto(URL);
        // Esperamos a que la tabla tenga alguna fila (ajusta el selector si es necesario)
        const rows = page.locator('table tbody tr');
        await expect(rows.first()).toBeVisible();
    });

    test('2. Debería crear un nuevo recurso', async ({ page }) => {
        await page.goto(URL);
        
        // Rellenamos el formulario (ajusta los placeholders a los tuyos)
        await page.getByPlaceholder('Ej: Spain').fill('TestCountry');
        await page.getByPlaceholder('ESP').fill('TST');
        await page.getByPlaceholder('2024').fill('2099');
        // Rellenamos el resto de campos numéricos
        const inputs = page.locator('input[type="number"]');
        await inputs.nth(1).fill('100'); // Uso Tierra
        await inputs.nth(2).fill('200'); // Producción
        await inputs.nth(3).fill('1.5'); // Rendimiento
        await inputs.nth(4).fill('1000'); // Población

        await page.getByRole('button', { name: 'Añadir' }).click();

        // Verificamos que aparece el mensaje de éxito
        await expect(page.locator('text=Se ha añadido correctamente')).toBeVisible();
    });

    test('3. Debería editar un recurso en una vista separada', async ({ page }) => {
        await page.goto(URL);
        
        // Hacemos clic en el primer botón "Editar" que encontremos
        await page.getByRole('button', { name: 'Editar' }).first().click();

        // Verificamos que la URL ha cambiado a la vista dinámica [country]/[year]
        await expect(page).toHaveURL(/.*\/[a-zA-Z]+\/\d+/);

        // Cambiamos un valor
        await page.locator('input[type="number"]').first().fill('999');
        await page.getByRole('button', { name: 'Guardar Cambios' }).click();

        // Verificamos que vuelve a la tabla y sale el mensaje de éxito del ?updated=true
        await expect(page).toHaveURL(URL + '?updated=true');
        await expect(page.locator('text=actualizado correctamente')).toBeVisible();
    });

    test('4. Debería buscar recursos por rango (Apartado 6)', async ({ page }) => {
        await page.goto(URL);
        
        // Rellenamos el rango Desde/Hasta
        await page.getByPlaceholder('Desde (año)...').fill('2000');
        await page.getByPlaceholder('Hasta (año)...').fill('2010');
        await page.getByRole('button', { name: 'Buscar' }).click();

        // Verificamos el mensaje de registros encontrados
        await expect(page.locator('text=Encontrados')).toBeVisible();
    });

    test('5. Debería borrar un recurso concreto', async ({ page }) => {
        await page.goto(URL);
        
        // Guardamos cuántas filas hay antes
        const initialRows = await page.locator('table tbody tr').count();
        
        // Escuchamos el diálogo de confirmación (si lo pusiste)
        page.on('dialog', dialog => dialog.accept());
        
        await page.getByRole('button', { name: 'Borrar' }).first().click();

        // Verificamos que el mensaje de éxito aparece
        await expect(page.locator('text=eliminado correctamente')).toBeVisible();
    });

    test('6. Debería borrar todos los recursos', async ({ page }) => {
        await page.goto(URL);
        
        // Aceptamos el confirm()
        page.on('dialog', dialog => dialog.accept());
        
        await page.getByRole('button', { name: 'Borrar todo' }).click();

        // Verificamos que la tabla está vacía o sale el mensaje de "Sin resultados"
        await expect(page.locator('text=vaciado por completo|Sin resultados')).toBeVisible();
    });
});