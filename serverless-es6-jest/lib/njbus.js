import { parseString } from 'xml2js';
import { get } from 'http';

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
