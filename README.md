# KudoBot

KudoBot is a very simple slack bot that allows the user to send Kudos to their colleagues! Just a bit of fun to add to the ol' coding portfolio.

Kudos are persisted via an NEDB embedded NoSQL DB, with promisified access functions. The project itself is written in TypeScript and Node using the Bolt framework, 
and is intended to generically handle different Kudo Commands with the use of a Factory design pattern. Depending on the command passed, a dispatcher class 
that implements the base dispatcher will handle the command based on an enum value.

To send Kudos use a command of the form:
```
/kudo send @usermention message
```

To list your previous Kudos:
```
/kudo list
```

The list command supports paging with a button, and the results are ordered by sender name.

Finally, to count the total number of Kudos you have received from other users:
```
/kudo count
```

Please note, the bolt server is just one side of the story, and a corresponding Slack application must be created through Slack's API tools. 
[For more information on building Slack apps, please visit here.](https://api.slack.com)
