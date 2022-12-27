import React from 'react'
import Link from "next/link";
import {Breathing, Image} from "react-shimmer";
const Related = (data) => {
    const errorFall = (a) => {
        return (
            <Image src={`https://komikuwu.com/wp-content/themes/madara-child-mk/images/default-poster.png`} width="214" height="315"
                   fallback={<Breathing width={320} height={426} className={'absolute w-full h-full top-0 left-0 bottom-0 right-0'}/>}
                   fadeIn={true} NativeImgProps={{className: "w-80 object-cover rounded-t-lg absolute w-full h-full top-0 left-0 bottom-0 right-0"}}
                   alt={data.content.title + " error image"}
            />
        )
    }
    return (
        <>
            <div key={data.id} itemID={data.content.id} className="my-2 px-2 w-1/2 md:w-1/4 lg:my-6 lg:px-2 lg:w-1/6">

                <article key={data.content.id} className="overflow-hidden rounded-lg shadow-md shadow-violet-500/40 hover:shadow-xl hover:shadow-cyan-400/40 bg-gray-900 transition duration-300">

                    <Link href={data.content.slug}>
                        <div className="pt-135-p overflow-hidden relative w-full">
                            <div className="absolute w-full h-full absolute top-0 left-0 animate-pulse bg-gray-400"></div>
                            <Image src={data.content.poster} width="187" height="252" fallback={<Breathing width={187} height={252} className="absolute w-full h-full absolute top-0 left-0" />}
                                   fadeIn={true}
                                   NativeImgProps={{alt: `${data.content.title}`, title: `${data.content.title}`, width: '100%', height: 'auto', className: "hover:scale-105 transition rounded-t-lg duration-400 ease-in-out absolute w-full h-full top-0 left-0 bottom-0 right-0"}}
                                   errorFallback={() => errorFall(data.content.poster)}
                                   alt={data.content.title}
                            />
                        </div>
                        <header  className="h-14 items-center justify-between leading-tight p-1 md:p-2">
                            <span className='text-md font-bold line-clamp-2 text-center hover:text-cyan-400'>{data.content.title}</span>
                        </header>
                    </Link>
                </article>
            </div>
        </>
    )
}

export default Related;