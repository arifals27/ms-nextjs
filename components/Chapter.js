import React from "react";
import Link from "next/link";
import {Dropdown} from "flowbite-react";
import {Breathing, Image} from "react-shimmer";
import { DiscussionEmbed } from 'disqus-react';
import Head from "next/head";
import Related from "./Related";
import {AiTwotoneHome} from "react-icons/ai";


const Chapter = ({data}) => {
    const mangaSlug = data.manga_slug
    return (<>
        <Head>
            <title>{data.seo.title}</title>
            <meta content={data.synopsis} name="description"/>
            <meta name="og:title" content={data.title}/>
            <meta name="og:description" content={data.synopsis}/>
        </Head>
        <div className="w-auto pt-5">
            <div className="container my-6 mx-auto px-0 md:px-4 md:px-12">
                <div className="mb-10" itemType={"https://schema.org/CreativeWork"} itemScope>
                    <h1 className="text-3xl p-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-500 to-pink-500 font-extrabold" itemProp={"name"}>{data.title} {data.chapter}</h1>
                    <div className="text-center" itemProp={"description"}>
                        All chapter are in <a className="text-purple-500 font-bold" href={mangaSlug}>{data.title}</a>
                    </div>
                    <h3 className="text-center">Read the latest comic {data.title} {data.chapter} at {process.env.NEXT_PUBLIC_SITE_TITLE} .
                        The comic, {data.title} is always updated at {process.env.NEXT_PUBLIC_SITE_TITLE}.
                        Dont forget to read the other comic updates.
                        A list of comics collections {process.env.NEXT_PUBLIC_SITE_TITLE} can be checked on the menu list.</h3>
                    <div className="grid grid-col-6 gap-1 mt-5 justify-items-center texzt">
                        <div key={1} className="col-start-1 grid">
                            {
                                data.prev_link ? (
                                        <Link key={1} href={`${mangaSlug}${data.prev_link.chapter_slug}`}
                                           className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            Previous
                                        </Link>
                                ) : (
                                    <Link key={1} href={mangaSlug}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <AiTwotoneHome className="w-5 h-5 mr-2"/>
                                        Info
                                    </Link>
                                )
                            }

                        </div>
                        <div key={2} className="col-start-3 col-span-2 grid">
                            <Dropdown
                                label={data.chapter}
                                dismissOnClick={false}
                                className="bg-gradient-to-br from-purple-800 to-gray-800 "
                            >
                                <div className="overflow-y-auto no-scrollbar max-h-96 w-80">
                                    {
                                        data.chapters.map(chapter =>{
                                            let noww = data.id === parseInt(chapter.chapter_id);
                                            return (
                                                <Dropdown.Item key={data.chapter_id} className={`overflow - y - auto ${(noww) ? 'bg-gray-900 disabled' : ''}`}>
                                                    <Link className={`w-full h-fit hover:text-purple-900 hover:font-bold ${(noww) ? 'text-yellow-300' : 'text-white'}`} href={`${mangaSlug}${chapter.chapter_slug}`}>{chapter.chapter_name}</Link>
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                </div>
                            </Dropdown>
                        </div>
                        <div key={3} className="col-end-7 grid">
                            {
                                data.next_link ? (
                                        <Link key={2} href={`${mangaSlug}${data.next_link.chapter_slug}`}
                                           className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            Next
                                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </Link>
                                    ) : (
                                    <Link key={2} href={mangaSlug}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Info
                                        <AiTwotoneHome className="w-5 h-5 ml-2"/>
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                </div>
                <div key={4} className="mt-10">
                    <div className="grid grid-flow-row grid-cols-1 mx-auto justify-items-center">
                        {
                            data.images ? data.images.map((image, i) => {
                                const img = image.src.replace("5ln1h5525y2q.kentut.xyz", "cdn.komikarea.id/5ln1h5525y2q.kentut.xyz")
                                return (
                                    <Image alt={`${data.title} ${data.chapter} #${i}`} key={i} src={img} fallback={<Breathing key={i} width="{900}" height={600} className="w-screen h-screen" />}
                                           fadeIn={true}
                                    />
                                )
                            }) : "Error, please report this post in comment"
                        }
                    </div>
                </div>
                <div className="mt-10">
                    <div className="grid grid-col-6 gap-1 mt-5 justify-items-center texzt">
                        <div className="col-start-1 grid">
                            {
                                data.prev_link ? (
                                    <Link href={`${mangaSlug}${data.prev_link.chapter_slug}`}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        Previous
                                    </Link>
                                ) : (
                                    <Link href={mangaSlug}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <AiTwotoneHome className="w-5 h-5 mr-2"/>
                                        Info
                                    </Link>
                                )
                            }

                        </div>
                        <div className="col-start-3 col-span-2 grid">
                            <Dropdown
                                label={data.chapter}
                                dismissOnClick={false}
                                className="bg-gradient-to-br from-purple-800 to-gray-800 "
                            >
                                <div className="overflow-y-auto no-scrollbar max-h-96 w-80">
                                    {
                                        data.chapters.map(chapter =>{
                                            let noww = data.id === parseInt(chapter.chapter_id);
                                            return (
                                                <Dropdown.Item key={data.chapter_id} className={`overflow - y - auto ${(noww) ? 'bg-gray-900 disabled' : ''}`}>
                                                    <Link className={`w-full h-fit hover:text-purple-900 hover:font-bold ${(noww) ? 'text-yellow-300' : 'text-white'}`} href={`${mangaSlug}${chapter.chapter_slug}`}>{chapter.chapter_name}</Link>
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                </div>
                            </Dropdown>
                        </div>
                        <div className="col-end-7 grid">
                            {
                                data.next_link ? (
                                    <Link href={`${mangaSlug}${data.next_link.chapter_slug}`}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Next
                                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link href={mangaSlug}
                                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Info
                                        <AiTwotoneHome className="w-5 h-5 ml-2"/>
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg md:rounded-2xl p-4 md:p-14 mt-10">
                        <DiscussionEmbed

                            shortname='komik-uwu'
                            config={
                                {
                                    url: data.chapter_slug,
                                    identifier: data.title,
                                    title: data.seo.title,
                                    language: 'en_ID'
                                }
                            }
                        />
                    </div>
                </div>
                <div className="flex mt-10">
                    <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Related with {data.title}
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

export default Chapter