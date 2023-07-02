const http=require('http');
const port=process.env.port || 3001;
const respond=require('./lib/respond.js')
const server=http.createServer(respond);
server.listen(port,()=>{
    console.log(`${port}`);
})