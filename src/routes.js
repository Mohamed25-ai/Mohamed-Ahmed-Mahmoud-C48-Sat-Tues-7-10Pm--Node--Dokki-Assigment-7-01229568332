import {Router} from 'express';
import { booksRoutes } from './modules/books/books.controller.js';
import { collectionRoutes} from './modules/collection/collection.controller.js';
import { booksRouter, collectionRouter, logsRouter } from './modules/index.js';
import { logsRoutes } from './modules/logs/logs.controller.js';


export const router=Router();
router.use(collectionRoutes.base,collectionRouter);
router.use(booksRoutes.base,booksRouter);
router.use(logsRoutes.base,logsRouter);