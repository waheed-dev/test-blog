import fs, {readFileSync} from 'fs'
import {join} from 'path'
import  matter from "gray-matter";
import {ContentItemName, Markdown, MarkdownContent, SearchContent} from "../interfaces/markdown";
import {Blog} from "../interfaces/blog";
import {remark} from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import blogs from "../components/blogs/Blogs";
import {Boook} from "../interfaces/book";

export const getDir = (path : string) => {
    return join(process.cwd(),path)

}
type props = {
    blogs: Blog[],
    books : Boook[]
}
const BLOG_DIR = getDir('/content/blogs')

export const getFilesNames = (dir : string): string[] => {
    return fs.readdirSync(dir)
}

export const getItemInPaths = (filePath : string):Markdown => {
    const fileContent = readFileSync(filePath,"utf-8")
    const {data,content} = matter(fileContent)
    return {...data,content} as Markdown
}
export const getBlogFileNames = () => {
    return getFilesNames(BLOG_DIR)
}
const getBlog = (fileName : string): Blog => {
    const Blog = getItemInPaths(join(BLOG_DIR,fileName)) as Blog
    Blog.slug = fileName.replace(/\.md$/,'')
    return Blog
}
const getBlogsSlugs = () => {
    return getFilesNames(BLOG_DIR).map(names => names.replace(/\.md$/,''))
}
const getBlogBySlug = (slug : string) => {
    const fileName = slug + '.md'
    return getBlog(fileName)
}

export const getAllItems = (fileNames : string[]) => {
 const items = fileNames.map((name) => getBlog(name)).sort((a,b) => a.date > b.date ? -1 : 1)
    return items
}
const getBlogs = () : Blog[] => {
    const names = getBlogFileNames()
    return getAllItems(names)
}
export const markDownTOHtml = async (markdown : string) => {
     const result = await remark().use(remarkHtml).use(remarkGfm).process(markdown)
        return result.toString()
}

const getBlogBySlugWithMarkdown = async (slug : string):Promise<Blog> => {
    const blog = getBlogBySlug(slug)
    blog.content = await markDownTOHtml(blog.content)
    return blog
}

const saveSearchData = (content : MarkdownContent[]) => {
    const searchfile = getDir('/content/search/index.json')
    const searchItemList:SearchContent[] = []
    Object.keys(content).forEach((dateSource) => {
        const contentName = dateSource as ContentItemName
        console.log(contentName)
        // @ts-ignore
        content[contentName].forEach((data) => {
            const searchItem : SearchContent = {
                slug : data.slug,
                description : data.description,
                title : data.title,
                category : contentName
            }
            searchItemList.push(searchItem)
        })
    })

    fs.writeFileSync(searchfile,JSON.stringify(searchItemList,null,2))
}
export {
    getBlogs,
    getBlogsSlugs,
    getBlogBySlug,
    getBlogBySlugWithMarkdown,
    saveSearchData
}