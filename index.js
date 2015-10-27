var static = require('koa-static');
var koa = require('koa');
var route = require('koa-route');
var app = koa();


app.use(route.get('/ls', function *() {
  this.body = 'yo man, this is the list of files';
}));

// $ GET /hello.txt
app.use(static('www'));

app.listen(3000);

console.log('listening on port 3000');
