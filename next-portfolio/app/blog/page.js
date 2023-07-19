import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Image from 'next/image'


async function getAllBlogs() {
    const files = fs.readdirSync(path.join("data"))
    // console.log(files)
    /*
        // ファイル名のリストが入っている
        [
        'fifth-blog.md',
        'first-blog.md',
        'fourth-blog.md',
        'second-blog.md',
        'sixth-blog.md',
        'third-blog.md'
        ]    
    */

    const blogs = files.map((fileName) => {
        const slug = fileName.replace(".md", "")
        const fileData = fs.readFileSync(
            path.join("data", fileName),
            "utf-8"
        )
        // console.log(fileData)

        const { data } = matter(fileData)
        return {
            frontmatter: data,
            slug: slug,
        }
    })

    // 記事順ソート
    const orderedBlogs = blogs.sort((a, b) => {
        return b.frontmatter.id - a.frontmatter.id
    })

    return {
        // blogs: blogs
        blogs: orderedBlogs
    }
}


const Blog = async() => {
    // getAllBlogs()

    const { blogs } = await getAllBlogs()
    // console.log(blogs)

    return (
        <>
            <div>
                <div>
                    <h1>Blog</h1>
                    <p>エンジニアの日常生活をお届け！</p>
                    {blogs.map((blog, index) => 
                        <div key={index}>
                            <div>
                                <h2>{blog.frontmatter.title}</h2>
                                <p>{blog.frontmatter.date}</p>
                                <Link href={`/blog/${blog.slug}`}>Read More</Link>
                            </div>
                            <div className="blogImg">
                                <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} priority={true} />
                            </div>
                        </div>
                    )}    
                </div>
            </div>
        </>
    )

}

export default Blog