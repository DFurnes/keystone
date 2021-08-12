const { sample } = require('lodash');


/**
 * Get a random greeting.
 * 
 * @returns {string}
 */
module.exports.greeting = () => {
  const greetings = [
      'Knock knock!',
      'Open sesame!',
      'Alohomora!',
      'Watch out...',
      `Let's get spicy!`,
    ];

  return sample(greetings);
};


/**
 * Get the number of seconds remaining before the given TOTP refreshes.
 * 
 * @param {TOTP} totp 
 * @returns {Number}
 */
module.exports.remaining = (totp) => {
  const now = Date.now() / 1000;

  // TOTP codes are generated in rolling windows based on the UNIX timestamp. We'll read
  // the period (window) from the TOTP & calculate remaining time to use this code.
  const iteration = Math.floor(now / totp.period);
  const nextIteration = (iteration + 1) * totp.period;

  return Math.ceil(nextIteration - now);
}