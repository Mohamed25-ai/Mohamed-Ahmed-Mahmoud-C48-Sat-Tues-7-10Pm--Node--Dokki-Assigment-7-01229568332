import { Router } from "express";
import { addBook, deleteBooksBeforeYear, filterBooksAggregate1, filterBooksAggregate2, filterBooksAggregate3, filterBooksAggregate4, getBooksExcludeGenres, getBooksWithGenres, getBooksWithSkipLimit, getBooksWithYearRange, getBooksYearInteger, getBookWithTitle, insertBatchBooks, updateBook } from "./books.service.js";
import { successResponse } from "../../common/utils/success.response.js";

export const booksRoutes = {
  base: "/books",
  batch: "/batch",
  future: "/future",
  title:"/title",
  year:"/year",
  genre:"/genre",
  skip_limit:"/skip-limit",
  year_integer:"/year-integer",
  exclude_genres:"/exclude-genres",
  before_year:"/before-year",
  aggregate1:"/aggregate1",
  aggregate2:"/aggregate2",
  aggregate3:"/aggregate3",
  aggregate4:"/aggregate4"
};

const router = Router();

router.post("/", async (req, res) => {
  const data = await addBook(req.body);
  return successResponse({ res, data: data });
});

router.post(booksRoutes.batch, async (req, res) => {
  const data = await insertBatchBooks(req.body);
  return successResponse({ res, data: data });
});

router.patch(booksRoutes.future, async (req, res) => {
  const data = await updateBook(req.body);
  return successResponse({ res, data: data });
});

router.get(booksRoutes.title,async(req,res)=>{
  const data=await getBookWithTitle(req.query.title);
  return successResponse({res,data:data});
})

router.get(booksRoutes.year,async(req,res)=>{
  const data=await getBooksWithYearRange(req.query.from,req.query.to);
  return successResponse({res,data})
})

router.get(booksRoutes.genre,async(req,res)=>{
  const data=await getBooksWithGenres(req.query.genre);
  return successResponse({res,data});
});

router.get(booksRoutes.skip_limit,async (req,res)=>{
  const data=await getBooksWithSkipLimit();
  return successResponse({res,data});
})

router.get(booksRoutes.year_integer,async(req,res)=>{
  const data=await getBooksYearInteger();
  return successResponse({res,data})
})

router.get(booksRoutes.exclude_genres,async(req,res)=>{
    const data=await getBooksExcludeGenres();
    return successResponse({res,data}); 
})

router.get(booksRoutes.before_year,async(req,res)=>{
  const data=await deleteBooksBeforeYear(req.query.year);
  return successResponse({res,data});
});

router.get(booksRoutes.aggregate1,async(req,res)=>{
  const data=await filterBooksAggregate1();
  return successResponse({res,data});
})

router.get(booksRoutes.aggregate2,async(req,res)=>{
  const data=await filterBooksAggregate2();
  return successResponse({res,data});
})

router.get(booksRoutes.aggregate3,async(req,res)=>{
  const data=await filterBooksAggregate3();
  return successResponse({res,data});
})

router.get(booksRoutes.aggregate4,async(req,res)=>{
  const data=await filterBooksAggregate4();
  return successResponse({res,data});
})

export default router;
