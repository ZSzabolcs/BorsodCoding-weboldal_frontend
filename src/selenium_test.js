import {By, Builder, Browser} from "selenium-webdriver"
import assert from "assert"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function Test() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:5173/');
  
    let title = await driver.getTitle();
    assert.equal("For the potato", title);
  
    //await driver.manage().setTimeouts({implicit: 500});

    await sleep(5000)
  
    let linkToLogin = await driver.findElement(By.linkText("Már van fiókod?"));

    await linkToLogin.click()


    let linkToRegistration = await driver.findElement(By.linkText("Még nincs fiókod?"))

    await linkToRegistration.click()

    await driver.findElement(By.linkText("Már van fiókod?"));

    let userName_input = await driver.findElement(By.id("userName"))

    await userName_input.sendKeys("valaki")

    assert.equal(await userName_input.getAttribute("value"), "valaki")
  
  } catch (e) {
    console.log(e)
  } finally {
    console.log("Teszt teljesítve!")
    driver.quit()
  }
}())
