import { KudoParser } from "./parsing/kudo-parser";
import { DispatcherFactory } from "./dispatch/dispatcher-factory";
import { KudoRoute } from "./models/constants/routes";

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
      await say(ex.message);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Kudobot is running!');
})();
