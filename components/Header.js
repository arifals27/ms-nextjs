import React from "react";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const router = useRouter()

    const toggleMenu = () => {
        setMobileMenu((x) => !x)
    }
    const goSearch = (e) => {
        e.preventDefault();
        const query = e.target.s.value;
        router.push("/search/" + query , undefined, { shallow: true })
    }
    const siteurl = process.env.NEXT_PUBLIC_SITE
    const jsonSchema = [{
        "@type": "WebSite",
        "@id": `${siteurl}#website`,
        "url": `${siteurl}`,
        "name": `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
        "publisher": {
            "@id": `${siteurl}#organization`
        },
        "inLanguage": "id",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "/search/{search}",
            "query": "required name=search"
        }
    }, {
        "@type": "Organization",
        "@id": `${siteurl}#organization`,
        "name": `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
        "url" : `${siteurl}`,
        "logo": {
            "@type": "ImageObject",
            "@id": `${siteurl}#loho`,
            "url": `${siteurl}logo.jpg`,
            "contentUrl": `${siteurl}logo.jpg`,
            "caption": "",
            "inLanguage": "id",
            "width": "512",
            "height": "512"
        }
    }]
    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
                <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonSchema)}
                </script>
            </Head>
            <nav className="bg-gray-800 shadow-lg shadow-gray-900" itemScope itemType="https://schema.org/WPHeader">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="hidden md:flex items-center space-x-1">
                            <Link itemProp="url" title="Manga" href="/page/manga" className="py-5 px-3 hover:text-cyan-500">Manga</Link>
                            <Link itemProp="url" title="Manhwa" href="/page/manhwa" className="py-5 px-3 hover:text-cyan-500">Manhwa</Link>
                            <Link itemProp="url" title="Manhua" href="/page/manhua" className="py-5 px-3 hover:text-cyan-500">Manhua</Link>
                            <Link itemProp="url" title="Adult" href="/archive/genre/adult" className="py-5 px-3 hover:text-cyan-500">Adult</Link>
                        </div>
                        <div>
                            <Link itemProp="url" title="Home" href="/" className="flex items-center py-5 px-2 text-violet-500 hover:text-cyan-400">
                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" version="1.1" width="60px" height="60px">
                                    <g><path fill="#8858f2" d="M 6.5,6.5 C 12.4384,6.46845 17.4384,8.63511 21.5,13C 26.5,13.6667 31.5,13.6667 36.5,13C 52.1285,1.73755 57.4618,5.57088 52.5,24.5C 52.9976,26.664 54.1642,28.3306 56,29.5C 56.1393,40.5964 50.6393,48.0964 39.5,52C 22.5854,56.4946 10.2521,51.1613 2.5,36C 2.82769,33.9754 2.99436,31.8088 3,29.5C 4.83577,28.3306 6.00244,26.664 6.5,24.5C 5.21101,18.5007 5.21101,12.5007 6.5,6.5 Z"/></g>
                                    <g><path fill="#0e0d0d" d="M 15.5,12.5 C 13.742,12.1231 12.0754,11.4565 10.5,10.5C 9.50776,14.7828 9.17443,19.1161 9.5,23.5C 8.18635,18.6523 8.18635,13.6523 9.5,8.5C 11.9106,9.36111 13.9106,10.6944 15.5,12.5 Z"/></g>
                                    <g><path fill="#f0f0f0" d="M 15.5,12.5 C 15.9731,13.9063 16.9731,14.573 18.5,14.5C 18.9528,15.4584 19.6195,16.2917 20.5,17C 26.5,17.6667 32.5,17.6667 38.5,17C 41.4288,14.2429 44.7621,12.0762 48.5,10.5C 49.4922,14.7828 49.8256,19.1161 49.5,23.5C 49.2238,25.8907 49.2238,28.2241 49.5,30.5C 48.5,30.5 47.5,30.5 46.5,30.5C 46.3573,32.2624 46.6906,33.9291 47.5,35.5C 47.0302,36.463 46.3635,36.463 45.5,35.5C 45.513,28.7665 44.513,28.2665 42.5,34C 41.0715,34.5791 39.7382,34.4124 38.5,33.5C 38.6567,32.1266 38.49,30.7932 38,29.5C 37.7586,32.2889 37.092,34.9556 36,37.5C 35.6012,37.2716 35.4346,36.9382 35.5,36.5C 35.6309,35.6236 35.2975,34.9569 34.5,34.5C 33.6143,35.325 33.281,36.325 33.5,37.5C 32.5,38.8333 31.5,38.8333 30.5,37.5C 29.8333,34.8333 29.1667,34.8333 28.5,37.5C 27.8826,37.6107 27.3826,37.944 27,38.5C 26.4169,36.9984 25.5836,35.6651 24.5,34.5C 23.8933,34.6236 23.56,34.9569 23.5,35.5C 23.5654,35.9382 23.3988,36.2716 23,36.5C 22.7216,35.5842 22.2216,34.9175 21.5,34.5C 21.5076,28.7924 21.0076,28.4591 20,33.5C 18.6667,34.8333 17.3333,34.8333 16,33.5C 15.79,31.9419 15.29,30.6085 14.5,29.5C 13.6981,30.9516 13.1981,32.6183 13,34.5C 12.7216,33.5842 12.2216,32.9175 11.5,32.5C 10.791,31.596 9.79105,31.2627 8.5,31.5C 8.7239,29.2133 9.39057,27.0466 10.5,25C 10.4301,24.2352 10.0967,23.7352 9.5,23.5C 9.17443,19.1161 9.50776,14.7828 10.5,10.5C 12.0754,11.4565 13.742,12.1231 15.5,12.5 Z"/></g>
                                    <g><path fill="#141614" d="M 15.5,12.5 C 17.0269,12.427 18.0269,13.0937 18.5,14.5C 16.9731,14.573 15.9731,13.9063 15.5,12.5 Z"/></g>
                                    <g><path fill="#121113" d="M 49.5,23.5 C 49.8256,19.1161 49.4922,14.7828 48.5,10.5C 44.7621,12.0762 41.4288,14.2429 38.5,17C 32.5,17.6667 26.5,17.6667 20.5,17C 19.6195,16.2917 18.9528,15.4584 18.5,14.5C 24.5958,16.5288 30.9292,17.0288 37.5,16C 40.9953,12.7492 44.9953,10.2492 49.5,8.5C 50.8137,13.6523 50.8137,18.6523 49.5,23.5 Z"/></g>
                                    <g><path fill="#eaebea" d="M 14.5,29.5 C 14.0934,35.8058 16.4267,37.4725 21.5,34.5C 22.2216,34.9175 22.7216,35.5842 23,36.5C 23.3988,36.2716 23.5654,35.9382 23.5,35.5C 24.6444,37.1002 25.8111,38.7669 27,40.5C 28.0386,39.7562 28.5386,38.7562 28.5,37.5C 29.1667,37.5 29.8333,37.5 30.5,37.5C 31.5,41.5 32.5,41.5 33.5,37.5C 34.1667,37.1667 34.8333,36.8333 35.5,36.5C 35.4346,36.9382 35.6012,37.2716 36,37.5C 37.092,34.9556 37.7586,32.2889 38,29.5C 38.49,30.7932 38.6567,32.1266 38.5,33.5C 38.7869,35.1207 39.7869,36.1207 41.5,36.5C 42.7362,35.7542 44.0695,35.4208 45.5,35.5C 46.3635,36.463 47.0302,36.463 47.5,35.5C 46.6906,33.9291 46.3573,32.2624 46.5,30.5C 47.5,30.5 48.5,30.5 49.5,30.5C 49.0825,31.2216 48.4158,31.7216 47.5,32C 50.8438,32.5696 51.1772,33.7362 48.5,35.5C 49.1667,36.1667 49.8333,36.8333 50.5,37.5C 48.5294,43.3031 44.5294,46.8031 38.5,48C 31.1128,49.9796 23.7795,49.813 16.5,47.5C 15.5084,47.6716 14.8417,47.3382 14.5,46.5C 13.5,44.8333 12.1667,43.5 10.5,42.5C 10.1231,40.742 9.45645,39.0754 8.5,37.5C 11.1667,36.1667 11.1667,34.8333 8.5,33.5C 9.32496,32.6143 10.325,32.281 11.5,32.5C 12.2216,32.9175 12.7216,33.5842 13,34.5C 13.1981,32.6183 13.6981,30.9516 14.5,29.5 Z"/></g>
                                    <g><path fill="#363636" d="M 14.5,29.5 C 15.29,30.6085 15.79,31.9419 16,33.5C 17.3333,34.8333 18.6667,34.8333 20,33.5C 21.0076,28.4591 21.5076,28.7924 21.5,34.5C 16.4267,37.4725 14.0934,35.8058 14.5,29.5 Z"/></g>
                                    <g><path fill="#131313" d="M 30.5,37.5 C 29.8333,37.5 29.1667,37.5 28.5,37.5C 29.1667,34.8333 29.8333,34.8333 30.5,37.5 Z"/></g>
                                    <g><path fill="#1c1c1c" d="M 35.5,36.5 C 34.8333,36.8333 34.1667,37.1667 33.5,37.5C 33.281,36.325 33.6143,35.325 34.5,34.5C 35.2975,34.9569 35.6309,35.6236 35.5,36.5 Z"/></g>
                                    <g><path fill="#4c4c4d" d="M 45.5,35.5 C 44.0695,35.4208 42.7362,35.7542 41.5,36.5C 39.7869,36.1207 38.7869,35.1207 38.5,33.5C 39.7382,34.4124 41.0715,34.5791 42.5,34C 44.513,28.2665 45.513,28.7665 45.5,35.5 Z"/></g>
                                    <g><path fill="#1c1920" d="M 49.5,23.5 C 50.2614,26.4497 51.5947,29.1164 53.5,31.5C 51.2596,45.2857 42.7596,51.6191 28,50.5C 23.6446,50.9775 19.8112,49.9775 16.5,47.5C 23.7795,49.813 31.1128,49.9796 38.5,48C 44.5294,46.8031 48.5294,43.3031 50.5,37.5C 49.8333,36.8333 49.1667,36.1667 48.5,35.5C 51.1772,33.7362 50.8438,32.5696 47.5,32C 48.4158,31.7216 49.0825,31.2216 49.5,30.5C 49.2238,28.2241 49.2238,25.8907 49.5,23.5 Z"/></g>
                                    <g><path fill="#333333" d="M 23.5,35.5 C 23.56,34.9569 23.8933,34.6236 24.5,34.5C 25.5836,35.6651 26.4169,36.9984 27,38.5C 27.3826,37.944 27.8826,37.6107 28.5,37.5C 28.5386,38.7562 28.0386,39.7562 27,40.5C 25.8111,38.7669 24.6444,37.1002 23.5,35.5 Z"/></g>
                                    <g><path fill="#3b3a3b" d="M 30.5,37.5 C 31.5,38.8333 32.5,38.8333 33.5,37.5C 32.5,41.5 31.5,41.5 30.5,37.5 Z"/></g>
                                    <g><path fill="#19181b" d="M 9.5,23.5 C 10.0967,23.7352 10.4301,24.2352 10.5,25C 9.39057,27.0466 8.7239,29.2133 8.5,31.5C 9.79105,31.2627 10.791,31.596 11.5,32.5C 10.325,32.281 9.32496,32.6143 8.5,33.5C 11.1667,34.8333 11.1667,36.1667 8.5,37.5C 9.45645,39.0754 10.1231,40.742 10.5,42.5C 8.74618,40.4273 7.07951,38.2607 5.5,36C 6.74684,34.5421 6.74684,33.0421 5.5,31.5C 7.40526,29.1164 8.7386,26.4497 9.5,23.5 Z"/></g>
                                    <g><path fill="#1c1131" d="M 10.5,42.5 C 12.1667,43.5 13.5,44.8333 14.5,46.5C 12.1667,46.1667 10.8333,44.8333 10.5,42.5 Z"/></g>
                                </svg>
                                <span className="font-bold text-xl">{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <form action="/search/" onSubmit={goSearch} itemType="https://schema.org/SearchAction" itemProp="potentialAction" itemScope>
                                <meta itemProp="target" content="/search/{search}"/>
                                <div className="flex md:w-80 relative">
                                    <div className="relative w-full">
                                        <input itemProp="query-input" type="search" id="search" name="s" className=" block p-2.5 w-full z-20 text-sm text-gray-900
                               bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300
                               focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
                               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:border-blue-500" placeholder="Search..." autoComplete="off"
                                        />
                                        <button type="submit"
                                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="mobile-menu-button" onClick={() => toggleMenu()}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
                <div className={`mobile-menu ${mobileMenu ? '' : 'hidden'} md:hidden`}>
                    <Link href="/page/manga" className="block py-2 px-4 text-sm hover:bg-purple-900">Manga</Link>
                    <Link href="/page/manhwa" className="block py-2 px-4 text-sm hover:bg-purple-900">Manhwa</Link>
                    <Link href="/page/manhua" className="block py-2 px-4 text-sm hover:bg-purple-900">Manhua</Link>
                    <Link href="/archive/genre/adult" className="block py-2 px-4 text-sm hover:bg-purple-900">Adult</Link>
                    <form action="/search/" className="mt-3 px-5 pb-5">
                        <div className="flex w-full relative">
                            <div className="relative w-full">
                                <input type="search" id="search" name="s" className=" block p-1.5 w-full z-20 text-sm text-gray-900
                               bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300
                               focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
                               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:border-blue-500" placeholder="Search..."
                                       onChange={event => (doFilter(event.target.value))}
                                       autoComplete="off"
                                />
                                <button type="submit"
                                        className="absolute top-0 right-0 p-1.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </>
    )
}


export default Header