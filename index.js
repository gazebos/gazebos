// var http = require('http');
// var httpProxy = require('http-proxy');

// httpProxy.createServer({
//   ssl: {
//     key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
//     cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
//   },
//   target: 'https://localhost:9010',
//   secure: true // Depends on your needs, could be false.
// }).listen(443);

var html = require('choo/html')
var choo = require('choo')

var app = choo()
app.use(titleStore)
app.route('/', mainView)
app.mount('body')
