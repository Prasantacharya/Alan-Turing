const webhook = require("webhook-discord");

async function sendQuestion(question, endpoint){
    const Hook = new webhook.Webhook(endpoint);
    const msg = new webhook.MessageBuilder()
                  .setName("Alan Turing")
                  .setAvatar("https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg")
                  .setColor("#7F8C8D")
                  .setAuthor(question["title"])
                  .setDescription(question["question"])
                  .addField('Links:', question["question link"], true);
    Hook.send(msg);
}

/*
sendQuestion({
  "title": "title",
  "question link": "[question](https://github.com/DopplerHQ/awesome-interview-questions#android)",
  "question": "Insert question here"
}, "<redacted>");
*/
