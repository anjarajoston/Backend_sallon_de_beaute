const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://tpwebavance:tpwebavance@cluster0.blpn5sd.mongodb.net/'
const dbname = 'Group0'
class ConnectDb{
    constructor(){
        this.connecter()
    }
    async connecter() {
        try {
            this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            this.client.connect();
            this.db = this.client.db(dbname); 
            console.log('Connecter a la base de donnee MongoDB')
        } catch (error) {
            console.error('erreur sur : ', error)
        }
    }
}
module.exports = new ConnectDb()