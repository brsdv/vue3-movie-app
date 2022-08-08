import axios from 'axios'

export const URL = process.env.VUE_APP_URL

export const getApi = async(apiMethod, path, data, callback) => {
    const timeOutOfRequest = 3000

    let HEADERS = {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzc4NjU3MWRjMTRmZWUyNjU4YjdkNWI1NDlmMDIwNyIsInN1YiI6IjYyZWI4ZWMxMWJmMjY2MDA2MDJmNDM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bs4WvnEZrx11glMIwnkG3BqZnLZvEnFctnQhGtSsZIM'
    }

    await axios({
        method: apiMethod,
        url: `${URL}${path}`,
        data: data,
        headers: HEADERS,
        timeout: timeOutOfRequest,
    }).then(response => {
        callback(response);
    }).catch(error => {
        console.log(error);
    })
}
