const config = {
    session: {
        secret: 'SECRET_KEY',
        db: {
            uri: 'mongodb+srv://Carlos:Qox91289@cluster0.zn0ou.mongodb.net/sessions?retryWrites=true&w=majority',
            collection: 'data'
        }
    }
}

module.exports = config