//pages/sitemap.xml.js
const SITEMAP_API = `${process.env.API_URL}/wp-content/themes/komikuwu.com-child-mk/sitemap_api.php`;

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts.links
        .map(link => {
            return `
       <url>
           <loc>${link.link.replace(`${process.env.API_URL}/`, process.env.NEXT_PUBLIC_SITE)}</loc>
           <lastmod>${link.date}</lastmod>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

function generateIndexSitemap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${
        
        [ ...Array(posts.total_manga).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/manga-${f+1}.xml</loc>
            </sitemap>
            `
        })
    }
    ${

        [ ...Array(posts.total_chapter).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/chapter-${f+1}.xml</loc>
            </sitemap>
            `
        })
    }
   </sitemapindex>
 `;
}

function SiteMap({params}) {
    // getServerSideProps will do the heavy lifting
    console.log(params)

}

export async function getServerSideProps({ res, params }) {
    const getSlug = params.slug.split(".")
    const datax = getSlug[0].split("-")
    const type = datax[0]
    const page = datax[1]

    let api_url;
    if(type === "index"){
        api_url = SITEMAP_API + "?type=index"
    } else if(type === "manga"){
        api_url = SITEMAP_API + `?type=post&page=${page}`
    } else if(type === "chapter"){
        api_url = SITEMAP_API + `?type=chapter&page=${page}`
    } else {
        api_url = SITEMAP_API + "?type=index"
    }
    const request = await fetch(api_url);
    const posts = await request.json();

    // We generate the XML sitemap with the posts data
    let sitemap
    if(type === "index"){
        sitemap = generateIndexSitemap(posts)
    } else {
        sitemap = generateSiteMap(posts)
    }
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {params : params.slug},
    };
}

export default SiteMap;