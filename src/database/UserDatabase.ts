import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"
import { RecipeDatabase } from "./RecipeDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Cookenu_Users"

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return result[0]
    }

    public deleteUser = async (id: string) => {

        const isUserExist = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select("id")
            .where({ id })

        if (!isUserExist[0]) {
            throw new Error("Usuário não existe")
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({ creator_id: id })

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id })
    }
}