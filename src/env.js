export const environment = {

    api: {
        port: process.env.DEV_PORT || 7071,
        host: process.env.LOCALHOST || 'http://127.0.0.1'
    },
    mongo: {
        databaseName: process.env.DATABASE_NAME,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        cluster: process.env.CLUSTER,
        URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    },
    cookie: {
        secret: process.env.COOKIE_SECRET,
        options: {
            maxAge: 7000*60,
            signed: process.env.COOKIE_SIGNED,
            httpOnly: process.env.COOKIE_HTTP_ONLY,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    mail: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        port: process.env.MAIL_PORT,
    }
}