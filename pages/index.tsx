import type {GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Blogs from "../components/blogs/Blogs";
import Portfolio from "../components/portfolio/Portfolio";
import BaseLayout from "../components/layout/BaseLayout";
import {getBlogs, getDir} from "../lib/md";
import {Blog} from '../interfaces/blog'
import {SearchContent} from "../interfaces/markdown";
import fs from "fs";
type props = {
    blogs: Blog[]
}
const Home: NextPage<props> = ({blogs}) => {
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
            <Link href="/portfolios">
                <a className='text-sm ml-1 text-indigo-600'>
                    (See All)
                </a>
            </Link>
        </h2>
        <Portfolio/>
    </BaseLayout>
        </>
    )
}

export const getStaticProps : GetStaticProps = () => {
    const blogs = getBlogs()
    const searchfile = getDir('/content/search/index.json')
    const searchItemList:SearchContent[] = []
    blogs.forEach((blog) => {
        const searchItem : SearchContent = {
            slug : blog.slug,
            description : blog.description,
            title : blog.title,
            category : 'blog'
        }
        searchItemList.push(searchItem)
    })
    fs.writeFileSync(searchfile,JSON.stringify(searchItemList,null,2))
    return {
        props : {blogs}
    }
}

export default Home
