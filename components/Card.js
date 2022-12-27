import React from 'react'
import Link from "next/link";
import {Breathing, Image} from "react-shimmer";


const Card = (data) => {
    const errorFall = (a) => {
        return (
            <Image alt={data.content.title} src={`/default-poster.png`} width="214" height="315"
                   fallback={<Breathing width={320} height={426} className={'absolute w-full h-full top-0 left-0 bottom-0 right-0'}/>}
                   fadeIn={true} NativeImgProps={{className: "w-80 object-cover rounded-t-lg absolute w-full h-full top-0 left-0 bottom-0 right-0"}}
            />
        )
    }
    const type = data.content.type
    return (
        <>
        <div key={data.id} itemID={data.content.id} className="my-2 px-2 w-1/2 md:w-1/4 lg:my-6 lg:px-2 lg:w-1/6">

            <article key={data.content.id} className="overflow-hidden rounded-lg shadow-md shadow-violet-500/40 hover:shadow-xl hover:shadow-cyan-400/40 bg-gray-900 transition duration-300">

                <Link href={data.content.slug}>
                <div className="pt-135-p overflow-hidden relative w-full">
                    <div className="absolute w-full h-full absolute top-0 left-0 animate-pulse bg-gray-400"></div>
                    <Image alt={data.content.title} src={data.content.poster} width="187" height="252" fallback={<Breathing width={187} height={252} className="absolute w-full h-full absolute top-0 left-0" />}
                           fadeIn={true}
                           NativeImgProps={{alt: `${data.content.title}`, title: `${data.content.title}`, width: '100%', height: 'auto', className: "hover:scale-110 transition rounded-t-lg duration-400 ease-in-out absolute w-full h-full top-0 left-0 bottom-0 right-0"}}
                           errorFallback={() => errorFall(data.content.poster)}
                    />
                    <div className={`absolute ${
                        type === "Manga" ? "bg-flag-manga" : type === "Manhwa" ? "bg-flag-manhwa" : type === "Manhua" ? "bg-flag-manhua" : "bg-flag-indo"
                    } w-6 h-4 top-2 right-2 shadow-md shadow-black/50`}/>
                    <span className={`absolute top-0 left-0 px-2 py-1 ${data.content.status === "on-going" ? "bg-green-600" : "bg-red-600"} rounded-br-lg text-sm font-bold shadow-lg`}>{data.content.status === "on-going" ? "UP" : "END"}</span>
                </div>
                <header  className="h-14 items-center justify-between leading-tight p-1 md:p-2">
                    <span className='text-md font-bold line-clamp-2 text-center hover:from-cyan-600 hover:to-white font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-500 to-pink-500'>{data.content.title}</span>
                </header>
                </Link>
                {
                    data.content.chapters.map(chapter => {
                        return (
                            <div key={chapter.id} className="flex items-center justify-between leading-tight border-t border-solid border-gray-400
                            hover:bg-black hover:bg-opacity-50
                            ">
                                <Link className="no-underline hover:underline block w-full py-3 px-2" href={chapter.link}>
                                    <h1 className="text-sm text-gray-300 float-left inline-block font-normal break-words">
                                        {chapter.name}
                                    </h1>
                                    <p className="text-xs text-cyan-500 float-right inline-block">
                                        {chapter.time}
                                    </p>
                                </Link>
                            </div>
                        )
                    })
                }
            </article>
            </div>
        </>
    )
}

export default Card;