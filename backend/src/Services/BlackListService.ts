import mongoClient from "../mongo-data-source";
import BlackList from "../Types/BlackList";

class BlackListService{

    public async inserirUsuario(idUsuario:number){
        var blackList = await this.pegarBlacklist()
        if(blackList.ids.includes(idUsuario))
            throw new Error("Usuário já deveria estar esquecido")
        else
            blackList.ids.push(idUsuario)
    }

    public async pegarBlacklist():Promise<BlackList>{
        await mongoClient.connect()
        const db = mongoClient.db("BlackList")
        return await db.collection("blacklist") as BlackList;
    }

}

export default new BlackListService()