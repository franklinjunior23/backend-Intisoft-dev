import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Mi Aplicación",
      version: "1.0.0",
      description: "Documentación de la API de Mi Aplicación",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1/",
      },
      {
        url: "https://otro-servidor.com/api/v1", // Puedes agregar más servidores si es necesario
      },
    ],
    tags: [
      {
        name: "Empresas",
        description:
          "Este endpoint te brinda la posibilidad de consultar información relacionada con empresas ya existentes, así como también te permite crear nuevas empresas. Con esta funcionalidad, podrás acceder a datos relevantes sobre empresas establecidas y también tendrás la capacidad de generar nuevas entidades empresariales.",
          externalDocs:{
            url:'/empresas'
          }
      },
    ],
    
    
    
  },
  // Especifica la ubicación de los archivos que contienen las rutas y los comentarios JSDoc.
  apis: ["../app/routes/*.ts"], // Ajusta la ruta según tu estructura de archivos.
};

const specs = swaggerJsdoc(options);

export default specs;
