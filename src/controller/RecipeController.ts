import { Request, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { Authenticator } from "../services/Authenticator";

export class RecipeController {
    public getAllRecipes = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const title = req.query.title as string
            const sort = req.query.sort as string || "updated_at"
            const order = req.query.order as string || "ASC"
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const offset = (page - 1) * limit

            if (!token) {
                throw new Error("Token não informado")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                throw new Error("Token inválido")
            }

            if (title) {
                const recipeDatabase = new RecipeDatabase()
                const recipes = await recipeDatabase.getAllRecipes(title, sort, order, page, offset, limit)

                res.status(200).send({ recipes })
            } else {

                const recipeDatabase = new RecipeDatabase()
                const recipes = await recipeDatabase.getAllRecipes(null, sort, order, page, offset, limit)

                res.status(200).send({ recipes })
            }

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public createRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { title, description } = req.body

            if (!token) {
                errorCode = 401
                throw new Error("Token faltando")
            }

            if (!title || !description) {
                errorCode = 400
                throw new Error("Dados faltando")
            }

            if (title.length < 3 && description.length < 10) {
                errorCode = 401
                throw new Error("Título e descrição devem ter no mínimo 3 e 10 caracteres")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }

            const recipeDatabase = new RecipeDatabase()
            await recipeDatabase.createRecipe(title, description, payload.id)

            res.status(200).send({ message: "Receita criada com sucesso" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public editRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { id } = req.params
            const { title, description } = req.body

            if (!token) {
                errorCode = 401
                throw new Error("Token faltando")
            }

            if (!id || !title || !description) {
                errorCode = 400
                throw new Error("Dados faltando")
            }

            if (title.length < 3 && description.length < 10) {
                errorCode = 401
                throw new Error("Título e descrição devem ter no mínimo 3 e 10 caracteres")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }

            const isUserCreator = payload.id === id
            const isUserAdmin = payload.role === "ADMIN"

            if (!isUserCreator && !isUserAdmin) {
                errorCode = 401
                throw new Error("Você não tem permissão para editar esta receita")
            }

            const recipeDatabase = new RecipeDatabase()
            await recipeDatabase.editRecipe(id, title, description)

            res.status(200).send({ message: "Receita editada com sucesso" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deleteRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { id } = req.params

            if (!token) {
                errorCode = 401
                throw new Error("Token faltando")
            }

            if (!id) {
                errorCode = 400
                throw new Error("Dados faltando")
            }

            const recipeDatabase = new RecipeDatabase()
            const recipeDB = await recipeDatabase.findById(id)

            if (!recipeDB) {
                errorCode = 401
                throw new Error("Receita não encontrada")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }

            const isUserCreator = payload.id === recipeDB.creator_id
            const isUserAdmin = payload.role === "ADMIN"

            if (!isUserCreator && !isUserAdmin) {
                errorCode = 401
                throw new Error("Você não tem permissão para deletar esta receita")
            }

            await recipeDatabase.deleteRecipe(id)

            res.status(200).send({ message: "Receita deletada com sucesso" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}
