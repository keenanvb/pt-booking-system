let CronJob = require('cron').CronJob;
let axios = require('axios');

/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11 (Jan-Dec)
Day of Week: 0-6 (Sun-Sat)
*/

// const morning = '0 30 4 * * *';
const midnight = '0 0 0 * * *';
let job = new CronJob(midnight, function () {
    console.log('Running');
    main();
}, null, true, 'Asia/Dubai');

// console.log('System TZ next 5: ', job.nextDates(5));
let dates = [];

// let nextDates = job.nextDates(5);

// nextDates.forEach((val, index) => {
//     dates.push(val._d)
// });

// console.log('dates', dates);

job.start();

let processEmail = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            }
            let res = await axios.get(`${process.env.LOCALHOST}/api/packages/email`, config)
            resolve(res.data)
        }
        catch (error) {
            reject(error);
        }
    })
}

//login
let logintoken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ email: process.env.adminEmail, password: process.env.adminPassword });
            const res = await axios.post(`${process.env.LOCALHOST}/api/auth`, body, config)
            resolve(res.data)
        }
        catch (error) {
            reject(error)
        }
    })

}

const main = async () => {
    try {
        let { token } = await logintoken();
        await processEmail(token);
    }
    catch (error) {
        console.log('error', error);
    }
}

