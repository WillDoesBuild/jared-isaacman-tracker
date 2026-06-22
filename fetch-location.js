import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";



async function fetchLocation() {
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: "claude-haiku-4-5",
  max_tokens: 1024,
  tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
      },
    ],
  messages: [
    {
      role: "user",
      content: `Search for the most recent news about NASA Administrator Jared Isaacman. 
        Find the most recent verifiable location he was physically present at, based on 
        press releases, news conferences, or official events. Respond with this sentence, and only this sentence, exactly, in the citations: Jared Isaacman was last seen in [Location], on [date], according to [url source]. 
        Here is a cool haiku about it: [haiku].`,
    }
  ]
});

console.log(message.content);
const output = message.content[message.content.length-2].text+message.content[message.content.length-1].text;

console.log(output)

await fs.writeFileSync("location.txt", output, "utf8");
}

fetchLocation();