import {Markdown} from "./markdown";

export interface Boook  extends Markdown {
    author: string;
    coverImage : string;
    category : string
    downloadLink : string
}