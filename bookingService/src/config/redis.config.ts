import IORedis, { Redis } from 'ioredis'

import Redlock from 'redlock'

import { serverConfig } from '.'

export const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);

export function connectToRedis() {

    try {
        
        let connection: Redis;
        
        
        
        return () => {
            if (!connection) {
                connection = new Redis(serverConfig.REDIS_SERVER_URL);
                return connection;
            }
            return connection;
        };
    
  } catch (error) {
    console.error("Error connecting to redis", error);
    throw error;
  }
}

export const getRedisConnObject = connectToRedis();



export const redlock = new Redlock([getRedisConnObject()],{
    driftFactor:0.01,
    retryCount:10,
    retryDelay:200,
    retryJitter:200
});
