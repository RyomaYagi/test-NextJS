import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const blogsPerPage = 5

export async function getAllBlogs() {
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

    const numberPages = Math.ceil(orderedBlogs.length / blogsPerPage) 

    return {
        // blogs: blogs
        blogs: orderedBlogs,
        numberPages: numberPages
    }
}

export async function getSingleBlog(context) {
    const {slug} = context.params
    // const data = await import("./../../../data/fifth-blog.md")
    const data = await import(`./../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    return {
        singleDocument: singleDocument
    }
}