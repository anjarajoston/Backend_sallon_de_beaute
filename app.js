const express = require('express');
const cors = require('cors')
const port = 8282;
const app = express();
const requestHandlers = require('./requestHandlers');
const ConnectDb = require('./ConnectDb');
const { ObjectId  } = require('mongodb')
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
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
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
        res.status(201).json(taille)
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
                res.status(201).json(New)
            }else{
                res.status(201).json(0)
            }
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
}).get('/recherche/:modele/:motcle', async (req, res) => {
    try {
        const modele = req.params.modele 
        const motcle = req.params.motcle 
        const collection = await ConnectDb.db.collection(modele)
        const listepersonne = await collection.find(
            {
                $or: [
                    { nom: {$regex: motcle, $options: 'i'} },
                    { prenom: {$regex: motcle, $options: 'i'} },
                    { email: {$regex: motcle, $options: 'i'} },
                  ]
            }
        ).toArray()
        res.status(201).json(listepersonne)
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
}).get('/getById/:modele/:id', async (req, res) => {
    try {
        const modele = req.params.modele 
        const id = req.params.id  
        const collection = await ConnectDb.db.collection(modele)
        const listepersonne = await collection.find({"_id": new ObjectId(id)}).toArray()
        res.status(201).json(listepersonne)
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
}).get('/getHoraire/:id', async (req, res) => {
    try {
        const modele = "Horaire"
        const id = req.params.id  
        const collection = await ConnectDb.db.collection(modele)
        const listepersonne = await collection.find({"employer._id": id}).toArray()
        res.status(201).json(listepersonne)
    } catch (error) { 
        console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
}).get('/updateHoraire/:jour/:id/:nouveaurentrer', async (req, res) => {
    try {
        const modele = "Horaire"
        const id = req.params.id  
        const jour = req.params.jour  
        const nouveaurentrer = req.params.nouveaurentrer  
        const collection = await ConnectDb.db.collection(modele)
        const filter = { _id: new ObjectId(id) }; // Filtrer le document à mettre à jour par son _id
        const update = {
            $set: {
              [jour] : {
                rentrer : nouveaurentrer,
                duree : 8
              },
              // Ajoutez d'autres champs à mettre à jour selon vos besoins
            }
          };
        const result = await collection.updateOne(filter, update);
        res.status(201).json(result)
    } catch (error) { 
        // console.error(error)
        res.status(500).send('Erreur de Serveur')
    }
});
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});