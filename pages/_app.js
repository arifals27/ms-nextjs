import '../styles/globals.css'
import Layout from '../components/Layout'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

function Loading () {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setLoading(false);

        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    })
    return loading && (
        <div className="spinner-wrapper flex h-screen w-screen justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-white z-10">
            <div className="h-screen w-screen absolute top-0 left-0 bg-gray-700 animate-pulse"></div>
        </div>
    )
}
export default function App({ Component, pageProps }) {
  return (
      <>
      {/*<Loading/>*/}
          <AnimatePresence exitBeforeEnter>
              <motion.div>
                  <Loading/>
                      <Layout>
                          <Component {...pageProps} />
                      </Layout>
              </motion.div>
          </AnimatePresence>
      </>
  )
}
