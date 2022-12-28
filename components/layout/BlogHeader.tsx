import {Blog} from "../../interfaces/blog";
import {FunctionComponent} from "react";
import Image from "next/image";

type props = {
    blog : Blog
}

const BlogHeader : FunctionComponent<props> = ({blog}) => {

    return (
        <div className="blog-detail-header">

            <h1 className="font-bold text-4xl mb-1">{blog.title}</h1>
            <div className="flex flex-row justify-between mb-6 mt-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#">
                            <span className="sr-only">{blog.author}</span>
                            <div className="relative h-10 w-10 !mb-0" >
                                <Image
                                    priority
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                    src={blog.authorImage} alt=""
                                />
                            </div>
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 !mb-0">
                            <a href="#" className="hover:underline">
                                {blog.author}
                            </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="{date}">{blog.date}</time>
                        </div>
                    </div>
                </div>
                <div className="flex self-end">
                   <p>sad</p>
                </div>
            </div>
            <h2 className="blog-detail-header-subtitle mb-2 text-xl text-gray-600">{blog.description}</h2>
            <div className="md:h-96 h-72 mt-4 bg-black mx-auto w-full relative">
                <Image
                    priority
                    layout="fill"
                    objectFit="cover"
                    src={blog.coverImage} alt=""
                />
            </div>
        </div>
    )

}

export default BlogHeader