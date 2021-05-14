# Alan Turing

Alan turing is a discord webhook that sends general programming problems from leet-code and language specific problems, and sends them via discord webhook.

## Example:

[example]("https://github.com/Prasantacharya/Alan-Turing/blob/main/Example.png")

## How to add your server

If you want to add your server, make a pr with changes made to `config.json`

Look in `config.json` and you will see something like this:

```JSON
{
   "server#channel":{
      "endpoint":"",
      "hours": "6,8,15"
   }
}

```

`server#channel` should be populated with your server followed by `#` and the channel name. This is not strictly necessary, but it is a good way to make sure that there are no duplicates.

`endpoint` is where you supply your discord webhook. [Look here to make a webhook for your channel](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) **Do not include this in your PR**. If other people get a hold of this, they can spam the channel. Instead, leave it out and after your pr gets approved, message the maintainer your endpoint. They will add it without it being visible to everyone. If your webhook is comprimised, just delete the webhook, and you wont get spammed.

`hours` is what hours of the day you want Turing to message. Works on 24 hour time, and can only be hours for now.
