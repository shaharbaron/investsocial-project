import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'mycache_';

export async function getFromCache(key) {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (cachedData !== null) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Error retrieving data from cache:', error);
  }
  return null;
}

export async function saveToCache(key, data) {
  try {
    await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to cache:', error);
  }
}

export async function clearCache(key) {
  try {
    await AsyncStorage.removeItem(CACHE_PREFIX + key);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}