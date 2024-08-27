describe("sign in", () => {
  test("user can sign in", async () => {
    await page.goto(`${FRONT_URL}/sign-in`);
    await page.type("[data-test=input-email]", "test@example.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.click("[data-test=button-submit]"),
      page.waitForNavigation(),
    ]);
    const url = page.url();
    expect(url).toBe(`${FRONT_URL}/`);
  });
});
