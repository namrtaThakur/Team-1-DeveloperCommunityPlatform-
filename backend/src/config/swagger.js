const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
    openapi: "3.0.0",

    info: {
        title: "Developer Community API",
        version: "1.0.0",
        description:
            "Backend API documentation for Developer Community Platform",
    },

    servers: [
        {
            url: "http://localhost:5000",
        },
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
},
    apis: [
        "./src/routes/*.js",
        "./src/controllers/*.js",
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
