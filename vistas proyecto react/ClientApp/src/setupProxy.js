const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:9699';

const context =  [
    "/weatherforecast",
    "/api/cliente",
    "/api/ventum",
    "/api/categoria",
    "/api/detalleventa",
    "/api/entradum",
    "/api/imagen",
    "/api/permiso",//falta modificar la api para que convierta los campos tipo string 
    "/api/rol", 
    "/api/rolespermiso",
    "/api/usuario"
]; 

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {    secure: false,

    target: target,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
