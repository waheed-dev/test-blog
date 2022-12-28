import Head from "next/head";
import NavBar from "../common/NavBar";
import Header from "../common/Header";
import Image from "next/image";
import Link from "next/link";
import Blogs from "../blogs/Blogs";
import Book from "../books/Book";
import Footer from "../common/Footer";

const BaseLayout = ({children} : any) => {
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 space-y-8 sm:px-6 lg:px-8">
                <Head>
                    <title>Portfolio - Filip Jerga</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="relative">
                    <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                        <NavBar/>
                        <Header/>
                    </div>
                    <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <Image
                            priority
                            layout="fill"
                            alt=""
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
                            src="https://img.freepik.com/free-vector/illustration-university-graduates_53876-28466.jpg?w=740&t=st=1669879619~exp=1669880219~hmac=4e0bbab2d651c63aa486ccbc8ac5a0c6275d2bf2cdc1def9f7962b83af7c3332"
                        />
                    </div>
                </div>

                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BaseLayout