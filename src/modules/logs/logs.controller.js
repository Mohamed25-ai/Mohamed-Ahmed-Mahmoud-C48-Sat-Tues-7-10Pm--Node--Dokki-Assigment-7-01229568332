import { Router } from "express";
import { db } from "../../db/db.connection.js";
import { addLogs } from "./logs.service.js";
import { successResponse } from "../../common/utils/success.response.js";
const router = Router();
export const logsRoutes = {
  base: "/logs",
};

router.post('/',async(req,res)=>{
    const data=await addLogs(req.body);
    return successResponse({res,data});
})


export default router;
