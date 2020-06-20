import koa from 'koa';
import websockify from 'koa-websocket';
import path from 'path';
import serve from 'koa-static';
import route from 'koa-route';
import AudioBroadcaster from './audioBroadcater';

const server = websockify(new koa());
const audioBroadcaster = new AudioBroadcaster();

server.ws.use(route.all('/audio/:id', ctx => {
  audioBroadcaster.subscribe(ctx.websocket)
}));

server.use(serve(path.join(__dirname, 'public')));

server.listen({
  port: 5004,
}, () => {
  console.log('Server running at http://localhost:5004');
});
