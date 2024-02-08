const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbname = 'local'
class ConnectDb{
    constructor(){
        this.connecter()
    }
    async connecter() {
        try {
            this.client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
            this.client.connect();
            this.db = this.client.db(dbname); 
            console.log('Connecter a la base de donnee MongoDB')
        } catch (error) {
            console.error('erreur sur : ', error)
        }
    }
}
module.exports = new ConnectDb()