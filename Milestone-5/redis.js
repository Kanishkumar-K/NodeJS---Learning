const Redis = require('ioredis');
const redis = new Redis();

async function manipulateKey() {
    const key = 'message'; 
    const initialMessage = 'Hello World';

    await redis.set(key, initialMessage);
    console.log(`Set '${key}' with the value: '${initialMessage}'`);

    const value = await redis.get(key);
    console.log(`Retrieved '${key}' with the value: '${value}'`);

    const valueExist = await redis.exists(key);
    if(valueExist === 1){
        console.log(`Key '${key}' exists`);
    }
    else{
        console.log(`Key '${key}' does not exist`);
    }

    const key1 = 23;
    await redis.set(key1, 23);
    const incrementAge = await redis.incr(key1);
    console.log(`Incremeneted value is: ${incrementAge}`);

    const var1 = 10, var2 = 20;
    await redis.mset(var1, 10, var2, 20)
    console.log(`Set multiple keys: ${var1} and ${var2}`);

    const values = await redis.mget(var1, var2);
    console.log(`Retrieved values: ${values[0]}, ${values[1]}`);

    const appendResult = await redis.append(key, '!!!');
    console.log(`Appended value, new length: ${appendResult}`);

    const listkey = "mylist"
    await redis.rpush(listkey, "GraphQL");
    await redis.rpush(listkey, "Redis");
    await redis.rpush(listkey, "Memcache");

    const length = await redis.llen(listkey)
    console.log(length);

    const listItems = await redis.lrange(listkey, 0, -1);
    console.log(`List '${listkey}' items: ${listItems}`);


     const setKey = 'myset';
     await redis.sadd(setKey, 'member1');
     await redis.sadd(setKey, 'member2');
     await redis.sadd(setKey, 'member2'); 
     const setMembers = await redis.smembers(setKey);
     console.log(`Set '${setKey}' members: ${setMembers}`);
 
     const hashKey = 'myhash';
     await redis.hset(hashKey, 'field1', 'value1');
     await redis.hset(hashKey, 'field2', 'value2');
     const hashFields = await redis.hgetall(hashKey);
     console.log(`Hash '${hashKey}' fields: ${JSON.stringify(hashFields)}`);
 
     const sortedSetKey = 'mySortedSet';

     await redis.zadd(sortedSetKey, 3, 'member3');
     await redis.zadd(sortedSetKey, 1, 'member1');
     await redis.zadd(sortedSetKey, 2, 'member2');

     const sortedSetMembers = await redis.zrange(sortedSetKey, 0, -1, 'WITHSCORES');
     console.log(`Sorted Set '${sortedSetKey}' members with scores: ${sortedSetMembers}`);

     await redis.flushdb();
     redis.disconnect();


}

manipulateKey().catch(console.error);