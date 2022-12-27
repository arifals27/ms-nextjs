import React from "react";
import Link from "next/link";


const nextButton = (now, max, slug) => {
    if(now > 0 && now < max){
        return (
            <li>
                <Link href={`${slug}/${now+1}`} type={"button"}
                    className="rounded-r-lg border border-gray-800 py-2 px-3 leading-tight font-bold text-violet-500 hover:bg-gray-900 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex">Next
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20"
                         aria-hidden="true" className="h-5 w-5" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"></path>
                    </svg>
                </Link>
            </li>
        )
    }
}
const prevButton = (now, max, slug) => {
    if(now > 1 && now < max && now !== 1){
        return (
            <li>
                <Link href={`${slug}/${now-1}`}
                    className="ml-0 rounded-l-lg border border-gray-800 py-2 px-3 leading-tight font-bold text-violet-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20"
                         aria-hidden="true" className="h-5 w-5" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"></path>
                    </svg>
                    Previous
                </Link>
            </li>
        )
    }
}
const Pagination = (page) => {
    const start = page.now < 3 ? 1 : page.now - 2;
    const slug = typeof page.slug !== "undefined" ? page.slug : ""
    return(
        <div className="items-center justify-center flex">
            <nav className="">
                <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
                    {prevButton(page.now, page.max, slug)}
                    {
                        [ ...Array(5).keys() ].map(i => {
                            return (
                                <li key={i}>
                                    <Link href={`${slug}/${start+i}`} type={"button"}
                                          className={`${start+i === page.now ? "bg-gray-600 cursor-not-allowed" : ''} text-center w-12 border border-gray-800 py-2 leading-tight text-cyan-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{start+i}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    {nextButton(page.now, page.max, slug)}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;
