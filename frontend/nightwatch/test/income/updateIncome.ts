describe("Update Income", () => {
  beforeEach(() => {
    browser.navigateTo("/income");
  });
  it("should update the income", async () => {
    await browser.sbUpdateValue("#incomeNumRecurrance", "3");

    // await browser.updateValue("#incomeNumRecurrance", "2");
    await browser.updateValue("#incomeStartDate", "03122022");
    await browser.element.findByText("Update").click();

    // await browser.navigateTo("/");
    await browser.element("nav").findByText("Bills").click();
    await browser.element("nav").findByText("Income").click();

    await browser.expect
      .element("#incomeNumRecurrance")
      .to.have.value.that.equals("3");

    await browser.expect
      .element("#incomeStartDate")
      .to.have.value.that.equals("2022-03-12");
  });
});
