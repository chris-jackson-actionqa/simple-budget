describe("Add New Bill", () => {
  beforeEach(() => {
    browser.navigateTo("/bills");
  });

  it("add a new bill", async () => {
    // Add new bill
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "100");
    browser.updateValue("#billDate", "20");
    browser.element.findByText("Add").click();

    // After clicking "Add", fields should be cleared from add bill form
    browser.expect.element("#billName").text.to.equal("");
    browser.expect.element("#billAmount").text.to.equal("");
    browser.expect.element("#billDate").text.to.equal("");

    // "Test Bill" should be in the list of bills
    const billRows = await browser.element.findAll("[data-testid='bill-row']");
    const lastBillRow = billRows[billRows.length - 1];
    const billNameCol = await browser
      .element(lastBillRow)
      .getFirstElementChild();
    browser.expect.element(billNameCol).text.to.equal("Test Bill");
    const billAmountCol = await browser
      .element(billNameCol)
      .getNextElementSibling();
    browser.expect.element(billAmountCol).text.to.equal("$100");
    const billDateCol = await browser
      .element(billAmountCol)
      .getNextElementSibling();
    browser.expect.element(billDateCol).text.to.equal("20");
  });

  it("can't add bill with all fields empty", async () => {
    browser.expect.element("#billName").text.to.equal("");
    browser.expect.element("#billAmount").text.to.equal("");
    browser.expect.element("#billDate").text.to.equal("");

    const getNumBills = async () => {
      const billRows = await browser.element.findAll(
        "[data-testid='bill-row']"
      );
      return billRows.length;
    };

    const numBillsBefore = await getNumBills();

    browser.element.findByText("Add").click();

    browser.assert.deepEqual(
      await getNumBills(),
      numBillsBefore,
      "Number of bills should not change"
    );
  });
});
