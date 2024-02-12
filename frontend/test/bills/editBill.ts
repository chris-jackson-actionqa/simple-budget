describe("Edit Bill", () => {
  beforeEach(() => {
    browser.navigateTo("/bills");
    browser.refresh();
    // Add new bill
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "100");
    browser.updateValue("#billDate", "20");
    browser.element.findByText("Add").click();

    browser.element.findByText("Test Bill").click();
  });

  it("should edit bill", async () => {
    // Edit bill
    await browser.pause(2000);

    await browser.updateValue("#billName", "2");
    // browser.updateValue("#billAmount", "200");
    // browser.updateValue("#billDate", "25");
    await browser.pause(2000);
    await browser.element.findByText("Save").click();
    await browser.element.findByText("Test Bill2");
    await browser.pause(2000);
  });
});
