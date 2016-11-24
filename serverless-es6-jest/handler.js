
import { helloSvc } from './services/helloSvc';
import { getUrl, getEstimation } from './lib/njbus';

export const helloLambda = (event, context, callback) => {

  //const result = helloSvc({name: 'Serverless'});
  let url = getUrl(780, 12231);
  getEstimation(url).then((result) => {
    console.log(result);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
//      input: event,
        result
      }),
    };
    callback(null, response);
  });
};

export default {
  helloLambda
}

