import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class Swagger {
    getConfig() {
        return {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Express API with Swagger",
                    version: "1.0.0",
                    description: "API Documentation"
                },
                servers: [],
                components: {
                    responses: {
                        400: { description: "Bad Request" },
                        404: { description: "Not Found" },
                    }
                }
            },
            apis: ["./src/routes/*.js"]
        };
    }

    setup(app, port = process.env.PORT || 3000) {
        const config = this.getConfig();
        config.definition.servers = [{ url: `http://localhost:${port}` }];
        // Setup Swagger UI middleware
        app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(config)));
        console.log(`Swagger available at http://localhost:${port}/swagger`);
    }
}

export default Swagger;
