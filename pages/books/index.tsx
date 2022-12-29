
import PageLayout from "../../components/layout/pageLayout";
import Blogs from "../../components/blogs/Blogs";
import {getBlogs} from "../../lib/md";
import {Blog} from "../../interfaces/blog";
import {NextPage} from "next/types";
import {GetStaticProps} from "next";
import {getBooks} from "../../lib/book";
import {Boook} from "../../interfaces/book";
import Book from "../../components/books/Book";

type props = {
    books : Boook[]
}

const BooksPage : NextPage<props>  = ({books}) => {
    return (
        <div>
            <PageLayout pageTitle={'All Books'}>
                <h2 className={'text-2xl font-bold tracking-tight text-gray-900'}>
                    All Blogs
                </h2>
                <Book book={books}/>
            </PageLayout>
        </div>

    )
}

export const getStaticProps : GetStaticProps = () => {
    const books = getBooks()
    return {
        props : {books}
    }
}
export default BooksPage