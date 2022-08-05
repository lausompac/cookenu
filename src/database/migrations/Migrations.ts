import { BaseDatabase } from "../BaseDatabase"
import { RecipeDatabase } from "../RecipeDatabase"
import { UserDatabase } from "../UserDatabase"
import { recipes, users } from "./data"

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("Error in migrations...")
            console.log(error.message)
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS 
        ${RecipeDatabase.TABLE_RECIPES},
        ${UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            nickname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${RecipeDatabase.TABLE_RECIPES}(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL,
            creator_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (creator_id) REFERENCES ${UserDatabase.TABLE_USERS}(id)
        );
        `)
    }

    insertData = async () => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(users)

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(recipes)
    }
}

const migrations = new Migrations()
migrations.execute()