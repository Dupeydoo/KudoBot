export const ListStartBlock = [
    {
        type: "header",
        text: {
            type: "plain_text",
            text: ":smile: Kudos from your colleagues! :smile:",
            emoji: true
        }
    },
    {
        type: "divider"
    }
]

export const ListEndBlock = [
    {
        type: "divider"
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    emoji: true,
                    text: "Next 5 Kudos"
                },
                value: "next_list_page",
                action_id: "next_list_page"
            }
        ]
    }
]

export const SentKudosBlock = {
	blocks: [
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "Thanks for your Kudos",
				emoji: true
			}
		},
		{
			type: "divider"
		},
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "Sent your *Kudos* to the lucky recipient!\n_Here's a cute cat to look at..._"
			},
			accessory: {
				type: "image",
				image_url: "https://placekitten.com/200/300",
				alt_text: "cute cat"
			}
		},
		{
			type: "divider"
		}
	]
}

export const KudoCountBlock = {
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "You have placeholder Kudos."
                },
                accessory: {
                    type: "image",
                    image_url: "http://placekitten.com/200/300",
                    alt_text: "cute cat"
                }
            }
        ]
}