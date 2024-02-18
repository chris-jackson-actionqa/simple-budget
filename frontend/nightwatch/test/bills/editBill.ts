describe("Edit Bill", () => {
  beforeEach(() => {
    browser.navigateTo("/bills");
    browser.refresh();
    // Add new bill
    browser.sbUpdateValue("#billName", "Test Bill");
    browser.sbUpdateValue("#billAmount", "100");
    browser.sbUpdateValue("#billDate", "20");
    browser.element.findByText("Add").click();

    browser.element.findByText("Test Bill").click();
  });

  it("should edit bill", async () => {
    // Edit bill
    await browser.sbUpdateValue("#billName", "Test Bill 2");
    await browser.sbUpdateValue("#billAmount", "200");
    await browser.sbUpdateValue("#billDate", "25");
    await browser.element.findByText("Save").click();

    const billElements = await browser.element.findAll(
      '[data-testid="bill-row"]'
    );

    let editedBill;
    for (let i = 0; i < billElements.length; i++) {
      const text = await billElements[i].getText();
      if (text.includes("Test Bill 2")) {
        editedBill = billElements[i];
        break;
      }
    }

    await browser.expect
      .element(editedBill)
      .text.to.equal("Test Bill 2\n$200\n25");
  });

  it("should cancel edit bill", async () => {
    // Edit bill
    await browser.sbUpdateValue("#billName", "Test Bill 2");
    await browser.sbUpdateValue("#billAmount", "200");
    await browser.sbUpdateValue("#billDate", "25");
    await browser.element.findByText("Cancel").click();

    const billElements = await browser.element.findAll(
      '[data-testid="bill-row"]'
    );

    const billRowsText = [];

    for (let i = 0; i < billElements.length; i++) {
      const text = await billElements[i].getText();
      billRowsText.push(text);
    }

    const thisShouldBeUndefined = billRowsText.find((text) =>
      text.includes("Test Bill 2")
    );

    expect(thisShouldBeUndefined).to.be.undefined;

    const billShouldBePresent = billRowsText.find((text) =>
      text.includes("Test Bill")
    );
    expect(billShouldBePresent).to.equal("Test Bill\n$100\n20");
  });

  it("should delete bill", async () => {
    await browser.element.findByText("Delete").click();
    await browser.ensure.alertIsPresent();
    await browser.acceptAlert();
    const billElements = await browser.element.findAll(
      '[data-testid="bill-row"]'
    );

    const billRowsText = [];

    for (let i = 0; i < billElements.length; i++) {
      const text = await billElements[i].getText();
      billRowsText.push(text);
    }

    const thisShouldBeUndefined = billRowsText.find((text) =>
      text.includes("Test Bill")
    );

    expect(thisShouldBeUndefined).to.be.undefined;
  });
});
