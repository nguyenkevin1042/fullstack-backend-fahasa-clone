import db from './models/index';
import { createClient } from 'redis';

let startRedisGetSet = async (key, data) => {
    let redisClient = await redisConnect();
    let dataFromRedis = await redisClient.get(key);
    let result

    if (dataFromRedis) {
        result = dataFromRedis
    } else {
        await redisClient.set(key, data);
        result == await redisClient.get(key);
    }

    return result;
}

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
    // console.log('-------------------')
    // console.log('Connected to Redis server. Ready to set data!')
    await redisClient.set(key, data);
    // console.log('Set data to redis completed!')
    await redisClient.quit()
    return redisClient
}

let getData = async (key) => {
    let redisClient = await redisConnect();
    // console.log('-------------------')
    // console.log('Connected to Redis server. Ready to get data!')
    let dataFromRedis = await redisClient.get(key);
    // console.log('Get data from redis completed!')
    await redisClient.quit()
    return dataFromRedis;
}

module.exports = {
    redisConnect: redisConnect,
    setData: setData,
    getData: getData,
    startRedisGetSet: startRedisGetSet
}