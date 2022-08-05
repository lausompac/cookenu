import { Router } from 'express'
import { RecipeController } from '../controller/RecipeController'

export const recipeRouter = Router()

const recipeController = new RecipeController()

recipeRouter.get("/", recipeController.getAllRecipes)
recipeRouter.post("/", recipeController.createRecipe)
recipeRouter.put("/:id", recipeController.editRecipe)
recipeRouter.delete("/:id", recipeController.deleteRecipe)