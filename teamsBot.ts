import {
  TeamsActivityHandler,
  TurnContext,
  MessageFactory
} from "botbuilder";
import { fetchTextContent } from "./network";

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      const txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      const res = await fetchTextContent(txt)

      await context.sendActivity(MessageFactory.text(res.name, res.name));

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          await context.sendActivity(
            `Hi there! I'm a Teams bot.`
          );
          break;
        }
      }
      await next();
    });
  }
}
