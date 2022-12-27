import {Markdown} from './markdown'

export interface Blog extends Markdown {
    author : string,
    coverImage : string,
    authorImage : string
}