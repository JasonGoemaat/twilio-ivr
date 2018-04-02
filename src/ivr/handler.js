const VoiceResponse = require('twilio').twiml.VoiceResponse;

// from is the last 4 digits of the From field (phone number on a phone call)
exports.welcome = function welcome(from) {
  const voiceResponse = new VoiceResponse();
  const bodyUrl = 'https://www.robokiller.com/recording_not_found.mp3';

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });
  
  if (from === '5667') {
    gather.say('Hello Jason.  Ann loves you!');
  }
  
  if (from === '0886') {
    gather.say('Hello Ann.  Jason loves you!');
  }
  
  
  if (from === '8882') {
    gather.say('Hello Brian, you should spend another night!');
  }
  
  

  
  gather.say(
    'Press 1 for instructions on how to get home.  Press 2 for planet list, . , , , . , . , . , . , . ,',
    {voice: 'alice', language: 'en-GB'}
  );
  gather.pause(8);
  
  gather.say(
    'Press 1 for instructions on how to get home.  Press 2 for planet list.',
    {voice: 'alice', language: 'en-GB'}
  );
  gather.pause(8);
  
  gather.say(
    'Press 1 for instructions on how to get home.  Press 2 for planet list.',
    {voice: 'alice', language: 'en-GB'}
  );
  gather.pause(8);

  // gather.play({loop: 3}, bodyUrl);
  
  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': giveExtractionPointInstructions,
    '2': listPlanets,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

exports.planets = function planets(digit) {
  const optionActions = {
    '2': '+12024173378',
    '3': '+12027336386',
    '4': '+12027336637',
  };

  if (optionActions[digit]) {
    const twiml = new VoiceResponse();
    twiml.dial(optionActions[digit]);
    return twiml.toString();
  }

  return redirectWelcome();
};

/**
 * Returns Twiml
 * @return {String}
 */
function giveExtractionPointInstructions() {
  const twiml = new VoiceResponse();

  twiml.say(
    'To get to your extraction point, get on your bike and go down ' +
    'the street. Then Left down an alley. Avoid the police cars. Turn left ' +
    'into an unfinished housing development. Fly over the roadblock. Go ' +
    'passed the moon. Soon after you will see your mother ship.',
    {voice: 'alice', language: 'en-GB'}
  );

  twiml.say(
    'Thank you for calling the ET Phone Home Service - the ' +
    'adventurous alien\'s first choice in intergalactic travel'
  );

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function listPlanets() {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    action: '/ivr/planets',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'To call the planet Broh doe As O G, press 2. To call the planet DuhGo ' +
    'bah, press 3. To call an oober asteroid to your location, press 4. To ' +
    'go back to the main menu, press the star key ',
    {voice: 'alice', language: 'en-GB', loop: 3}
  );

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
