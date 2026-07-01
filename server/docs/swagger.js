export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Primetrade.ai API',
    version: '1.0.0',
    description: 'API Documentation for Primetrade.ai Dashboard Authentication and CRUD operations.',
  },
  servers: [
    {
      url: 'https://primetrade-api.onrender.com/api/v1',
      description: 'Production server (Render)',
    },
    {
      url: 'http://localhost:5001/api/v1',
      description: 'Local Development server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'jwt',
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'User registered successfully' } },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login User',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Successful login (sets HTTP-only cookie)' } },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products (Read)',
        responses: { 200: { description: 'List of all products' } },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product (Create)',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'number' },
                  category: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Product created' } },
      },
    },
    '/products/{id}': {
      put: {
        tags: ['Products'],
        summary: 'Update a product (Update)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'number' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Product updated' } },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product (Delete)',
        security: [{ cookieAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Product deleted' } },
      },
    },
  },
};
