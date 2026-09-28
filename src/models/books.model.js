import { db } from "../db/db.connection.js";

export const booksModel=await db.createCollection("books",{
    validator:{
        $jsonSchema:{
            required:["title"]
        }
    }
});