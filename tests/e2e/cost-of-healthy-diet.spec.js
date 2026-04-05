import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/cost-of-healthy-diet';

test.describe('Cost of Healthy Diet E2E Tests (NVD)', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        await page.goto(URL, { waitUntil: 'networkidle' });
        // Espera a que desaparezca la pantalla de Render y cargue tu app
        await page.waitForSelector('table', { timeout: 90000 });
    });

    test('1. Debería listar los recursos al cargar la página', async ({ page }) => {
        await expect(page.locator('table').last()).toBeVisible();
    });

    test('2. Debería crear un nuevo recurso', async ({ page }) => {
        await page.waitForSelector('.form-wrap');

        await page.getByPlaceholder('Ej: 724').fill('998');
        await page.getByPlaceholder('Ej: Spain').fill('TestCountry2');
        await page.getByPlaceholder('Ej: Europe').fill('TestRegion2');
        await page.getByPlaceholder('Ej: 2023').fill('2099');
        await page.getByPlaceholder('Ej: 2.75').fill('3.50');
        await page.getByPlaceholder('Ej: 1003.75').fill('1277.50');
        await page.getByPlaceholder('Ej: 0.71').fill('0.80');
        await page.getByPlaceholder('Ej: 0.67').fill('0.75');
        await page.getByPlaceholder('Ej: 1.52').fill('1.55');
        await page.locator('select#f-cat').selectOption('Low Cost');

        await page.locator('.btn-add').click();

        await expect(page.locator('body')).toContainText('añadido correctamente', { timeout: 15000 });
    });

    test('3. Debería buscar por país', async ({ page }) => {
        // Aseguramos que hay datos antes de buscar
        await page.locator('.btn-load').click();
        await page.waitForTimeout(2000); // damos tiempo a que cargue

        await page.getByPlaceholder('País...').fill('Spain');
        await page.getByRole('button', { name: 'Buscar' , exact: true }).click();
        await expect(page.locator('body')).toContainText('encontrado', { timeout: 15000 });
    });

    test('4. Debería buscar por país y año exactos', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator('.btn-del').click();
        await page.waitForTimeout(1000);
        await page.locator('.btn-load').click();
        await page.waitForTimeout(2000);
        
        await page.getByPlaceholder('País...').fill('Spain');
        await page.getByPlaceholder('Año...', { exact:true}).fill('2020');
        await page.getByRole('button', {name: 'Buscar', exact:true }).click();
        await expect(page.locator('body')).toContainText('encontrado', { timeout: 15000 });
    });


    test('7. Debería borrar un recurso', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator('.btn-delete').first().click();
        await expect(page.locator('body')).toContainText('eliminado correctamente', { timeout: 15000 });
    });

    test('8. Debería borrar todos los registros', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator('.btn-del').click();
        await expect(page.locator('body')).toContainText('eliminado todos los registros', { timeout: 15000 });
    });

});