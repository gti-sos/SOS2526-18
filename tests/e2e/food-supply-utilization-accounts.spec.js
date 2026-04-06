import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/food-supply-utilization-accounts';

test.describe('Food Supply Utilization Accounts - E2E Tests', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        page.setDefaultTimeout(20000);
        page.setDefaultNavigationTimeout(20000);
        await page.goto(URL, { waitUntil: 'networkidle' });
    });

    test('1. Debería listar los recursos al cargar la página', async ({ page }) => {
        await expect(page.locator('.table-container table')).toBeVisible();
    });

    test('2. Debería crear un nuevo registro', async ({ page }) => {
        await page.waitForSelector('.form-container');

        await page.getByPlaceholder('41').fill('9999');
        await page.getByPlaceholder('156').fill('9999');
        await page.getByPlaceholder('China, mainland').fill('TestCountry');
        await page.getByPlaceholder('221').fill('9999');
        await page.getByPlaceholder('Almonds, in shell').fill('TestItem');
        await page.getByPlaceholder('2017').fill('2099');
        await page.getByPlaceholder('9951.89').fill('1');
        await page.getByPlaceholder('43000').fill('2');
        await page.getByPlaceholder('5497.24').fill('3');
        await page.getByPlaceholder('125.76').fill('4');
        await page.getByPlaceholder('89.23').fill('5');

        await page.locator('.btn-add').click();

        await expect(page.locator('text=/Se añadió/i')).toBeVisible({ timeout: 15000 });
    });

    test('3. Debería editar un registro', async ({ page }) => {
        await page.locator('.btn-edit').first().click();
        await page.waitForURL('**/food-supply-utilization-accounts/*/*');
        await page.waitForSelector('form input');
        await page.locator('form input').nth(0).fill('7777');
        await page.getByRole('button', { name: /Guardar Cambios/i }).click();
        await page.waitForURL('**/food-supply-utilization-accounts?updated=true');
    });

    test('4. Debería buscar por rango (si la UI lo permite)', async ({ page }) => {
        if (await page.getByPlaceholder(/Desde/i).count() > 0) {
            await page.getByPlaceholder(/Desde/i).fill('2000');
            await page.getByPlaceholder(/Hasta/i).fill('2100');
            await page.locator('.btn-search').click();
            await expect(page.locator('body')).toContainText('Encontrados');
        }
    });

    test('5. Debería borrar un registro', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator('.btn-delete').first().click();
        await expect(page.locator('text=/borrado correctamente/i')).toBeVisible({ timeout: 15000 });
    });

    test('6. Debería borrar TODO', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.locator('.btn-del').click();

        await page.waitForSelector('text=/No hay datos disponibles en la base de datos/i', { timeout: 15000 });

        await expect(
            page.locator('text=No hay datos disponibles en la base de datos.')
        ).toBeVisible();
    });

}); 