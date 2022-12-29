import type {GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Blogs from "../components/blogs/Blogs";
import Book from "../components/books/Book";
import BaseLayout from "../components/layout/BaseLayout";
import {getBlogs, getDir, saveSearchData} from "../lib/md";
import {Blog} from '../interfaces/blog'
import {SearchContent} from "../interfaces/markdown";
import fs from "fs";
import {getBooks} from "../lib/book";
import {Boook} from "../interfaces/book";
type props = {
    blogs: Blog[],
    books : Boook[]
}
const Home: NextPage<props> = ({blogs,books}) => {
    return (
        <>
    <BaseLayout>

        <h2

            className="text-2xl font-bold tracking-tight text-gray-900">
            Newest Blogs
            <Link href="/blogs">
                <a className='text-sm ml-1 text-indigo-600'>
                    (See All)
                </a>
            </Link>
        </h2>
        <Blogs blogs={blogs}/>
        <br></br>
        <h2
            className="text-2xl font-bold tracking-tight text-gray-900">
            Portfolios
            <Link href="/books">
                <a className='text-sm ml-1 text-indigo-600'>
                    (See All)
                </a>
            </Link>
        </h2>
        <Book book={books}/>
    </BaseLayout>
        </>
    )
}

export const getStaticProps : GetStaticProps = () => {
    const blogs = getBlogs()
    const books = getBooks()
    const content = {blogs,books}
    // @ts-ignore
    saveSearchData(content)
    return {
        props : {blogs : blogs.slice(0,4),books : books.slice(0,4)}
    }
}

export default Home
