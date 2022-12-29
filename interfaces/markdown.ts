import {Blog} from "./blog";
import {Boook} from "./book";


export interface Markdown {
    title : string,
    description : string,
    content : string,
    slug : string,
    date : string,
}

export interface MarkdownContent {
    blog : Blog[]
    book : Boook[]
}
export type ContentItemName = keyof MarkdownContent
export interface SearchContent extends Partial<Markdown> {
 category : string
}