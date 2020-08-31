
require('dotenv').config();

const reqConfigVals = ['UPLOAD_DIR', 'DB_URI', 'DB_USER', 'DB_PSWD', 'DB_SCHEMA', 'HTTP_PORT', 'HTTP_HOST', 'AUTH_STRATGY', 'HTTP_HOST', 'HTTP_PORT'];


reqConfigVals.forEach(param => {
    if(!(param in process.env)) {
        console.error(`Env var ${param} missing!`)
        process.exit(1)
    }
});

const dbConfig = {
    url: String(process.env.DB_URI).trim(),
    user: String(process.env.DB_USER).trim(),
    pswd: String(process.env.DB_PSWD).trim(),
    schema: String(process.env.DB_SCHEMA).trim()
}

const authConfig = {
    stratgy : String(process.env.AUTH_STRATGY).trim()
}


const path = require('path');

const webServerConfig = {
    host: String(process.env.HTTP_HOST).trim(),
    port: Number(process.env.HTTP_PORT),
    uploadDir: path.join(__dirname, String(process.env.UPLOAD_DIR))
}

module.exports.getConfig = () => ({dbConfig, authConfig, webServerConfig});
