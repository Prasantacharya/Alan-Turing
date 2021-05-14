const puppeteer = require('puppeteer');
const webhook = require("webhook-discord");

// sends the scraped questions in a webhook
async function sendQuestion(question, endpoint){
    let color = "#7F8C8D";
    switch(question["difficulty"]){
      case "Easy":
        color = "#2ECC71";
        break;
      case "Medium":
        color = "#F1C40F";
        break;
      case "Hard":
        color = "#E74C3C";
        break;
    }
    const Hook = new webhook.Webhook(endpoint);
    const msg = new webhook.MessageBuilder()
                  .setName("Alan Turing")
                  .setAvatar("https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg")
                  .setColor(color)
                  .setAuthor(question["title"] + "\nDifficulty: " + question["difficulty"])
                  .setDescription(question["question"])
                  .addField('Links:', "[question](" + question["question link"] + ")", true);
    Hook.send(msg);
}

// scrapes from leetcode
async function scrape_leetcode_and_send(endpoint){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // this makes it so much easier
  await page.goto("https://leetcode.com/problems/random-one-question/all");

  // gets the url, name of the problem, and the difficulty
  let [url, name, level] = await page.evaluate(() => {
    let info = document.querySelector("div p").parentElement.parentElement.parentElement.children[0].children;
    let title = info[0].innerText;
    let difficulty = info[1].children[0].innerText;

    return [window.location.href,
            title,
            difficulty];
  });

  // gets the actual problem text
  let text = await page.evaluate(() => {
    // this gets the question from leetcode
      let text = document.querySelectorAll("div p");// [2].innerText;
      let retText = "";
      let flag = false;
      text.forEach((paragraph, i) => {
        if(paragraph.innerText === "Example 1:" || flag){
          retText += "";
          flag = true;
        }
        else retText += paragraph.innerText + "\n";
      });

      return retText;
    });

    // packages it up for the webhook
    let package = {
      "title": name,
      "difficulty": level,
      "question link": url,
      "question": text
    };
  // sends message
  await sendQuestion(package,endpoint);
  // closes the browser
  await browser.close();

}
module.exports = { scrape_leetcode_and_send };
