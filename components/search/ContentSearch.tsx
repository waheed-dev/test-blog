import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import {ChangeEvent, useEffect, useRef, useState} from "react";
import * as jsSearch from 'js-search'
import searchIndex from '../../content/search/index.json'
import contentIndexer from "../../lib/client/contentIndexer";
import {SearchContent} from "../../interfaces/markdown";
import Link from "next/link";
import {useRouter} from "next/router";



const ContentSearch = () => {
    const [results ,setResults] = useState<SearchContent[]>([])
    const router = useRouter()
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    const clickListenerHandler = () => {
        setResults([]);
        setQuery("");
    }
    useEffect(() => {
        const callback = (event: MouseEvent) => {
            if (
                results.length > 0 &&
                ref.current &&
                !ref.current.contains(event.target as Node))
            {
                clickListenerHandler();
            }
        }
        const escapeHandler = (event : KeyboardEvent) => {
            if (event.key === 'Escape' && results.length > 0) {
                clickListenerHandler()
            }
        }

        document.addEventListener("click", callback);
        document.addEventListener("keydown", escapeHandler);

        return () => {
            document.removeEventListener("click", callback);
        }
    }, [results.length])



const contentSearch = (event : ChangeEvent<HTMLInputElement>) => {
       const {value} = event.target
        const result = contentIndexer.search(value)
        setResults(result)
        setQuery(value)
    }

    return (
        <>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    ref={ref}
                    value={query}
                    onChange={contentSearch}
                    id="search-input"
                    autoComplete="off"
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search for anything"
                />
            </div>
            {
                 results.length > 0  &&  <ul
                    className="w-80 border-solid border rounded-md z-10 bg-white max-h-80 overflow-auto absolute select is-multiple"
                    role="listbox">
                    {results.map(res =>  <li
                        onClick={() =>router.push(`${res.category}/${res.slug}`)}
                        key={res.slug}
                        className={`hover:bg-indigo-600 hover:text-white p-3 relative cursor-pointer`}>
                        <div className="font-bold text-sm truncate">{res.title}</div>
                        <p className="truncate text-sm">{res.description}</p>
                        <span
                            className="mt-2 text-xs text-white bg-gray-800 px-2 py-1 rounded-xl">{res.category}
          </span>
                    </li>)}
                </ul>
            }

        </>
    )
}

export default ContentSearch;