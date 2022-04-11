const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE

const app = server.listen(port,()=>{
    console.log(`server listening on port: ${port}`)
})
