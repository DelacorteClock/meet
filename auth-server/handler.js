const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

//Amount of access
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const credentials = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    client_secret: process.env.CLIENT_SECRET,
    calendar_id: process.env.CALENDAR_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    redirect_uris: ['https://delacorteclock.github.io/meet'],
    javascript_origins: ['https://delacorteclock.github.io', 'http://localhost:3000']
};
const {client_secret, client_id, redirect_uris, calendar_id} = credentials;
const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
        );

module.exports.getAuthURL = async function () {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            authUrl: authUrl
        })
    };
};

module.exports.getAccessToken = async function (event) {
    const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
            );
    const code = decodeURIComponent(`${event.pathParameters.code}`);
    return new Promise(function (resolve, reject) {
        oAuth2Client.getToken(code, function (err, token) {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    }).then(function (token) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(token)
        };
    }).catch(function (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(err)
        };
    });
};

module.exports.getCalendarEvents = function (event) {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({access_token});
    return new Promise(function (resolve, reject) {
        calendar.events.list(
                {
                    calendarId: calendar_id,
                    auth: oAuth2Client,
                    timeMin: new Date().toISOString(),
                    singleEvents: true,
                    orderBy: 'startTime'
                },
                (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        }
        );
    }).then(function (res) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({events: res.data.items})
        };
    }).catch(function (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(err)
        };
    });
};