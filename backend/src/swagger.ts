import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API for managing users and tasks",
        },
        servers: [
            {
                url: "http://localhost:3081/api",
            },
        ],
    },
    apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
