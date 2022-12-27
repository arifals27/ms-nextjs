import React from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Head from "next/head";

const getData = async (page) => {
    const url = `${process.env.API_URL}/page/${page}/`
    const response = await fetch(url)
    const result = response.json()
    return result;
}
const loadData = () => {
    console.log("aku terpanggil")
}
const Home = ({data, header}) => {
    return(
        <>
            <Head>
                <title>{data.seo.title}</title>
                <meta content={data.seo.description} name="description"/>
                <meta name="og:title" content={data.seo.title}/>
                <meta name="og:description" content={data.seo.description}/>
                <meta name="og:url" content={header}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Latest Chapters
                        </h2>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 align-center justify-center">
                        {
                            data.itemLists !== null ? data.itemLists.map((content, i) => {
                                return <Card key={content.id} content={content}/>
                            })
                                : "No Data"
                        }
                    </div>
                </div>
            </div>
            <Pagination max={data.oldest_page} now={data.current_page}/>
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.id)
    return { props: {data : myData, header : context.req.headers.host}}
}

export default Home;
