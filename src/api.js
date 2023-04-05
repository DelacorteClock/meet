import {fakeData} from './fake-data';
import axios from 'axios';
import NProgress from 'nprogress';
export const extractLocations = function (events) {
    var extractLocations = events.map(function (event) {
        return event.location;
    });
    var locations = [...new Set(extractLocations)];
    return locations;
};
const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.history.pushState('', '', newurl);
    } else {
        newurl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newurl);
    }
};
const checkToken = async function (accessToken) {
    const result = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`).then(function (res) {
        return res.json;
    }).catch(function (error) {
        return error.json;
    });
    return result;
};
export const getEvents = async function () {
    NProgress.start();
    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return fakeData;
    }
    const token = await getAccessToken();
    if (token) {
        removeQuery();
        const url = `https://9m9kr14hzl.execute-api.eu-west-3.amazonaws.com/dev/api/get-events/${token}`;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem('lastEvents', JSON.stringify(result.data));
            localStorage.setItem('locations', JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};
export const getAccessToken = async function () {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            const results = await axios.get('https://9m9kr14hzl.execute-api.eu-west-3.amazonaws.com/dev/api/get-auth-url');
            const {authUrl} = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};
const getToken = async function (code) {
    const encodeCode = encodeURIComponent(code);
    const {access_token} = await fetch(`https://9m9kr14hzl.execute-api.eu-west-3.amazonaws.com/dev/api/token/${encodeCode}`).then(function (res) {
        return res.json();
    }).catch(function (error) {
        return error;
    });
    access_token && localStorage.setItem('access_token', access_token);
    return access_token;
};