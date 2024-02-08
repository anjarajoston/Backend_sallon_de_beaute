class Utilitaire{
    async Seconnecter(Connection,modele,login,mdp){
        const collection = Connection.collection(modele)
        const listepersonne = await collection.find({"email": login,"mdp": mdp}).toArray()
        return listepersonne.length;
    }
}
module.exports = Utilitaire