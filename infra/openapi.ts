export const OpenApiSpecification = {
  openapi: "3.0.0",
  info: {
    title: "Credify-API",
    version: "1.0.0",
    description: "Credify API documentation",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development Server",
    },
  ],
  paths: {
    "/": {
      get: {
        summary: "Versão da API",
        description: "Retorna a versão da API",
        tags: ["Versão"],
        responses: {
          200: {
            description: "Versão da API",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    versao: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Registra um novo usuário",
        description: "Cria uma conta de usuário",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "cpf", "email", "password"],
                properties: {
                  name: { type: "string", example: "João Silva" },
                  cpf: { type: "string", example: "123.456.789-00" },
                  email: { type: "string", format: "email", example: "joao@email.com" },
                  password: { type: "string", format: "password", example: "senha123" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Cadastro realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "cadastro realizado com sucesso" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação ou falha no cadastro",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Autenticação de usuário",
        description: "Realiza o login e retorna um token JWT",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "joao@email.com" },
                  password: { type: "string", format: "password", example: "senha123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login bem-sucedido",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                  },
                },
              },
            },
          },
          400: {
            description: "Credenciais inválidas",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
    "/creditor": {
      post: {
        summary: "Adiciona um credor",
        description: "Cria um novo credor",
        tags: ["Creditor"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "is_active"],
                properties: {
                  name: { type: "string", example: "Empresa X" },
                  is_active: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Credor cadastrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "credor cadastrado com sucesso" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
      get: {
        summary: "Lista todos os credores",
        description: "Obtém a lista de todos os credores",
        tags: ["Creditor"],
        responses: {
          200: {
            description: "Lista de credores",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "12345" },
                      name: { type: "string", example: "Empresa X" },
                      is_active: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Nenhum credor encontrado",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
    "/debt": {
      get: {
        summary: "Obtém todas as dívidas do usuário",
        description: "Retorna uma lista de dívidas associadas ao usuário autenticado",
        tags: ["Debt"],
        security: [{ XTokenAuth: [] }],
        responses: {
          200: {
            description: "Lista de dívidas do usuário",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "debt123" },
                      amount: { type: "number", example: 500.75 },
                      due_date: { type: "string", format: "date", example: "2025-03-10" },
                      status: { type: "string", example: "Pendente" },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Nenhuma dívida encontrada para o usuário",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
    "/debt/detail": {
      get: {
        summary: "Obtém detalhes das dívidas do usuário",
        description: "Retorna informações detalhadas sobre as dívidas do usuário autenticado",
        tags: ["Debt"],
        security: [{ XTokenAuth: [] }],
        responses: {
          200: {
            description: "Detalhes das dívidas do usuário",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "debt123" },
                      amount: { type: "number", example: 500.75 },
                      due_date: { type: "string", format: "date", example: "2025-03-10" },
                      status: { type: "string", example: "Pendente" },
                      description: { type: "string", example: "Fatura do cartão de crédito" },
                      creditor: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "creditor789" },
                          name: { type: "string", example: "Banco X" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Nenhuma dívida encontrada para o usuário",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
  "/debt/{id}": {
  get: {
    summary: "Obtém informações de pagamento de uma dívida específica",
    description: "Retorna as opções de pagamento da dívida informada pelo ID",
    tags: ["Debt"],
    security: [{ XTokenAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "ID da dívida a ser consultada",
      },
    ],
    responses: {
      200: {
        description: "Detalhes de pagamento da dívida",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                debtId: { type: "string", example: "685f4247410bded5ffb0b29b" },
                totalAmount: { type: "number", example: 52 },
                creditorName: { type: "string", example: "Enel" },
                minimumInstallments: { type: "integer", example: 1 },
                maximumInstallments: { type: "integer", example: 5 },
                instalmentsPayment: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      amount: { type: "number", example: 52 },
                      number: { type: "integer", example: 1 },
                    },
                  },
                },
              },
              example: {
                debtId: "123",
                totalAmount: 52,
                creditorName: "Enel",
                minimumInstallments: 1,
                maximumInstallments: 5,
                instalmentsPayment: [
                  { amount: 52, number: 1 },
                  { amount: 26, number: 2 },
                  { amount: 17.33, number: 3 },
                  { amount: 13, number: 4 },
                  { amount: 10.4, number: 5 },
                ],
              },
            },
          },
        },
      },
      404: {
        description: "Dívida não encontrada",
      },
      500: {
        description: "Erro interno",
      },
    },
  },
},
    "/agreement": { 
      get: {
        summary: "Obtém todos os acordos do usuário",
        description: "Retorna uma lista de acordos do usuário autenticado",
        tags: ["Agreement"],
        security: [{ XTokenAuth: [] }],
        responses: {
          200: {
            description: "Lista de acordos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "agreement123" },
                      debtId: { type: "string", example: "debt789" },
                      totalInstallment: { type: "integer", example: 12 },
                      status: { type: "string", example: "Ativo" },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Nenhum acordo encontrado",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
      post: {
        summary: "Cria um novo acordo",
        description: "Cria um acordo para uma dívida existente",
        tags: ["Agreement"],
        security: [{ XTokenAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["debtId", "totalInstallment"],
                properties: {
                  debtId: { type: "string", example: "debt789" },
                  totalInstallment: { type: "integer", example: 12 },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Acordo criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "acordo criado com sucesso" },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro de validação ou já existe um acordo para a dívida",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
    "/agreement/{id}": {
      get: {
        summary: "Obtém um acordo por ID",
        description: "Retorna os detalhes de um acordo específico",
        tags: ["Agreement"],
        security: [{ XTokenAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID do acordo a ser consultado",
          },
        ],
        responses: {
          200: {
            description: "Detalhes do acordo",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "agreement123" },
                    debtId: { type: "string", example: "debt789" },
                    totalInstallment: { type: "integer", example: 12 },
                    status: { type: "string", example: "Ativo" },
                  },
                },
              },
            },
          },
          404: {
            description: "Acordo não encontrado",
          },
          500: {
            description: "Erro interno",
          },
        },
      },
    },
  },
  
  components: {
    securitySchemes: {
      XTokenAuth: {
        type: "apiKey",
        in: "header",
        name: "x-token", // Nome do header usado para autenticação
        description: "Token de autenticação necessário para acessar endpoints protegidos.",
      },
    },
  },
};
