import { getUrl, getEstimationTime } from './lib/njbus';


export const helloLambda = (event, context, callback) => {

  let url = getUrl(163, 12231);
  getEstimationTime(url).then((result) => {
    console.log(result.stop.pre[0].pt[0]);
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

