import { getUrl, getEstimationTime } from './lib/njbus';


export const helloLambda = (event, context, callback) => {

  const Alexa = require('alexa-sdk');

  const handlers = {
    'GetBusScheduleIntent': function () {
      console.log(JSON.stringify(this.event.request.intent));
      let busNumber = parseInt(this.event.request.intent.slots.busNumber.value);
      let url = getUrl(busNumber, 12231);
      getEstimationTime(url).then((result) => {
        this.emit(':tell', result.stop.pre[0].pt[0]);
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

