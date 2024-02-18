module.exports = class sbUpdateValue {
  async command(selector, value) {
    const browser = this.api;
    await updateValue(browser, selector, value);
  }
};

async function updateValue(browser, selector, value) {
  await browser.sbClearValue(selector);
  await browser.updateValue(selector, value);
}
