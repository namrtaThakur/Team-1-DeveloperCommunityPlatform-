
const request = require("supertest");
const app = require("../src/app");

let token;
let postId;
describe("Post API", () => {

    beforeAll(async () => {
        await request(app)
            .post("/users/register")
            .send({
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            });

        const loginResponse = await request(app)
            .post("/users/login")
            .send({
                email: "test@example.com",
                password: "password123",
            });

        token = loginResponse.body.token;
    });

    test("GET /posts should return all posts", async () => {
        const response = await request(app).get("/posts");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.posts).toBeDefined();
    });

    test("GET unknown post should return 404", async () => {
        const response = await request(app)
            .get("/posts/507f1f77bcf86cd799439011");

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });

    test("POST /posts should create a post", async () => {
        const response = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Integration Test Post",
                content: "Created by Jest",
                tags: ["jest", "testing"],
            });
        postId = response.body.data._id;

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe("Integration Test Post");
    });
    test("PUT /posts/:id should update a post", async () => {
    const response = await request(app)
        .put(`/posts/${postId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Updated by Jest",
            content: "Updated Content",
            tags: ["updated"]
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Updated by Jest");
    });

    test("POST /posts/:id/like should like a post", async () => {
    const response = await request(app)
        .post(`/posts/${postId}/like`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.likes.length).toBe(1);
    });

    test("DELETE /posts/:id/like should unlike a post", async () => {
    const response = await request(app)
        .delete(`/posts/${postId}/like`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    });

    test("DELETE /posts/:id should delete a post", async () => {
    const response = await request(app)
        .delete(`/posts/${postId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    });
});
