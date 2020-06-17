import koa from 'koa';
import path from 'path';
import serve from 'koa-static';

const server = new koa();

server.use(serve(path.join(__dirname, 'public')));

server.listen({
  port: 5004,
}, () => {
  console.log('Server running at http://localhost:5004');
});
