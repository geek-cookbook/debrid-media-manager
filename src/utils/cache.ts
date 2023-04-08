import Redis from 'redis';

// Define the Redis client
const redisClient = Redis.createClient();

// Define the function to cache the JSON value
export function cacheJsonValue<T>(key: string[], value: T) {
	// Sort the key array alphabetically
	const sortedKey = key.sort();

	// Convert the sorted key array to a single string key
	const redisKey = sortedKey.join(':');

	// Stringify the JSON value
	const jsonValue = JSON.stringify(value);

	// Set the Redis key-value pair with a 10-minute expiration time
	redisClient.SET(redisKey, jsonValue, { EX: 600 });
}

// Define the function to retrieve the cached JSON value
export function getCachedJsonValue<T>(key: string[]): T {
	// Sort the key array alphabetically
	const sortedKey = key.sort();

	// Convert the sorted key array to a single string key
	const redisKey = sortedKey.join(':');

	const jsonValue = redisClient.GET(redisKey);

	return jsonValue as T;
}
