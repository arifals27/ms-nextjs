import React, {Component, useState} from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Head from "next/head";

const getData = async (page) => {
    const pages = page[0] === "manhwa" ? "manhwa-korea" : page[0] === "manga" ? "manga-jepang" : page[0] === "manhwa" ? "manhua-china" : ""
    const paged = typeof page[1] !== "undefined" ? page[1] : 1
    const url = `${process.env.API_URL}/${pages}/page/${paged}/`
    const response = await fetch(url)
    return response.json()
}
const Page = ({data, params}) => {
    const path = `${params[0]}`
    return(
        <>
            <Head>
                <title>{data.seo.title}</title>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Latest Chapters
                        </h2>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 align-center justify-center">
                        {
                            data.itemLists.map((content, i) => {
                                return <Card key={content.id} content={content}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <Pagination max={data.oldest_page} now={data.current_page} slug={`/page/${path}`} />
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.slug)
    return { props: {data : myData, params: context.params.slug} }
}

export default Page