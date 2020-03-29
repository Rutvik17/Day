import {newsConfig} from "../NewsConfig";
let news_url = 'http://newsapi.org/v2/';
export function getTopHeadlines(country, city) {
    return new Promise((resolve, reject) => {
        let req = new Request(news_url
            + 'top-headlines?'
            + 'country=' + country + '&'
            + 'city=' + city + '&'
            + 'apiKey=' + newsConfig.apiKey);
        return fetch(req).then((res) => res.json()
            .then((news) => {
                resolve(news);
            }, error => {
                reject(error);
            })
        );
    })
}