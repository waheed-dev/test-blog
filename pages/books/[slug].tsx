import {GetStaticPaths, NextPage} from "next/types";
import PageLayout from "../../components/layout/pageLayout";
import {ParsedUrlQuery} from "querystring"
import Image from "next/image";
import {GetStaticProps} from "next";
import {Boook} from "../../interfaces/book";
import {getBookBySlugWithMarkdown, getBooksSlugs} from "../../lib/book";

type props ={
    book : Boook
}

const BookDetail : NextPage<props> = ({book}) => {
    console.log(book)
    return (
        <PageLayout pageTitle={book.title}>
            <div className="pt-6">
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{book.title}</h1>
                    </div>
                    <div className="mt-4 lg:row-span-3 lg:mt-0 relative ">
                        <Image
                            layout="fill"
                            className="h-12 w-3/4 object-cover sm:h-72 md:h-96 lg:h-full"
                            alt=""
                            src={book.coverImage}
                        />
                    </div>
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{book.description}</p>
                            </div>
                        </div>

                        <a href={book.downloadLink}>
                        <button
                            className="bg-green-400 mt-4 hover:bg-green-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                            </svg>
                            <span>Download</span>
                        </button>
                        </a>
                        <div className="mt-10">

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {book.author}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>
                            <div className="mt-4 space-y-6">
                                <article className="prose  prose-lg md:prose-lg lg:prose-lg  markdown-image-40">
                                    <div dangerouslySetInnerHTML={{__html : book.content}}></div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}


interface params extends ParsedUrlQuery {
    slug : string
}
export const getStaticProps : GetStaticProps<props,params> =async (context : any) => {
    const {slug} = context.params
    const book = await getBookBySlugWithMarkdown(slug)
    console.log(book)
    return {
        props : {
            book
        }
    }

}

export const getStaticPaths : GetStaticPaths = () => {
    const slugs = getBooksSlugs();
    const paths = slugs.map(slug => ({params : {slug}}))
    return {
        paths,
        fallback : false
    }
}


export default BookDetail