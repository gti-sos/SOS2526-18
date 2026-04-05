import { test, expect } from '@playwright/test';

const URL = 'https://sos2526-18.onrender.com/food-supply-utilization-accounts';

test.describe('Food Supply Utilization Accounts - E2E Tests', () => {

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        await page.goto(URL, { waitUntil: 'networkidle' });
    });

    // 1) LISTAR
    test('1. Debería listar los recursos al cargar la página', async ({ page }) => {
        await expect(page.locator('.table-container table')).toBeVisible();
    });

    // 2) CREAR
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

        await expect(page.locator('body')).toContainText('Se añadió', { timeout: 15000 });
    });

   test('3. Debería editar un registro', async ({ page }) => {
    const editBtn = page.locator('.btn-edit').first();
    await editBtn.click();

    // Esperar URL de edición de forma robusta
    await page.waitForURL('**/food-supply-utilization-accounts/*/*' );

    // Esperar inputs del formulario
    await page.waitForSelector('form input');

    const inputs = page.locator('form input');
    await inputs.nth(0).fill('7777');

    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Esperar la redirección
    await page.waitForURL('**/food-supply-utilization-accounts?updated=true');
});

    // 4) BUSCAR (SI EXISTE EN TU UI)
    test('4. Debería buscar por rango (si la UI lo permite)', async ({ page }) => {
        if (await page.getByPlaceholder(/Desde/i).count() > 0) {
            await page.getByPlaceholder(/Desde/i).fill('2000');
            await page.getByPlaceholder(/Hasta/i).fill('2100');
            await page.locator('.btn-search').click();
            await expect(page.locator('body')).toContainText('Encontrados');
        }
    });

    // 5) BORRAR UNO
    test('5. Debería borrar un registro', async ({ page }) => {

        page.on('dialog', dialog => dialog.accept());

        const delBtn = page.locator('.btn-delete').first();
        await delBtn.click();

        await expect(page.locator('body')).toContainText('Borrado correctamente', { timeout: 15000 });
    });

    test('6. Debería borrar TODO', async ({ page }) => {



    await page.locator('.btn-del').click();
    
    page.on('dialog', dialog => dialog.accept());

    console.log(await page.locator('body').innerHTML());

    await page.locator('.btn-del').click();

    await expect(
     page.locator('text=No hay datos disponibles en la base de datos.')
    ).toBeVisible();
});

});