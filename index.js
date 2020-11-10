const http = require('http');
const backend = require('./Backend');
const backendserver = http.createServer(backend);//running on port 3090

const frontend = require('./Frontend');
const frontendserver = http.createServer(frontend);//running on port 3000

backendserver.listen(3090, () => {
    console.log('app working on 3090')
    frontendserver.listen(3000, ()=>{
        console.log('Front end render running')
    });
});

