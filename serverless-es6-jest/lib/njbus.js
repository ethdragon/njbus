import { parseString } from 'xml2js';
import { get } from 'http';
import * as _ from 'lodash';

export function getUrl(route, stop) {
    let baseURL = 'http://mybusnow.njtransit.com/bustime/map/getStopPredictions.jsp';
    let key = Array(16).fill().map(() =>  Math.floor(Math.random()*10).toString());
    key = `0.${key.join('')}`;
    let url = `${baseURL}?route=${route}&stop=${stop}&key=${key}`;
    return url;
}


export async function getEstimationTime(url) {
    return new Promise((resolve, reject) => {
        get(url, (response) => {
            let bodyChunks = [];
            response.on('data', (chunk) => {
                bodyChunks.push(chunk);
            }).on('end', () => {
                let xml = Buffer.concat(bodyChunks);
                parseString(xml, (err, result) => {
                    return err ? reject(err) : resolve(result);
                });
            });
        });
    });
}

export function handleScenario(result, busNumber) {
    console.log(JSON.stringify(result));
    let scenario = result.stop;
    if (scenario.noPredictionMessage || !scenario.pre) {
        return `Currently there is no ${busNumber} bus coming to ${scenario.nm}. Please try again later.`;
    }
    if (scenario.pre) {
        let status = _.map(scenario.pre, (prediction) => prediction.pt[0]);
        if (status.length < 2) {
            if (status[0].toLowerCase().includes('delay')
                || status[0].toLowerCase().includes('approach')) {
                return `The next bus is ${status[0]}`;
            } else {
                return `The next bus is coming in ${status[0]}`;
            }
        } else {
            let speech = `There are ${status.length} buses coming . `;
            if (status[0].toLowerCase().includes('delay')
                || status[0].toLowerCase().includes('approach')) {
                speech += `The first bus is ${status[0]}. `;
            } else {
                speech += `The first bus is coming in ${status[0]}. `;
            }
            for (let i=1; i<status.length; i++) {
                speech += `The next bus is coming in ${status[i]}. `
            }
            return speech;
        }
    } else {
        console.log(JSON.stringify(scenario));
        return 'I haven\'t seen this before but I guess there is no bus coming at this moment';
    }
}

