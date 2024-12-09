//Módulo 2 CodeCademy
//1. The Events Module
/*
Node é usualmente descrito como tendo uma arquitetura event-driven. Vamos
explorar o que isso significa.

Na programção tradicional, damos ao computador uma série de instruções e
regras, e elas são executadas em uma ordem específica. Contudo, quando
estamos escrevendo aplicações web, vamos ter que muita das vezes manusear
situações e escrever lógica para situações onde não vamos saber quando 
essa ação irá acontencer.

Node.js provê um EventMitter class, que podemos acessar requiring nos
`events` core module:

let events = require('events');

let myEmitter = new events.EventMitter();

todo event emitter instance também possui um método .emit() que anuncia que
um named event ocorreu. o método .emit() leva de primeiro argumento o nome
do evento como uma string e, como segundo argumento, o valor que deve ser
passado para a listener callback function.

Ex:
let newUserListener = (data) => {
     console.log(`We have a new user: ${data}.`);
    }

myEmmiter.on('new user', newUserListener)


myEmmiter.emit('new user', 'Lily Pad');
*/

// Here we require in the 'events' module and save a reference to it in an events variable
let events = require('events');
let myEmitter = new events.EventEmitter();

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

myEmitter.on('celebration', listenerCallback);

myEmitter.emit('celebration', 'I just passed at the interview for apple Academmy!!!!');

//2. User Input/Output
/*
Consigo ler entradas de usuário com o process
*/

let {testNumber} = require('./game.js');

process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n(Write \"quit\" to give up.)\n\nIs the number ... ");

let playGame = (userInput) => {
  let input = userInput.toString().trim();
	testNumber(input);
};


process.stdin.on('data', playGame)


//3. The Error Module
/*
Com nosso código, podemos gerar erros e jogá-los(throw), e, com código
síncrono, podemos utilizar error handling techniques como try...catch. Note
que o modulo error está com o escopo global, sem necessidade de importá-lo
ou "require" 

Muitas APIs Assíncronas Node utilizam error-first callback functions:
São callback functions que esperam um erro como primeiro argumento e os
dados como segundo argumenti. Se o código assíncrono deu erro, será passado
como primeiro argumento da callback function. Se nenhum error foi lançado,
o primeiro argumento será undefined

ex:
const errorFirstCallback = (err, data)  => {
  if (err) {
    console.log(`There WAS an error: ${err}`);
  } else {
    // err was falsy
    console.log(`There was NO error. Event data: ${data}`);
  }
}

*/

const api = require('./api.js');

// Not an error-first callback
let callbackFunc = (data) => {
   console.log(`Something went right. Data: ${data}\n`);
};
  
try {
  api.naiveErrorProneAsyncFunction('problematic input', callbackFunc);
} catch(err) {
  console.log(`Something went wrong. ${err}\n`);
}



const api = require('./api.js');

// An error-first callback
let errorFirstCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong. ${err}\n`);
  } else {
    console.log(`Something went right. Data: ${data}\n`);
  }
};

api.errorProneAsyncApi('problematic input', errorFirstCallback);

//3. The Buffer Module
/*
No Node.js, o módulo Buffer é usado para lidar com dados binários. Ele 
está no escopo global, o que significa que os objetos Buffer podem ser 
acessados em qualquer lugar sem necessidade de importação com require().

Um objeto Buffer representa uma quantidade fixa de memória que não pode
ser redimensionada. Ele é semelhante a um array de inteiros, onde cada 
elemento do array representa um byte de dados, com valores que variam 
de 0 a 255.

O módulo Buffer no Node.js manipula dados binários e fornece métodos úteis como:

.alloc(): Cria um buffer com tamanho fixo.
.toString(): Converte o buffer para uma string.
.from(): Cria um buffer a partir de um dado (string, array, etc.).
.concat(): Junta vários buffers em um único.
Os Buffers são semelhantes a arrays de bytes e são muito usados para 
processar arquivos e dados binários no Node.js.
*/
const bufferAlloc = Buffer.alloc(15,'b');

const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from('world');

  
const bufferArray = [buffer1, buffer2];
const bufferConcat = Buffer.concat(bufferArray);
const bufferString = bufferConcat.toString();
console.log(bufferString);


//4.The FS Module
/*
O módulo fs do Node.js é usado para interagir com o sistema de arquivos. 
Ele fornece métodos síncronos e assíncronos, como:

.readFile(): Lê o conteúdo de um arquivo.
Argumentos:
- Caminho do arquivo.
- Codificação do arquivo (geralmente 'utf-8').
- Função callback (lida com erros e processa os dados do arquivo).
Esse módulo é fundamental para manipular arquivos e diretórios no 
back-end.
*/
const fs = require('fs');

let secretWord = null;

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

fs.readFile('./finalFile.txt', 'utf-8', readDataCallback);

secretWord = "cheeseburgerpizzabagels"

//4. Readable Streams
/*

*/