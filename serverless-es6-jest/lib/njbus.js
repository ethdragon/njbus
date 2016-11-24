import { parseString } from 'xml2js';
//import request from 'superagent-es6-promise';
import request from "superagent";


export function getUrl(route, stop) {
    let baseURL = 'http://mybusnow.njtransit.com/bustime/map/getStopPredictions.jsp';
    let key = Array(16).fill().map(() =>  Math.floor(Math.random()*10).toString());
    key = `0.${key.join('')}`;
    let url = `${baseURL}?route=${route}&stop=${stop}&key=${key}`;
    return url;
}


export async function getEstimation(url) {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                if (err) {
                    reject(err);
                }
                let xml = response.text;
                parseString(xml, (err, res) => {
                    return err ? reject(err) : resolve(res);
                });
            });
    });
}
