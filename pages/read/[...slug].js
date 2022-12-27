import React from "react";
import {useRouter} from "next/router";
import Chapter from "../../components/Chapter";
import Post from "../../components/Post";
import Head from "next/head";

const Manga = ({data, slug}) => {
    if(typeof slug[1] !== "undefined"){
        return (<Chapter data={data} />)
    } else {
        return (<Post data={data} />)
    }
}
const getData = async (url) => {
    const slug = url[0]
    const chapter = url[1]
    let api = `${process.env.API_URL}/read/${slug}/`;
    if(typeof chapter !== "undefined"){
        api = `${api}${chapter}/`
    }
    const data = await fetch(api)
    return data.json()
}
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.slug)
    return { props: {data : myData, slug : context.params.slug}}
}

export default Manga;