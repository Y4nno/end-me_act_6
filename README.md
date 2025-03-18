read me? more like... end me.

1. What do database migrations do and why are they useful?
Database migrations are used to manage and automate changes to the structure of a database over time, including creating or altering tables, adding or removing columns, and setting up relationships between entities. 
They are useful because they allow developers to keep the database schema in sync with the application's codebase in a controlled and versioned manner. 
Migrations enable collaborative teams to ensure that database changes are applied consistently across different environments (e.g., development, staging, production) and help manage database evolution without data loss.

2. How does GraphQL differ from REST for CRUD operations?
GraphQL and REST are both methods for managing data interactions, but they differ significantly in their approach to CRUD operations:
REST typically uses multiple endpoints, each corresponding to a specific resource or entity. For example, to fetch users or update a user's data, you would interact with separate endpoints such as /users for GET requests and /users/:id for PUT requests.

GraphQL, on the other hand, uses a single endpoint (usually /graphql), 
where clients can specify exactly what data they need and how they want it to be structured. 
For example, instead of sending multiple requests to fetch related data (e.g., user and their posts), 
you can request both user details and posts in a single query. GraphQL also allows clients to request only the necessary fields, reducing over-fetching or under-fetching of data.
