import { IRecipeDB, Recipe } from "../models/Recipe";
import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = "Cookenu_Recipes"

    public createNewId = async () => {
        const result = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("id")
            .orderBy("id", "DESC")
            .limit(1)


        return Number(result[0].id) + 1
    }

    public findById = async (id: string) => {
        const result = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("*")
            .where({ id })

        return result[0]
    }

    public getAllRecipes = async (title: string, sort: string, order: string, page: number, offset: number, limit: number) => {
        if (title) {
            console.log("title database", title)
            const checkRecipe: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where("title", "LIKE", `%${title}%`)
            .orderBy(sort, order)
            .limit(limit)
            .offset(offset)
           

            if (checkRecipe.length === 0) {
                throw new Error("Receita não encontrada")

            }
            return checkRecipe
        }

        const result = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("*")
            .orderBy(sort, order)
            .limit(limit)
            .offset(offset)
            
        return result



    }

    public createRecipe = async (title: string, description: string, id: string) => {
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert({
                id: (await this.createNewId()).toString(),
                title,
                description,
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now()),
                creator_id: id
            })
    }

    public editRecipe = async (id: string, title: string, description: string) => {

        const isRecepieExist = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("id")
            .where({ id })

        if (!isRecepieExist[0]) {
            throw new Error("Receita não existe")
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .update({
                title,
                description,
                updated_at: new Date(Date.now())
            })
            .where({ id })
    }

    public deleteRecipe = async (id: string) => {
        const isRecepieExist = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("id")
            .where({ id })

        if (!isRecepieExist[0]) {
            throw new Error("Receita não existe")
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({ id })
    }
}