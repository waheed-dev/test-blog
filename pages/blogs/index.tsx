import PageLayout from "../../components/layout/pageLayout";
import Blogs from "../../components/blogs/Blogs";
import {getBlogs} from "../../lib/md";
import {Blog} from "../../interfaces/blog";
import {NextPage} from "next/types";
import {GetStaticProps} from "next";

type props = {
    blogs : Blog[]
}

const BlogPage : NextPage<props>  = ({blogs}) => {
    return (
        <div>
            <PageLayout pageTitle={'All Blogs'}>
                <h2 className={'text-2xl font-bold tracking-tight text-gray-900'}>
                    All Blogs
                </h2>
                <Blogs blogs={blogs}/>
            </PageLayout>
        </div>

    )
}

export const getStaticProps : GetStaticProps = () => {
    const blogs = getBlogs()

    return {
        props : {blogs}
    }
}

export default BlogPage