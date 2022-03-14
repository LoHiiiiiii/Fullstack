const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const User = require("../models/user")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe("creating users", () => {
    test("with empty username receives status code 400", async () => {
        const user = {}

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toMatch("Username can't be empty!")
    })

    test("with username less than 3 characters returns status code 400", async () => {
        const user = {
            username: "ab",
        }

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toMatch(
            "Username must be at least 3 characters!"
        )
    })

    test("with empty username receives status code 400", async () => {
        const user = {
            username: "Valid username",
        }

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toMatch("Password can't be empty!")
    })

    test("with username less than 3 characters returns status code 400", async () => {
        const user = {
            username: "Valid username",
            password: "ab",
        }

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toMatch(
            "Password must be at least 3 characters!"
        )
    })

    test("functions properly with valid requests", async () => {
        const user = {
            username: "Valid username",
            name: "Valid name",
            password: "Valid password",
        }

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(201)
        expect(response.body.password).toBeUndefined()
        expect(response.body.name).toBe(user.name)
        expect(response.body.username).toMatch(user.username)
    })

    test("functions properly with request with no name", async () => {
        const user = {
            username: "Valid username",
            password: "Valid password",
        }

        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(201)
        expect(response.body.password).toBeUndefined()
        expect(response.body.name).toBe(user.name)
        expect(response.body.username).toMatch(user.username)
    })

    test("with duplicate usernames receives status code 400", async () => {
        const user = {
            username: "Valid username",
            name: "Valid name",
            password: "Valid password",
        }

        await api.post("/api/users").send(user)
        const response = await api.post("/api/users").send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toMatch("Username already exists!")
    })
})

afterAll(() => {
    mongoose.connection.close()
})
