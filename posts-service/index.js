const API_URL = "http://localhost:4002";
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 4002;

// GraphQL Schema
const schema = buildSchema(`
    type Post {
        id: ID!
        title: String!
        content: String!
    }
    type Query {
        posts: [Post]
    }
    type Mutation {
        createPost(title: String!, content: String!): Post
    }
`);

// Sample Data
let posts = [{ id: "1", title: "First Post", content: "Hello World!" }];

// Resolvers
const root = {
    posts: () => posts,
    createPost: ({ title, content }) => {
        const newPost = { id: String(posts.length + 1), title, content };
        posts.push(newPost);
        return newPost;
    }
};

// Middleware
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});


async function fetchPosts() {
    const query = `{ posts { id title content } }`;
    const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const { data } = await res.json();
    const postsList = document.getElementById("posts");
    postsList.innerHTML = "";
    data.posts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = `${post.title}: ${post.content}`;
        postsList.appendChild(li);
    });
}

async function createPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const mutation = `mutation { createPost(title: "${title}", content: "${content}") { id title content } }`;
    await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });
    fetchPosts();
}

fetchPosts();
