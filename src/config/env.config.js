import pathModule from 'path'
import { config } from "dotenv";
const envPath=pathModule.resolve(`.env.${process.env.NODE_ENV??"development"}`)
config({path:envPath});

export const PORT=process.env.PORT;
export const DB_URI=process.env.DB_URI;
