module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'G7Sx5HQ3jM',
        password: process.env.MYSQL_PASS || 'VXxhHmmZ9M',
        database: process.env.MYSQL_DB || 'G7Sx5HQ3jM',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}