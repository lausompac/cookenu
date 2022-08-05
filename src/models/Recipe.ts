export interface IRecipeDB {
    id: string,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    creator_id: string
}

export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private createdAt: Date,
        private updatedAt: Date,
        private creatorId: string
    ) {}

    public getId = () => {
        return this.id
    }

    public getTitle = () => {
        return this.title
    }

    public getDescription = () => {
        return this.description
    }

    public getCreatedAt = () => {
        return this.createdAt
    }

    public getUpdatedAt = () => {
        return this.updatedAt
    }

    public getCreatorId = () => {
        return this.creatorId
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setTitle = (newTitle: string) => {
        this.title = newTitle
    }

    public setDescription = (newDescription: string) => {
        this.description = newDescription
    }

    public setCreatedAt = (newCreatedAt: Date) => {
        this.createdAt = newCreatedAt
    }

    public setUpdatedAt = (newUpdatedAt: Date) => {
        this.updatedAt = newUpdatedAt
    }

    public setCreatorId = (newCreatorId: string) => {
        this.creatorId = newCreatorId
    }
}