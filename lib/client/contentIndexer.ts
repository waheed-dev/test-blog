import searchIndex from './../../content/search/index.json'
import * as jsSearch from 'js-search'
import {SearchContent} from "../../interfaces/markdown";

class contentIndexer {
    private static instance : contentIndexer

    private searchEngine! : jsSearch.Search

    public static get Instance() {
        return this.instance || (this.instance = new this())
    }
    constructor() {
        this.buildIndex()
    }
    public search(query : string):SearchContent[] {
        const results = this.searchEngine.search(query)
        return results as SearchContent[]
    }

    private buildIndex () {
        this.searchEngine = new jsSearch.Search('slug')
        this.searchEngine.addIndex('title')
        this.searchEngine.addIndex('description')
        this.searchEngine.addDocuments(searchIndex)
    }}

export default contentIndexer.Instance