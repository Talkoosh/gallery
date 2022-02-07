'use strict';

function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key){
    var value = localStorage.getItem(key);
    return JSON.parse(value);
}