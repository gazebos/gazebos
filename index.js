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

  var app = choo();

  if (process.env.NODE_ENV !== 'production') {
    var persist = require('choo-persist');
    var logger = require('choo-log');
    app.use(persist());
    app.use(logger());
  }

  app.use(expose());
  app.use(todoStore);

  app.route('/', mainView);
  app.route('#active', mainView);
  app.route('#completed', mainView);
  app.mount('body');

function panoView () {
  var title = opts.title || document.title || '';
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>The Museum Store</title>
      <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      <link rel="stylesheet" href="../hoops.css">
      <script src="../hoops.js"></script>
    </head>
    <body>
      <div id="__hoops-wrap__">
      </div>
      <iframe src="http://www.infinitelooper.com/?v=6GuWTy73T3Q&p=n"></iframe>
      <a-scene>
        <a-sky src="https://c1.staticflickr.com/3/2943/33200023071_b0a2806849_k.jpg"></a-sky>
      </a-scene>
    </body>
  </html>
}
