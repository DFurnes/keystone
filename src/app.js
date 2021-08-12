require('dotenv').config()

const OTPAuth = require('otpauth');
const pluralize = require('pluralize');
const { App } = require('@slack/bolt');

const { greeting, remaining } = require('./helpers');

const { KEYSTONE_CHANNEL, TOTP_NAME, TOTP_SECRET } = process.env;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Parse the TOTP secret, provided as a 'otpauth://totp/...' URL:
let totp = OTPAuth.URI.parse(TOTP_SECRET);

/**
 * Respond to '/keystone' commands.
 */
app.command('/keystone', async ({ command, ack, respond }) => {
  const { user_name, channel_name } = command;

  const code = totp.generate();

  await ack();

  // Restrict which channel two-factor codes can be requested from.
  if (channel_name !== KEYSTONE_CHANNEL) {
    return await respond(`Sorry, you can only request two-factor codes in #${KEYSTONE_CHANNEL}!`)
  }

  // Let the channel know that someone just requested a two-factor code.
  await respond({ response_type: 'in_channel', text: `*${greeting()}* <@${user_name}> requested a two-factor code for ${TOTP_NAME}.`});
  
  await respond({
    response_type: 'ephemeral',
    text: `:lock: Your two-factor code is *${code}*.   _(Expires in ${pluralize('second', remaining(totp), true)}.)_`
  });
});


/**
 * Bootstrap the application.
 */
(async () => {
  await app.start(process.env.PORT || 4000);

  console.log('🗝  Keystone is running!');
})();
