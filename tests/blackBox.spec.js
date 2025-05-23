import { test, expect } from '@playwright/test';

const Email = "";
const Password = "";

function gerarTexto(qtdCaracteres) {
  return 'a'.repeat(qtdCaracteres);
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByRole('textbox', { name: 'Email or username' }).fill(Email);
  await page.getByRole('textbox', { name: 'Password' }).fill(Password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'Welcome to TS' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const messagesToDelete = [
    'Negrito e Itálico',
    'Mensagem editada',
    'Editar mensagem para valor limite inferior',
    'Editar mensagem para valor limite superior',
    '*Texto em negrito_',
  ];

  for (const messageText of messagesToDelete) {
    const message = page.getByText(messageText, { exact: true }).first();
    if (await message.isVisible()) {
      await message.hover();
      const moreButton = page.getByRole('button', { name: 'More', exact: true });
      await moreButton.waitFor({ state: 'visible' });
      await moreButton.click();
      const deleteOption = page.getByRole('menuitem', { name: 'Delete' });
      await deleteOption.waitFor({ state: 'visible' });
      await deleteOption.click();
      await page.getByRole('button', { name: 'Yes, delete' }).click();
    }
  }
});

test('CT01', async ({ page }) => {
  const message = '**Negrito** e _Itálico_\n```python\ndef func():\n    print("Hello World!")\n```\n[GitHub](https://github.com)';

  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill(message);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Negrito e Itálico').last()).toBeVisible();
});

test('CT02', async ({ page }) => {
  const texto = gerarTexto(5000 + 1);
  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill(texto);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Message too long')).toBeVisible();
});

test('CT03', async ({ page }) => {
  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill('Editar mensagem para valor limite inferior');
  await page.getByRole('button', { name: 'Send' }).click();

  const message = page.getByText('Editar mensagem para valor limite inferior', { exact: true }).first();
  if (await message.isVisible()) {
    await message.hover();
    const moreButton = page.getByRole('button', { name: 'More', exact: true });
    await moreButton.waitFor({ state: 'visible' });
    await moreButton.click();
    const editOption = page.getByRole('menuitem', { name: 'Edit' });
    await editOption.waitFor({ state: 'visible' });
    await editOption.click();
  }

  await page.getByRole('textbox', { name: 'Message #general' }).fill('Mensagem editada');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Mensagem editada').last()).toBeVisible();
});

test('CT04', async ({ page }) => {
  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill('Editar mensagem para valor limite superior');
  await page.getByRole('button', { name: 'Send' }).click();

  const message = page.getByText('Editar mensagem para valor limite superior', { exact: true }).first();
  if (await message.isVisible()) {
    await message.hover();
    const moreButton = page.getByRole('button', { name: 'More', exact: true });
    await moreButton.waitFor({ state: 'visible' });
    await moreButton.click();
    const editOption = page.getByRole('menuitem', { name: 'Edit' });
    await editOption.waitFor({ state: 'visible' });
    await editOption.click();
  }

  const texto = gerarTexto(5000 + 1);
  await page.getByRole('textbox', { name: 'Message #general' }).fill(texto);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Message too long')).toBeVisible();
});

test('CT05', async ({ page }) => {
  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill('*Texto em negrito_');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('*Texto em negrito_').last()).toBeVisible();
});

test('CT06', async ({ page }) => {
  const mensagem = 'Mensagem temporária para deletar';

  await page.getByRole('link', { name: 'general' }).click();
  await page.getByRole('textbox', { name: 'Message #general' }).fill(mensagem);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText(mensagem, { exact: true }).last()).toBeVisible();

  const message = page.getByText(mensagem, { exact: true }).first();
  if (await message.isVisible()) {
    await message.hover();
    const moreButton = page.getByRole('button', { name: 'More', exact: true });
    await moreButton.waitFor({ state: 'visible' });
    await moreButton.click();
    const deleteOption = page.getByRole('menuitem', { name: 'Delete' });
    await deleteOption.waitFor({ state: 'visible' });
    await deleteOption.click();
    await page.getByRole('button', { name: 'Yes, delete' }).click();
  }

  await expect(page.getByText(mensagem, { exact: true })).toHaveCount(0);
});
