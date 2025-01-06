//Módulo 3 CodeCademy
//1. The HTTP Module
//Podemos utilizar o módulo já embutido do node para criarmos requisições HTTP
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('Hello World')
})

server.listen(4001, () => {

})

//2. The Anatomy of the URL
/*
Uma URL é feita das seguintes partes:

Protocol
Domain
Path
Query

ex:
https://(Protocol)
codecademy.com(Domain)
/articles(Path)
?search=node(Query)
*/

const http = require('http');

const url = 'http://example.com/users/25/projects?type=personal&month=january';

// Make a GET request with the URL and process the response.
http.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(data);
  });
});

//3. The URL Module
/*
Tipicamente, um server HTTP necessitará de informações da url para precisamente processar
a request. a URL da Request já está imbutida no objeto da requisição. Para manusear diferentes partes dessa
url facilmente, Node tem um URL module built-in

pode ser utilizado assim:

const url = new URL('https://www.example.com/p/a/t/h?query=string');

Uma vez instanciado, diferentes partes da URL pode ser acessada e modificada, incluindo:
- hostname
- pathname
- searchParams

*/
const URL_TO_PARSE = 'https://www.example.com/p/a/t/h?prop1=value1&prop2=value2';

const url = require('url');

const myUrl = new URL(URL_TO_PARSE);
const hostname = myUrl.hostname;
const pathname = myUrl.pathname;
const searchParams = myUrl.searchParams;

//4. The Querystring Module
/*
Enquanto o module url pode lidar com query strings, node também tem um module específico para lidar com querystrings: querystring module
Ele é focado em dar utilidades e ajuda na hora de manusear e formatar url Query Strings

.parse() || .decode() --> usado para parsear a URL query string em uma collection de key-value pairs. 
.stringify || .encode() --> Usado para produzir uma URL Query String a partir de um objeto e suas propriedades
.escape() --> Used for performing percent-encoding on a given query string
.unescape() --> This method is used to decode percent-encoded characters within a given query strings
*/

const querystring = require('querystring');

const urlEx = 'https://www.example.com/p/a/t/h?course=node&lesson=http';

// Isolate query string from url
const queryToParse = urlEx.split('?')[1];
console.log(queryToParse)

// Parse query string into object, then add new property
const parsedQuery = querystring.parse(queryToParse);
parsedQuery.exercise = 'querystring';

// Rebuild query string from object
const modifiedQueryString = querystring.stringify(parsedQuery);

//5. Routing
/*
O processo de manusear requests em um caminho específico é chamado routing, o method é uma peça importante que pode ser
utilizado para routear requests. Já que cada HTTP Req tem um método como GET, POST, PUT, DELETE, é importante diferenciar
requests baseadas nos seus métodos para melhor manuseamento das requests

Todas as Get requests poderiam ser routeadas para uma função específica, enquanto POST para outra, e etc...

Ex:
const server = http.createServer((req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    case 'POST':
      return handlePostRequest(req, res);
    case 'DELETE':
      return handleDeleteRequest(req, res);
    case 'PUT':
      return handlePutRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
})

Mas como diferenciar cada request se for do mesmo tipo??, podemos diferenciar utilizando o pathname

ex:
function handleGetRequest(req, res) {
  const { pathname } = new URL(req.url);
  let data = {};

  if (pathname === '/projects') {
    data = await getProjects();
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(data));
  }

  res.statusCode = 404;
  return res.end('Requested resource does not exist');

}


*/

const http = require('http');

// Handle get request
const handleGetRequest = (req, res) => {
  const pathname = req.url;

  if (pathname === '/users') {
    res.end(JSON.stringify([]));
  }
}

const serverEx = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

server.listen(4001, () => {
  const { address, port } = serverEx.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});

//6. HTTP Status Codes
/*
Response Status Codes são agrupadas em 5 classes:

Informational: 100-199
Successful: 200-299
Redirects: 300-399
Client Errors: 400-499
Server Errors: 500-599


*/

const http = require('http');

const handleGetRequestEx = (req, res) => {
  res.statusCode = 200;
  return res.end(JSON.stringify({ data: [] }));
}

const handlePostRequest = (req, res) => {
  res.statusCode = 500;
  return res.end("Unable to create record");
}

// Creates server instance
const serverEx2 = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequestEx(req, res);
    case 'POST':
      return handlePostRequestEx(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

// Starts server listening on specified port
serverEx2.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});

//7. Interacting with a Database
/*
Muita das vezes nossas request não irão retornar responses simples, as vezes vamos precisar interagir
com alguma espécie de database, então, quando isso acontecer, o servidor se torna o "cliente" e manda uma request para
o servidor da Database, que tem seu próprio SDK e ORM
*/