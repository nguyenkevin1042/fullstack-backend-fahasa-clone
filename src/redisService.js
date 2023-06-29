import db from './models/index';
import { createClient } from 'redis';

let redisConnect = async () => {
    let client = createClient({
        password: 'dEwb9vsJ9B3eIHUw7ZGSNZDvTL6s3eRj',
        socket: {
            host: 'redis-15711.c44.us-east-1-2.ec2.cloud.redislabs.com',
            port: 15711
        }
    });
    await client.connect()
    client.on('error', err => console.log('Redis Client Error', err));

    return client;
}

let setData = async (key, data) => {
    let redisClient = await redisConnect();
    await redisClient.set(key, data);
    await redisClient.quit()
    return redisClient
}

let getData = async (key) => {
    let redisClient = await redisConnect();
    let dataFromRedis = await redisClient.get(key);
    await redisClient.quit()
    return dataFromRedis;
}

let deleteData = async (key) => {
    let redisClient = await redisConnect();
    await redisClient.del(key);
    await redisClient.quit()
}

module.exports = {
    setData: setData,
    getData: getData,
    deleteData: deleteData
}