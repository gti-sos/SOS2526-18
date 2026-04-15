import { test, expect } from '@playwright/test';

async function ensureAtLeastOneRecord(page) {
  const editBtn = page.locator('.btn-edit');

  if (await editBtn.count() === 0) {
    // Crear un registro mínimo
    await page.waitForSelector('.form-container');

    await page.getByPlaceholder('41').fill('9999');
    await page.getByPlaceholder('156').fill('9999');
    await page.getByPlaceholder('China, mainland').fill('AutoCountry');
    await page.getByPlaceholder('221').fill('9999');
    await page.getByPlaceholder('Almonds, in shell').fill('AutoItem');
    await page.getByPlaceholder('2017').fill('2099');
    await page.getByPlaceholder('9951.89').fill('1');
    await page.getByPlaceholder('43000').fill('2');
    await page.getByPlaceholder('5497.24').fill('3');
    await page.getByPlaceholder('125.76').fill('4');
    await page.getByPlaceholder('89.23').fill('5');

    await page.locator('.btn-add').click();

    // Esperar a que aparezca en la tabla
    await expect(editBtn.first()).toBeVisible({ timeout: 15000 });
  }
}

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

    });

    test('3. Debería editar un registro', async ({ page }) => {
  await ensureAtLeastOneRecord(page);

  const editBtn = page.locator('.btn-edit').first();
  await expect(editBtn).toBeVisible({ timeout: 15000 });
  await editBtn.click();

  await page.waitForURL('**/food-supply-utilization-accounts/*/*');
  await page.waitForSelector('form input');

  await page.locator('form input').first().fill('7777');

  await page.getByRole('button', { name: /Guardar Cambios/i }).click();
});


    test('4. Debería buscar por rango (si la UI lo permite)', async ({ page }) => {
  const desde = page.getByPlaceholder('Desde año...');
  const hasta = page.getByPlaceholder('Hasta año...');
  const buscarBtn = page.getByRole('button', { name: /buscar/i });
  const limpiarBtn = page.getByRole('button', { name: /limpiar/i });

  if (await desde.count() > 0 && await hasta.count() > 0) {
    await desde.fill('2000');
    await hasta.fill('2100');

    await expect(buscarBtn).toBeVisible();
    await buscarBtn.click();

    await expect(page.locator('body')).toContainText(
      /Encontrados|No se encontraron resultados/i
    );
    await limpiarBtn.click();
  }
});
 
    test('5. Debería borrar un registro', async ({ page }) => {
  await ensureAtLeastOneRecord(page);

  // Acepta confirmaciones nativas si existen
  page.on('dialog', dialog => dialog.accept());

  const deleteBtn = page.locator('.btn-delete').first();
  await expect(deleteBtn).toBeVisible({ timeout: 15000 });
  await deleteBtn.click();

}); 

test('6. Debería borrar TODO', async ({ page }) => {
  page.on('dialog', dialog => dialog.accept());

  await expect(page.locator('.btn-del')).toBeVisible({ timeout: 15000 });
  await page.locator('.btn-del').click();

  await expect(
    page.locator('text=No hay datos disponibles en la base de datos.')
  ).toBeVisible({ timeout: 15000 });
});

}); 