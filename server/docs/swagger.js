export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Primetrade.ai API',
    version: '1.0.0',
    description: 'API Documentation for Primetrade.ai Dashboard',
  },
  servers: [
    {
      url: 'http://localhost:5001/api/v1',
      description: 'Development server',
    },
  ],
  paths: {
    '/auth/login': {
      post: {
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
        responses: {
          200: { description: 'Successful login' },
        },
      },
    },
  },
};
