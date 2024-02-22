class Utilitaire{
    async Seconnecter(Connection,modele,login,mdp){
        const collection = Connection.collection(modele)
        const listepersonne = await collection.find({"email": login,"mdp": mdp}).toArray()
        const taille = listepersonne.length
        let id = 0;
        if (taille == 1) {
            id = listepersonne[0]._id
            return id;
        }return 0;
    }
}
module.exports = Utilitaire