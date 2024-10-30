//Módulo 1 - Introduction to Node.js
/*
Modularidade é uma técnica de design de Software onde um programa tem partes distintas, cada um provendo uma peça da funcionalidade. Esses módulos
se juntam para construir um coesivo todo. Modularidade é essencial para criar programas escaláveis, que incorporam bibliotecas e frameworks. Essencialmente, 
módulos são um conjunto de código localizados em um arquivo.

Esses arquivos podem ser incluídos em outros arquivos usando a função require()

Para salvar os desenvolvedores de reinventar a roda, Node.js tem várias funcionalidades pré-prontas, conhecidas como core modules. as Core modules definidas com o
Node.js source code e estão localizadas na pasta lib/

Módulos podem ser requiridos passando uma string com o nome do módulo dentro do require():

const events = require('events');



*/

//1. The console Module
/*
Um dos módulos mais utilizados pelo Node.js é o módulo console, o console é utilizado para dar e receber feedback em texto, de e para algum programa, geralmente
utilizado para debugging

ex:

.log() --> printa uma mensagem
.assert() --> printa uma mensagem se um valor é falso
.table() --> printa a table de um array ou objeto
*/

const petsArray = ['dog', 'cat', 'bird', 'monkey'];

console.log(petsArray);
console.table(petsArray);
console.assert(petsArray.length > 5)

//2. The Process Module
/*
Na ciência da Computação, process é a instância do programa que está sendo executado.

Node tem um global process object com métodos úteis e informações sobre o processo atual

process.env é um objeto que que armazena e controla informações sobre o ambiente em que o process está rodando. Por exemplo, process.env
tem uma propriedade chamada PWD, que guarda o diretório em que o processo está localizado. Uma convenção é adicionar uma propriedade para o process.env com a chave
NODE_ENV, com o valor ou de production ou de development

ex:
if (process.env.NODE_ENV === 'development'){
  console.log('Testing! Testing! Does everything work?');
}


process.memoryUsage() retorna informações acerca de quando de CPU está demandando do processo atual
*/

let initialMemory = process.memoryUsage().heapUsed;
let word = process.argv[2];

console.log(`Your word is ${word}`)

let wordArray = [];

for (let i = 0; i < 1000; i++){
  wordArray.push(`${word} count: ${i}`)
}

console.log(`Starting memory usage: ${initialMemory}. \nCurrent memory usage: ${process.memoryUsage().heapUsed}. \nAfter using the loop to add elements to the array, the process is using ${process.memoryUsage().heapUsed - initialMemory} more bytes of memory.`)

//3. The OS Module
/*
Quando estamos desenvolvendo, é útil ter informações sobre o computador, sistema operacional, e network que o programa está rodando

Diferentemente de console e process, OS não é global e precisa ser incluído no arquvido para acessar seus métodos

const os = require('os');

os.type() -> sistema operacional
os.arch() --> arquitetura da CPU do sistema
os.networkInterface() --> IP e MAC Address
os.homedir() --> o atual diretório
os.hostname() --> hostname do sistema operacional
os.uptime() --> uptime, in seconds
*/

const os = require('os');

const server = {type: os.type(), architecture: os.arch(), uptime: os.uptime()}

console.log(server);

//The Util Module
/*
O módulo util serve para ter funções úteis, ela não necessariamente cria novas funcionalidades, mas você pode pensar nelas como ferramentas internas para 
manter e debugar código. o util core module contém métodos designados especificamente para essas causas. ele também tem que ser ''importado''/''requirido''

ex:
const util = require('util');

uma vez requirido, você tem acesso à objetos úteis e métodos com o módulo util. Um importante é o objeto types, que provê checks para tipos

ex:
const util = require('util');

const today = new Date();
const earthDay = 'April 22, 2022';

console.log(util.types.isDate(today));
console.log(util.types.isDate(earthDay));


Outro importante é o .promisify(), que torna callback Functions em promises

Node oferece um caminho para tornar em promises, ex:

function getUser (id, callback) {
  return setTimeout(() => {
    if (id === 5) {
      callback(null, { nickname: 'Teddy' })
    } else {
      callback(new Error('User not found'))
    }
  }, 1000)
}

function callback (error, user) {
  if (error) {
    console.error(error.message)
    process.exit(1)
  }

  console.log(`User found! Their nickname is: ${user.nickname}`)
}

getUser(1, callback) // -> `User not found`
getUser(5, callback) // -> `User found! Their nickname is: Teddy`

Essas funções estão um pouco confusas, mas com promisify() podemos mudá-las para se tornarem mais modernas, limpas e mais manuntenciáveis:

const getUserPromise = util.promisify(getUser);

getUserPromise(id)
  .then((user) => {
      console.log(`User found! Their nickname is: ${user.nickname}`);
  })
  .catch((error) => {
      console.log('User not found', error);
  });

getUser(1) // -> `User not found`
getUser(5) // -> `User found! Their nickname is: Teddy`
*/
// Require in trails module from trails.js
const trails = require('./trails.js');
const util = require('util')
// Require in util module here

// Simulate database call to search trails module for specified trail
const getTrailDistance = (trail, callback) => {
  return setTimeout(() => {
    if (trails.hasOwnProperty(trail)) {    
      const foundTrail = trails[trail];    
      callback(null, foundTrail)
    } else {
      callback(new Error('Trail not found!'))
    }
  }, 1000);
}

// Callback function to send an error in the case of an error, or to handle trail data if a trail was found successfully.
function callback (error, trailData) {
  if (error) {
    console.error(error.message)
    process.exit(1)
  } else {
    const mi = trailData.miles;   
    const nickname = trailData.nickname;
    console.log(`The ${nickname} is ${mi} miles long!`)
  }
}

getTrailDistance('North Country', callback)

const getTrailDistancePromise = util.promisify(getTrailDistance)
getTrailDistancePromise('North Country')
.then((foundTrail ) => {
    const nickname = foundTrail.nickname;
    const mi = foundTrail.miles; 
    console.log(`The ${nickname} is ${mi} miles long!`);
})
.catch((error) => {
    console.log('Trail Not Found!', error);
})


