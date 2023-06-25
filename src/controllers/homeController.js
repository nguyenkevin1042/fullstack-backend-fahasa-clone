import db from '../models/index';
import { createClient } from 'redis';

const client = createClient({
    password: 'dEwb9vsJ9B3eIHUw7ZGSNZDvTL6s3eRj',
    socket: {
        host: 'redis-15711.c44.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15711
    }
});

let getHomePage = async (req, res) => {
    try {
        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        await client.set('key', 'hello world');
        const value = await client.get('key');
        console.log(value)
        return res.render("homepage.ejs");
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getHelloWorld = (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getHelloWorld: getHelloWorld
}
