import {
  getUrl,
  getEstimationTime,
  handleScenario
} from './lib/njbus';


export const helloLambda = (event, context, callback) => {

  const Alexa = require('alexa-sdk');

  const handlers = {
    'GetBusScheduleIntent': function () {
      console.log(JSON.stringify(this.event.request.intent));
      let busNumber = parseInt(this.event.request.intent.slots.busNumber.value);
      let busType = this.event.request.intent.slots.busType.value;
      let stop = 12101;
      if (busType && busType.startsWith('loc')) {
        stop = 12231;
      }
      let url = getUrl(busNumber, stop);
      getEstimationTime(url).then((result) => {
        let speech = handleScenario(result, busNumber);
        console.log(speech);
        this.emit(':tell', speech);
      });
    }
  };

  const alexa = Alexa.handler(event, context);

  alexa.APP_ID = 'amzn1.ask.skill.95fe6da0-b27f-405f-8438-a7cad243e081';
  // To enable string internationalization (i18n) features, set a resources object.
  //alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

export default {
  helloLambda
}

