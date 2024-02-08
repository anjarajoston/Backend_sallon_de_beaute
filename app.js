const express = require('express');
const port = 8282;
const app = express();
const requestHandlers = require('./requestHandlers');
const ConnectDb = require('./ConnectDb');
const Manager = require('./Manager');
const Employer = require('./Employer');
const Client = require('./Client');
const Utilitaire = require('./Utilitaire');
const path = require('path');
const classMapping = {
    Manager,
    Employer,
    Client,
};
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'public', 'views')); 
app.use(express.json())
const utilitaire = new Utilitaire()
app.get('/', async (req, res) => {
    res.status(201).json("Hello Word")
}).post('/login/:modele', async (req, res) => {
    const Connection = ConnectDb.db
    try {
        const login = req.body.email
        const mdp = req.body.mdp
        const modele = req.params.modele  
        const taille = await utilitaire.Seconnecter(Connection,modele,login,mdp)
        res.status(201).json("taille : "+taille)
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
}).post('/inscription/:modele', async (req, res) => {
    const Connection = ConnectDb.db
    try {
        const login = req.body.email
        const mdp = req.body.mdp
        const modele = req.params.modele 
        const taille = await utilitaire.Seconnecter(Connection,modele,login,mdp)
        const construct = classMapping[modele]
        if (construct) {
            const New = new constructor(req.body) 
            console.log(New)
            if (taille === 0) {
                await ConnectDb.db.collection(modele).insertOne(New);
            }
            res.status(201).json(New)
        }else{
            console.error('class non trouver')
        } 
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
}).get('/lister/:modele', async (req, res) => {
    try {
        const modele = req.params.modele 
        const collection = await ConnectDb.db.collection(modele)
        const listepersonne = await collection.find().toArray()
        res.status(201).json(listepersonne)
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
});
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});