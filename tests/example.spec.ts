import { test, expect, Page } from '@playwright/test';

test.describe('Auth Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/auth');
  });

  test('should have the correct metadata title and elements', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Sign in' });
    await expect(page).toHaveTitle(/sign in | sign up/i);
    await expect(page.getByText('todo.')).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(page.getByText("Don't have an account?")).toBeVisible();
  });

  test('should have a form element, 2 input fields and a submit button', async ({ page }) => {
    await expect(page.getByTestId('auth-form')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('should change the heading text to "Sign up" when the "Sign up" button is clicked', async ({ page }) => {
    const initialHeading = page.getByRole('heading', { name: 'Sign in' });
    const newHeading = page.getByRole('heading', { name: 'Sign up' });
    const signUpHint = page.getByText("Don't have an account?");
    const signInHint = page.getByText("Already have an account?");

    await expect(initialHeading).toBeVisible();
    await expect(newHeading).not.toBeVisible();
    await expect(signUpHint).toBeVisible();
    await expect(signInHint).not.toBeVisible();

    await page.click('text=Sign up');

    await expect(newHeading).toBeVisible();
    await expect(initialHeading).not.toBeVisible();
    await expect(signInHint).toBeVisible();
    await expect(signUpHint).not.toBeVisible();
  });

  test('should show an error message when the form is submitted with "Invalid credentials."', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@gmail.com');
    await page.fill('input[name="password"]', 'password');

    await page.click('text=Submit');

    await page.route('**/auth', async route => {
      const res = await route.fetch();
      const json = await res.json();
      json.push({ message: 'Invalid credentials.', isSuccess: false });

      await route.fulfill({
        response: res,
        json
      });
    });
    // Wait for the error message to be displayed on the page
    await expect(page.getByText('Invalid credentials.')).toBeVisible();
  });

  test('should redirect to the home page when the form is submitted with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'danny@gmail.com');
    await page.fill('input[name="password"]', 'password');

    await page.click('text=Submit');

    await page.route('**/auth', async route => {
      const res = await route.fetch();
      const json = await res.json();
      json.push({ message: 'Login Successful!', isSuccess: true });

      await route.fulfill({
        response: res,
        json
      });
    });

    // Wait for the page to redirect after successful login
    await page.waitForURL('http://localhost:3001/');
    await expect(page).toHaveURL('http://localhost:3001/');
  });
});


test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  const authenticateUser = async (page: Page) => {
    await page.fill('input[name="email"]', 'danny@gmail.com');
    await page.fill('input[name="password"]', 'password');

    await page.click('text=Submit');

    await page.route('**/auth', async route => {
      const res = await route.fetch();
      const json = await res.json();
      json.push({ message: 'Login Successful!', isSuccess: true });

      await route.fulfill({
        response: res,
        json
      });
    });

    // Wait for the page to redirect after successful login
    await page.waitForURL('http://localhost:3001/', {waitUntil: 'load'});
  };

  test('should redirect to the auth page when the user is not authenticated', async ({ page }) => {
    await page.waitForURL('http://localhost:3001/auth');
    await expect(page).toHaveURL('http://localhost:3001/auth');
  });

  test('should take the user back to the home page after successful authentication', async ({ page }) => {
    await authenticateUser(page);
    await expect(page).toHaveURL('http://localhost:3001/');
  });

  test('should have the correct metadata title and elements', async ({ page }) => {
    await authenticateUser(page);
    await expect(page).toHaveTitle(/todo app/i);
    await expect(page.getByText('todo.')).toBeVisible();
    await expect(page.getByText(/filter/i)).toBeVisible();
    await expect(page.getByText(/tasks/i)).toBeVisible();
  });

  test('should have a form element, 1 input field and a submit button', async ({ page }) => {
    await authenticateUser(page);
    await expect(page.getByTestId('add-form')).toBeVisible();
    await expect(page.getByPlaceholder(/start typing/i)).toBeVisible();
    await expect(page.getByTestId('task-list')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Task' })).toBeVisible();
  });

  test('should Add a new task to task list on submit', async ({ page }) => {
    await authenticateUser(page);

    await expect(page.getByTestId('task-list')).toBeVisible();
    const taskItems = await page.$$('[data-testid="task-item"]');

    const taskCount = taskItems.length;
    const newTask = {
      title: 'Test Task 1',
      userId: 'clyrlj13m000069jqie90jqcy'
    }

    await page.fill('input[name="title"]', newTask.title);
    await page.click('text=Add Task');

    await page.route('**/', async route => {
      const res = await route.fetch({ method: 'POST' });
      const json = await res.json();
      json.push({
        title: newTask.title,
        userId: newTask.userId
      });

      await route.fulfill({
        response: res,
        json
      });
    });

    // await expect(page.getByText('Test Task 1')).toBeVisible();
    const newTaskItems = await page.$$('[data-testid="task-item"]');
    const newTaskCount = newTaskItems.length;
    expect(newTaskCount).toBe(taskCount + 1);
  });
});
