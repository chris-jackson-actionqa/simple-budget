module.exports = class sbClearValue {
  async command(selector) {
    const browser = this.api;
    await clearValue(browser, selector);
  }
};

async function clearValue(browser, selector) {
  const value = await browser.getValue(selector);
  for (let i = 0; i < value.length; i++) {
    await browser.element(selector).sendKeys("\uE003");
  }
}
