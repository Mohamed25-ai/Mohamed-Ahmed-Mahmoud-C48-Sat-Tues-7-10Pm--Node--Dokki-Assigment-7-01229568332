import { Router } from "express";
import { addAuthor, addBook, addCappedLogs, createBookIndex } from "./collection.service.js";
import { successResponse } from "../../common/utils/index.js";

const router = Router();
export const collectionRoutes = {
  base: "/collection",
  books: "/books",
  authors: "/authors",
  cappedCollection:"/logs/capped",
  createBookIndex:"/books/index"
};

router.post(collectionRoutes.books, async (req, res) => {
  const data = await addBook(req.body);
  return successResponse({ res, message: { ok: 1 }, status: 201 });
});

router.post(collectionRoutes.authors, async (req, res, next) => {
  const data = await addAuthor(req.body);
  return successResponse({ res,data});
});

router.post(collectionRoutes.cappedCollection,async(req,res)=>{
  const data=await addCappedLogs();
  return successResponse({res:res,message:{ok:1}})
})
router.post(collectionRoutes.createBookIndex,async(req,res)=>{
    await createBookIndex();
    return successResponse({res,message:"index created"})
})
export default router;
