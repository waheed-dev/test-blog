import Image from "next/image";
import Link from "next/link";
import {FunctionComponent} from "react";
import {Boook} from "../../interfaces/book";
import {markWithEllipsis} from "../../lib/client/utils";

    type Props = {
        book : Boook[]
    }
const Book : FunctionComponent<Props> = ({book}) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {book.map((book) => (
                <div key={book.slug} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <Image
                            layout="fill"
                            src={book.coverImage}
                            alt={""}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                        <Link href={`/books/${book.slug}`}>
                            <a>
                                <span className="absolute inset-0" />
                                {markWithEllipsis(book.title) }
                            </a>
                        </Link>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">{ book.description }</p>
                </div>
            ))}
        </div>
    )
}

export default Book