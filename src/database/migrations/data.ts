import { IRecipeDB } from "../../models/Recipe"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        nickname: "BelaGil",
        email: "belagil@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
        role: USER_ROLES.ADMIN
    },
    {
        id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f",
        nickname: "Fulilin",
        email: "fulano@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
        role: USER_ROLES.NORMAL
    },
    {
        id: "7079b8e4-95cd-48aa-82a9-77454e94b789",
        nickname: "Ciclanin",
        email: "ciclana@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
        role: USER_ROLES.NORMAL
    }
]

export const recipes: IRecipeDB[] = [
    {
        id: "101",
        title: "Bife acebolado",
        description: "Bife bem daora com cebola",
        created_at: new Date("2022/08/02"),
        updated_at: new Date("2022/08/02"),
        creator_id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f"
    },
    {
        id: "102",
        title: "Panqueca de carne",
        description: "Panqueca daora com carne moída e molho de tomate",
        created_at: new Date("2022/08/03"),
        updated_at: new Date("2022/08/03"),
        creator_id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b"
    },
    {
        id: "103",
        title: "Kibe",
        description: "Kibe de trigo com alho-poro",
        created_at: new Date("2022/08/03"),
        updated_at: new Date("2022/08/03"),
        creator_id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f"
    }
]