import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class Swagger {
    getConfig() {
        return {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "API Docs",
                    version: "1.0.0"
                },
                components: {
                    responses: {
                        400: { description: "Bad Request" },
                        404: { description: "Not Found" },
                        500: { description: "Internal Server Error" }
                    }
                }
            },
            apis: ["./src/routes/*.route.js"]
        };
    }

    setup(app, port, express_static) {
        app.use("/public", express_static("swagger/www"));
        app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(this.getConfig()), {
            customCssUrl: ["/public/common.css", "/public/modern.dark.css"],
            customJs: "/public/modern.js"
        }));
        console.log(`Swagger available at http://localhost:${port}/swagger`);
    }
}

export default Swagger;
