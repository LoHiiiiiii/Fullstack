const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

let token = ""

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const user = {
        username: "Valid username 2",
        password: "Valid password",
    }

    await api.post("/api/users").send(user)
    const response = await api.post("/api/login").send(user)
    token = `Bearer ${response.body.token}`
})

describe("getting all blogs", () => {
    test("returns correct amount", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test("has correct id field", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })
})

describe("posting blogs", () => {
    test("functions correctly", async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Me",
            url: "urli",
            likes: 3,
        }

        const postResponse = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
        expect(postResponse.body).toMatchObject(newBlog)

        const getResponse = await api.get("/api/blogs")
        expect(getResponse.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(getResponse.body).toContainEqual(postResponse.body)
    })

    test("with empty likes returns a blog with zero likes", async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Me",
            url: "urli",
        }

        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    })

    test("without title receives status 400", async () => {
        const newBlog = {}

        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
        expect(response.status).toBe(400)
    })

    test("without url receives status 400", async () => {
        const newBlog = {
            title: "Urlless",
        }

        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
        expect(response.status).toBe(400)
    })
})

describe("deleting blogs", () => {
    let postResponse = ""

    beforeEach(async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Me",
            url: "urli",
            likes: 3,
        }

        postResponse = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
    })

    test("with invalid id receives status 400", async () => {
        const response = await api
            .delete(`/api/blogs/0`)
            .set("Authorization", token)
        expect(response.status).toBe(400)
    })

    test("with a valid id receives status 204", async () => {
        const response = await api
            .delete(`/api/blogs/${postResponse.body.id}`)
            .set("Authorization", token)
        expect(response.status).toBe(204)
    })
})

describe("putting blogs", () => {
    let postResponse = ""

    beforeEach(async () => {
        const newBlog = {
            title: "Test Blog",
            author: "Me",
            url: "urli",
            likes: 3,
        }

        postResponse = await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", token)
    })

    test("with invalid id receives status 400", async () => {
        const newBlog = {}

        const response = await api
            .put("/api/blogs/0")
            .set("Authorization", token)
            .send(newBlog)
        expect(response.status).toBe(400)
    })

    test("with no title id receives status 400", async () => {
        const newBlog = {
            title: "",
            author: "Me",
            url: "urli",
            likes: 3,
        }

        const response = await api
            .put("/api/blogs/0")
            .set("Authorization", token)
            .send(newBlog)
        expect(response.status).toBe(400)
    })

    test("with no url receives status 400", async () => {
        const newBlog = {
            title: "Put Blog",
            author: "Me",
            url: "",
            likes: 3,
        }

        const response = await api
            .put("/api/blogs/0")
            .set("Authorization", token)
            .send(newBlog)
        expect(response.status).toBe(400)
    })

    test("with a valid id functions", async () => {
        const newBlog = {
            title: "Put blog",
            author: "Me",
            url: "urli",
            likes: 3,
        }

        const putResponse = await api
            .put(`/api/blogs/${postResponse.body.id}`)
            .set("Authorization", token)
            .send(newBlog)
        expect(putResponse.status).toBe(200)
        const getResponse = await api.get("/api/blogs")
        expect(getResponse.body).toContainEqual(putResponse.body)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
