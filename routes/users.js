var express = require('express');
const { emitToAllClients } = require('../socketManager');
var router = express.Router();

/* GET users listing. */
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const arr = [
  '#eb4034',
  '#3446eb',
  '#b629d6',
  '#0f6e91',
  '#15ed5a',
  '#d7ed15',
  '#c95212',
  '#8c03fc',
  '#f0f00a',
  '#111',
]

async function randomData(time) {
  let a = getRandomInt(10)
    let b = getRandomInt(10)
    emitToAllClients('test-emit', {
      value: `${a}-${b}`,
      color: arr[getRandomInt(100) % 10]
    });
    await delay(time)
}

router.get('/', async function(req, res, next) {
  while (true) {
    let a = getRandomInt(10)
    let b = getRandomInt(10)
    emitToAllClients('test-emit-1', {
      value: `${a}-${b}`,
      color: arr[getRandomInt(100) % 10]
    });
    await delay(750)
  }
});

router.get('/1', async function(req, res, next) {
  while (true) {
    let a = getRandomInt(10)
    let b = getRandomInt(10)
    emitToAllClients('test-emit-1', {
      value: `${a}-${b}`,
      color: arr[getRandomInt(100) % 10]
    });
    await delay(1000)
  }
});

router.get('/2', async function(req, res, next) {
  while (true) {
    let a = getRandomInt(10)
    let b = getRandomInt(10)
    emitToAllClients('test-emit-2', {
      value: `${a}-${b}`,
      color: arr[getRandomInt(100) % 10]
    });
    await delay(500)
  }
});


router.get('/3', async function(req, res, next) {
  while (true) {
    let a = getRandomInt(10)
    let b = getRandomInt(10)
    emitToAllClients('test-emit-3', {
      value: `${a}-${b}`,
      color: arr[getRandomInt(100) % 10]
    });
    await delay(2500)
  }
});

module.exports = router;
