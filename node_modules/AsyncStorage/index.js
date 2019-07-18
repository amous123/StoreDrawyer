import AsyncStorageInterface from './interface/AsyncStorage';

export class AsyncStorage extends AsyncStorageInterface{
    static setItem(key, value, callback){
        return new Promise(function (resolve) {
            localStorage[`@AsyncStorage:${key}`] = value;
            if(callback) callback();
            resolve();
        })
    } 

    static getItem(key, callback){
        return new Promise(function (resolve) {
            let value = localStorage[`@AsyncStorage:${key}`];
            let error;
            if(callback) callback(error, value);
            resolve(value);
        });
    }
}