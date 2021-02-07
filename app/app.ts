import { KudoParser } from "./parsing/kudo-parser";
import { DispatcherFactory } from "./dispatch/dispatcher-factory";
import { KudoRoute } from "./models/constants/routes";
import { KudoCommand } from "./models/kudo-command";
import { KudoInstruction } from "./models/constants/kudo-instruction";
import { HelpBlock } from "./models/constants/blocks";

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.KUDOBOT_OAUTH,
  signingSecret: process.env.KUDOBOT_SIGNING_SECRET
});

app.command(KudoRoute, async ({command, ack, say}) => {
  await ack();
  try {
    const parser = new KudoParser(command.text);
    let parsed = parser.parse();

    const dispatcher = DispatcherFactory.createInstance(parsed, command);
    let result = await dispatcher.dispatch();

    await say(result);
  } catch(ex) {
      await say(HelpBlock);
  }
});

app.action('next_list_page', async ({ ack, say, action }) => {
  await ack();

  try {
    const dispatcher = DispatcherFactory
      .createInstance(<KudoCommand>
        { instruction: KudoInstruction.List }, action);
    let result = await dispatcher.dispatch();

    await say(result);
  }

  catch(ex) {
    await say(HelpBlock);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Kudobot is running!');
})();
