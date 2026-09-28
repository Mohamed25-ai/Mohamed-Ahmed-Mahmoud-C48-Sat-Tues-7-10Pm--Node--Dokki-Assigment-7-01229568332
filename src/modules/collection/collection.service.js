import { db } from "../../db/db.connection.js";
import { booksModel } from "../../models/books.model.js";

export const addBook = async (inputs) => {
    const {title}=inputs;
    if(!title){
        throw new Error("Book title is required",{cause:{status:409}});
    }
    const insertBook=await booksModel.insertOne(inputs);
    return insertBook;
};

export const addAuthor=async(inputs)=>{
    const {name,nationality}=inputs;
    if(!name||!nationality){
        throw new Error("Name and Nationality are required",{cause:{status:409}});
    }
    const insertAuthor=await db.collection('authors').insertOne({name:name,nationality:nationality});
    return insertAuthor;
}

export const addCappedLogs=async()=>{
    const createCapped=await db.createCollection("cappedLogs",{capped:true,size:1048576});
    return createCapped;
}

export const createBookIndex=async()=>{
   const createIndex= await booksModel.createIndex({title_1:1});
   return createIndex
}