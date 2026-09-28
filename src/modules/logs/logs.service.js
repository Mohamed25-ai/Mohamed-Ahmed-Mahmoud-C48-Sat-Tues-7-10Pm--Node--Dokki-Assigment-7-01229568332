import { db } from "../../db/db.connection.js";

export const addLogs = async (inputs) => {
    const{book_id,action}=inputs;
    if(!book_id||!action){
        throw new Error("book_id and action are required");
    }
    const insertLog=await db.collection('cappedLogs').insertOne(inputs);
    return insertLog;
};
