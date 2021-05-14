const puppeteer = require('puppeteer');

async function get_from_leetcode(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
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



  await browser.close();
  // const linkArray = document.links;

}

get_from_leetcode();
