import React from "react";
import {Breathing, Image} from "react-shimmer";
import Link from "next/link";
import {useRouter} from "next/router";
import Head from "next/head";
import Related from "./Related";
import {DiscussionEmbed} from "disqus-react";
import TimeAgo from 'javascript-time-ago'
import id from "javascript-time-ago/locale/id"

const Post = ({data}) => {
    const router = useRouter();
    const path = router.asPath
    TimeAgo.addDefaultLocale(id)
    const timeAgo = new TimeAgo("id_ID")

    const jsonSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "mainEntity":{
            "@type": "Book",
            "author": `${data.artists ? data.artists[0].name : "Komik UwU"}`,
            "bookFormat": "http://schema.org/EBook",
            "datePublished": `${data.publish_date}`,
            "image": `${data.poster}`,
            "name": `${data.title}`,
            "publisher": `${data.authors ? data.authors[0].name : "Komik UwU"}`,
            "workExample" : {
                "@context": "https://schema.org/",
                "@type": "Book",
                "name": `${data.title + " Latest Chapter"}`,
                "url" : `${process.env.NEXT_PUBLIC_SITE + data.manga_slug}`
            },
            "url" : `${process.env.NEXT_PUBLIC_SITE + data.manga_slug}`
        },
        "review" : {
            "@type" : "Review",
            "author" : {
                "@type" : "Person",
                "name" : "Komik UwU"
            },
            "dateModified" : `${data.modified_date}`,
            "datePublished" : `${data.publish_date}`,
            "itemReviewed": {
                "@type": "Book",
                "name": `${data.title}`
            },
            "reviewRating" : {
                "@type" : "Rating",
                "bestRating" : 10,
                "ratingValue" : (Math.random() * 5 + 5).toFixed(2),
                "worstRating" : 1,
            }
        },
    }

    const reverseList = () => {
        const birds = document.getElementById("chapter-list");
        let i = birds.childNodes.length;
        while (i--)
            birds.appendChild(birds.childNodes[i]);
    }
    const errorFall = (a) => {
        return (
            <Image alt="gambar error" src={`/default-poster.png`}
                   fallback={<Breathing width={320} height={426}/>}
                   fadeIn={true} NativeImgProps={{className: "w-80 object-cover rounded-xl"}}
            />
        )
    }
    const errorThumb = () => {
        return (
            <Image alt={"gambar error"} src={`/default-poster.png`}
                   fallback={<Breathing width={120} height={80}/>}
                   fadeIn={true} NativeImgProps={{className: "fadein rounded-l-xl"}}
            />
        )
    }
    return (<>
        <Head>
            <title>{data.seo.title}</title>
            <meta content={data.synopsis} name="description"/>
            <meta name="og:title" content={data.title}/>
            <meta name="og:description" content={data.synopsis}/>
            <script type="application/ld+json">
                {JSON.stringify(jsonSchema)}
            </script>
        </Head>
        <div className="w-auto pt-5">
            <div className="container my-6 mx-auto px-4 md:px-12" itemType={"https://schema.org/CreativeWork"} itemScope>
                <h1 className="font-bold text-5xl p-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-500 to-pink-500" itemProp={"name"}>{data.title}</h1>
                <div className="grid grid-flow-row gap-4 grid-cols-3 justify-center">
                    <div className="col-span-3 md:col-span-1 mx-auto">
                        <Image alt={data.title} itemProp="image" src={data.poster} width="214" height="315"
                               fallback={<Breathing width={320} height={426}/>}
                               fadeIn={true} NativeImgProps={{className: "w-80 object-cover rounded-xl"}}
                               errorFallback={() => errorFall(data.poster)}
                        />
                    </div>
                    <div
                        className="col-span-3 md:col-span-2 shadow-lg rounded-lg bg-gray-700 p-3 md:p-8 text-sm md:text-base text-white mx-auto">
                        <div className="grid grid-cols-6 mb-3">
                            <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Alternative:</div>
                            <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.alt_title}</div>
                        </div>
                        <div className="grid grid-cols-6 mb-3">
                            <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Type:</div>
                            <div className="col-end-7 col-span-4 md:col-span-5">{data.type}</div>
                        </div>
                        <div className="grid grid-cols-6  mb-3">
                            <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Status:</div>
                            <div className="col-end-7 col-span-4 md:col-span-5">{data.status}</div>
                        </div>
                        <div className="grid grid-cols-6  mb-3">
                            <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Genre(s):</div>
                            <div className="col-end-7 col-span-4 md:col-span-5">{
                                data.genres ? data.genres.map(genre => {
                                    return (
                                        <Link key={genre.term_id} href={"/archive/genre/" + genre.slug}
                                                 className="haduh inline-block mb-5 bg-gray-900 py-1 px-2 rounded mx-1 hover:bg-gray-800"
                                                 title={genre.name}>{genre.name}</Link>
                                    )
                                }) : ""
                            }</div>
                        </div>
                        <div className="grid grid-cols-6  mb-3">
                            <div
                                className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Author(s):
                            </div>
                            <div className="col-end-7 col-span-4 md:col-span-5">{
                                data.authors ? data.authors.map(author => {
                                    return (
                                        <Link key={author.term_id} href={"/archive/author/" + author.slug}
                                                 title={author.name}
                                                 className="bg-gray-900 py-1 px-2 rounded mx-1 hover:bg-gray-800"
                                                 itemID={author.term_id}>{author.name}</Link>
                                    )
                                }) : ""
                            }</div>
                        </div>
                        <div className="grid grid-cols-6  mb-3">
                            <div
                                className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Artist(s):
                            </div>
                            <div className="col-end-7 col-span-4 md:col-span-5">{
                                data.artists ? data.artists.map(artist => {
                                    return (
                                        <Link key={artist.term_id} href={"/archive/artist/" + artist.slug}
                                                 title={artist.name}
                                                 className="bg-gray-900 py-1 px-2 rounded mx-1 hover:bg-gray-800"
                                                 itemID={artist.term_id}>{artist.name}</Link>
                                    )
                                }) : ""
                            }</div>
                        </div>
                        <div className="mt-5 bg-gray-800 rounded-lg p-5">
                            <div className="font-bold text-cyan-500 w-24">Synopsis:</div>
                            <div itemProp={"description"}>{data.synopsis}</div>
                        </div>
                        {
                            data.chapters !== null ? (
                                <div className="grid grid-flow-col grid-cols-2 text-center mt-10 gap-4">
                                    <Link href={`${path}/` + data.chapters[data.chapters.length - 1].chapter_slug}
                                          className="border-solid border-red-600 rounded-3xl border py-2 hover:bg-red-500 hover:border-gray-300">Read
                                        First Chapter</Link>
                                    <Link href={`${path}/` + data.chapters[0].chapter_slug}
                                          className="border-solid border-red-600 rounded-3xl border py-2 hover:bg-green-500 hover:border-gray-300">Read
                                        Last Chapter</Link>
                                </div>
                            ) : ""
                        }
                    </div>
                </div>

                {

                        <div className="grid grid-cols-1 justify-center mt-10 w-4/5 mx-auto">
                            <div className="flex-flex-wrap">
                                <div className="w-1/2 float-left">
                                    <h1 className="
                           font-bold text-3xl text-white p-10
                           ">All Chapters</h1>
                                </div>
                                <div className="w-1/2 float-left">
                                    <button type="button" className="p-10 text-right float-right"
                                            onClick={() => reverseList()}
                                    >
                                        <Image alt={"Invert chapter"} src="/swap_vert.svg"
                                               fallback={<Breathing width={54} height={49}/>}
                                               fadeIn={true}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div id="chapter-list" className="flex flex-wrap mx-1 align-center justify-center" itemProp="hasPart" itemType="https://schema.org/PublicationVolume">
                                {
                                    data.chapters !== null ? data.chapters.map(chapter => {
                                        return (
                                            <div className="my-2 w-full md:w-1/2 lg:my-3 lg:w-1/3 shadow-black"
                                                 key={chapter.chapter_id} >
                                                <Link href={`${path}/` + chapter.chapter_slug}
                                                         className="mx-3 flex pr-3
                                           rounded-xl border border-solid border-purple-700
                                           text-white
                                           "
                                                >
                                                    <div className="float-left mr-5 inline-block">
                                                        <Image
                                                            src={chapter.thumb.replace("5ln1h5525y2q.kentut.xyz", "cdn.komikarea.id/5ln1h5525y2q.kentut.xyz") + "?resize=120,80"}
                                                            fallback={<Breathing width={120} height={80}/>}
                                                            fadeIn={true}
                                                            NativeImgProps={{className: "rounded-l-xl"}}
                                                            errorFallback={() => errorThumb()}
                                                            alt={`${data.title} ${chapter.chapter_name}`}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="justify-center flex-col">
                                                            <p itemProp="name" className="font-black text-md text-purple-300">{chapter.chapter_name}</p>
                                                            <meta itemProp="volumeNumber" content={chapter.chapter_index}/>
                                                            <span className="chapter-release-date"><i>{timeAgo.format(new Date(chapter.date).valueOf())}</i> </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    }) : "No Chapter"
                                }
                            </div>
                        </div>
                }
                <div className="bg-gray-800 rounded-lg md:rounded-2xl p-4 md:p-14 mt-10">

                    <DiscussionEmbed
                        className={data.id}
                        shortname='komik-uwu'
                        config={
                            {
                                url: data.manga_slug,
                                identifier: data.title,
                                title: data.seo.title,
                                language: 'en_ID'
                            }
                        }
                    />
                </div>
                <div className="flex">
                    <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Similar {data.type}
                    </h2>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4 align-center justify-center">
                    {
                        data.related.map((relate, i) => {
                            return <Related key={relate.id} content={relate}/>
                        })
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Post
