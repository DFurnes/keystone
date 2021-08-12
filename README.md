# Keystone

Keystone is a simple Slack application for generating TOTP codes for a shared account.

## Usage

Just type `/keystone` in the configured channel to be granted a new two-factor code:

![keystone example](https://user-images.githubusercontent.com/583202/129132508-014c4006-dd1b-4b2e-a5ed-02f5efe61199.png)

## Configuration

Keystone runs as a self-hosted [Slack Bolt](https://slack.dev/bolt-js/tutorial/getting-started) application.

The bot is configured via environment variables. You can use [`.env.example`](https://github.com/DFurnes/keystone/blob/main/.env.example) as a template.

1. Create a [new Slack application](https://api.slack.com/apps?new_app=1) and install it into your workspace.
2. Get the bot token from the "OAuth & Permissions" page & store it as `SLACK_BOT_TOKEN`.
3. Get the signing secret from the "App Credentials" page & store it as `SLACK_SIGNING_SECRET`.
4. Store your TOTP secret in the `TOTP_SECRET` environment variable. It looks like `otpauth://totp/...` and can be read via 1Password (and perhaps other tools). This is how we'll generate two-factor codes for this website.
5. Create a `/keystone` command on the "Slash Commands" tab. The Request URL should point to your app, with a `/slack/events` path. For example, if you're hosting your Keystone bot at `https://keystone-bot.herokuapp.com/`, you'd enter `https://keystone-bot.herokuapp.com/slack/events` here.
6. Optionally, set `KEYSTONE_CHANNEL` to limit Keystone usage to a specific channel.

## Roadmap

At some point, I'd like to add support for multiple TOTP generators & easier secret configuration.

## License

© [David Furnes](http://dfurnes.com/). Keystone is released under the [MIT License](https://github.com/DFurnes/keystone/blob/main/LICENSE).