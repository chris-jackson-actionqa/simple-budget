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

  it("can't add bill with bill name empty", async () => {
    browser.updateValue("#billAmount", "100");
    browser.updateValue("#billDate", "20");

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

  it("can't add bill with bill amount empty", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billDate", "20");

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

  it("can't add bill with bill date empty", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "100");

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

  it("can't add bill with bill name too long", async () => {
    browser.updateValue("#billName", "This bill name is 31 characters");
    browser.updateValue("#billAmount", "100");
    browser.updateValue("#billDate", "20");

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

  it("can add bill with bill name 30 characters long", async () => {
    browser.updateValue("#billName", "This bill name is 30 character");
    browser.updateValue("#billAmount", "100");
    browser.updateValue("#billDate", "20");

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
      numBillsBefore + 1,
      "Number of bills should increase by 1"
    );
  });

  it("can't add bill with bill amount not a number", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "abc");
    browser.updateValue("#billDate", "20");

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

  it("can't add bill with bill amount less than 0", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "-1");
    browser.updateValue("#billDate", "20");

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

  it("can't add bill with bill amount 0", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "0");
    browser.updateValue("#billDate", "20");

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

  it("can add bill with bill amount 0.01", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "0.01");
    browser.updateValue("#billDate", "20");

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
      numBillsBefore + 1,
      "Number of bills should increase by 1"
    );
  });

  it("can add bill with bill amount 1,000,000,000", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "1000000000");
    browser.updateValue("#billDate", "20");

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
      numBillsBefore + 1,
      "Number of bills should increase by 1"
    );
  });

  it("can't add bill with bill amount 1,000,000,000.01", async () => {
    browser.updateValue("#billName", "Test Bill");
    browser.updateValue("#billAmount", "1000000000.01");
    browser.updateValue("#billDate", "20");

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
