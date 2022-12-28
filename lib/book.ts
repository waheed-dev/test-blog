import {getBlogBySlug, getDir, getFilesNames, getItemInPaths, markDownTOHtml} from "./md";

import {Book} from "../interfaces/book";
import {Blog} from "../interfaces/blog";
import {join} from "path";


const BOOK_DIR = getDir('/content/books')


const getBookFileNames = () => {
    return getFilesNames(BOOK_DIR)
}

const getBook = (fileName : string): Book => {
    const Book = getItemInPaths(join(BOOK_DIR,fileName)) as Book
    Book.slug = fileName.replace(/\.md$/,'')
    return Book
}
const getAllItems = (fileNames : string[]) => {
    const items = getBookFileNames().map((name) => getBook(name))
    return items
}
const getBookBySlug = (slug : string) => {
    const fileName = slug + '.md'
    return getBook(fileName)
}
const getBooksSlugs = () => {
    return getBookFileNames().map(names => names.replace(/\.md$/,''))
}
const getBookBySlugWithMarkdown = async (slug : string):Promise<Book> => {
    const book = getBookBySlug(slug)
    book.content = await markDownTOHtml(book.content)
    return book
}
const getBooks = () : Book[] => {
    const names = getBookFileNames()
    return getAllItems(names)
}

export {getBooks ,getBookBySlugWithMarkdown,getBooksSlugs}