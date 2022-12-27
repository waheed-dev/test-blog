

export interface Markdown {
    title : string,
    description : string,
    content : string,
    slug : string,
    date : string,
}

export interface SearchContent extends Partial<Markdown> {
 category : string
}