import {GetStaticPaths, NextPage} from 'next/types'
import PageLayout from "../../components/layout/pageLayout";
import {getBlogBySlugWithMarkdown, getBlogsSlugs} from "../../lib/md";
import {Blog} from "../../interfaces/blog";
import {GetStaticProps} from "next";
import {ParsedUrlQuery} from "querystring";
import BlogHeader from "../../components/layout/BlogHeader";

type props ={
    blog : Blog
}

const BlogDetail: NextPage<props> = ({blog}) => {
    return (
        <>
            <PageLayout pageTitle = {blog.title}>
                <div className=" w-80  sm:w-3/4 md:w-2/3 lg:w-2/3 m-auto">
                    <BlogHeader blog={blog}  />
                    <article className="prose  prose-lg md:prose-xl lg:prose-xl  markdown-image-40">
                        <div dangerouslySetInnerHTML={{__html : blog.content}}></div>
                    </article>
                </div>
            </PageLayout>
        </>
    )
}

interface params extends ParsedUrlQuery {
    slug : string
}
export const getStaticProps : GetStaticProps<props,params> =async (context : any) => {
    const {slug} = context.params
    const blog = await getBlogBySlugWithMarkdown(slug)
    console.log(blog)
    return {
        props : {
            blog
        }
    }

}

export const getStaticPaths : GetStaticPaths = () => {
    const slugs = getBlogsSlugs();
    const paths = slugs.map(slug => ({params : {slug}}))
    return {
        paths,
        fallback : false
    }
}

export default BlogDetail;