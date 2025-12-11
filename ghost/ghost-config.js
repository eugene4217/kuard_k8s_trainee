var path = require('path'),
    config;

config = {
    development: {
        url: process.env.GHOST_URL || 'http://localhost:2368',
        database: {
            client: process.env.DATABASE_CLIENT || 'mysql',
            connection: {
                host: process.env.DATABASE_HOST || 'mysql',
                user: process.env.DATABASE_USER || 'root',
                password: process.env.DATABASE_PASSWORD || 'root',
                database: process.env.DATABASE_NAME || 'ghost_db',
                charset: 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: process.env.PORT || '2368'
        },
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT || '/var/lib/ghost/content', '/')
        }
    }
};

module.exports = config;
