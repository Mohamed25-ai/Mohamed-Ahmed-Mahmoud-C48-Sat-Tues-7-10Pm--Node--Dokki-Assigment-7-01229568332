import { ObjectId } from "mongodb";
import { booksModel } from "../../models/books.model.js";
import { db } from "../../db/db.connection.js";

export const addBook = async (inputs) => {
  const { title, author, year, genres } = inputs;
  if (!title || !author) {
    throw new Error("Title and author are required", {
      cause: { status: 409 },
    });
  }
  const insertBook = await booksModel.insertOne(inputs);
  return insertBook;
};

export const insertBatchBooks = async (inputs) => {
  inputs.map((input) => {
    if (!input.title || !input.author) {
      throw new Error("Title and author are required", {
        cause: { status: 409 },
      });
    }
  });
  const batch = await booksModel.insertMany(inputs);
  return batch;
};

export const updateBook = async (inputs) => {
  const { title, year } = inputs;
  if (!title || !year) {
    throw new Error("title and year are required", { cause: { status: 409 } });
  }
  const update = await booksModel.updateOne(
    { title: title },
    { $set: { year: year } },
  );
  return update;
};

export const getBookWithTitle = async (title) => {
  if (!title) {
    throw new Error("book not found", { cause: { status: 404 } });
  }
  const findBook = await booksModel.findOne({ title: title });
  if (!findBook) {
    throw new Error("book not found", { cause: { status: 404 } });
  }
  return findBook;
};

export const getBooksWithYearRange = async (from, to) => {
  if (!from || !to) {
    throw new Error("year range is required", { cause: { status: 404 } });
  }
  const findYear = await booksModel
    .find({ year: { $gte: Number(from), $lte: Number(to) } })
    .toArray();
  return findYear;
};

export const getBooksWithGenres = async (genres) => {
  if (!genres) {
    throw new Error("book not found", { cause: { status: 404 } });
  }
  const bookWithGenres = await booksModel.find({ genres: genres }).toArray();
  return bookWithGenres;
};

export const getBooksWithSkipLimit = async () => {
  const books = await booksModel
    .find()
    .skip(2)
    .limit(3)
    .sort({ year: -1 })
    .toArray();
  return books;
};

export const getBooksYearInteger = async () => {
  const booksYearInt = await booksModel
    .find({ year: { $type: "int" } })
    .toArray();
  return booksYearInt;
};

export const getBooksExcludeGenres = async () => {
  const bookExcludeGenres = await booksModel
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();
  return bookExcludeGenres;
};

export const deleteBooksBeforeYear = async (year) => {
  if (!year) {
    throw new Error("year is required", { cause: { status: 409 } });
  }
  const deleteBooksSpecificBeforYear = await booksModel.deleteMany({
    year: { $lte: year },
  });
  return deleteBooksSpecificBeforYear;
};

export const filterBooksAggregate1 = async () => {
  const filterBooksWithAggregate1 = await booksModel
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $sort: { year: -1 },
      },
    ])
    .toArray();
  return filterBooksWithAggregate1;
};

export const filterBooksAggregate2 = async () => {
  const filterBooksWithAggregate2 = await booksModel
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();
  return filterBooksWithAggregate2;
};

export const filterBooksAggregate3 = async () => {
  const filterBooksWithAggregate3 = await booksModel
    .aggregate([
      {
        $unwind: {
          path: "$genres",
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          genres: 1,
        },
      },
    ])
    .toArray();
  return filterBooksWithAggregate3;
};

export const filterBooksAggregate4 = async () => {
  const filterBooksWithAggregate4 = await db
    .collection("cappedLogs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          book_details: {
            title: 1,
            author: 1,
            year: 1,
          },
        },
      },
    ])
    .toArray();
  return filterBooksWithAggregate4;
};
