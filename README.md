# SHOP-MICROSERVICE

Micro-serviço destinado à APP de divulgação de lista de produtos, e sua precificação, de diferentes tipos de comércios, como por exemplo: Mercade, Farmácia e Açougue. Serão utilizados no desenvolvimento:

- Typescript
- GraphQL
- Jest
- Docker

## Instalação

Instalação das dependências do projeto.
```bash
yarn install
```

## Execução

Execução indicada.É necessário ter o Docker instalado para execução desta forma.

URL de acesso:
[http://localhost:5017](http://localhost:5017)

```bash
docker-compose up
```

Para execução local, sem utilização de containers, utilize:

URL de acesso:
[http://localhost:4000](http://localhost:4000)

```bash
yarn dev
```

E crie um arquivo *.env* informando a URL de duas conexões à base de dados MongoDB:

```bash
MANAGER_URL=""
TENANT_URL=""
```

## Exemplos de *Querys*

#### Obter estabelecimentos

- Corpo

```javascript
query GetEstabilishments($pagination: Pagination!) {
  getEstabilishments(pagination: $pagination) {
    estabilishments {
      _id
      address {
        city
        country
        number
        postalCode
        state
        street
      }
      banner
      channels {
        database {
          acronyum
        }
      }
      cnpj
      description
      email
      logo
      name
      phone
      type
      website
    }
    total
  }
}
```

- Variáveis

```javascript
{
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "search": "Busca recursiva por nome, cnpj ou tipo de comércio"
  }
}
```

## Exemplos de *Mutations*

#### Criar estabelecimentos

- Corpo

```javascript
mutation CreateEstabilishment($input: EstabilishmentInput!) {
  createEstabilishment(input: $input) {
    message
    success
  }
}

```

- Variáveis

```javascript
{
  "input": {
    "address": {
      "city": "Rio de Janeiro",
      "country": "Brasil",
      "number": 2,
      "postalCode": "12345-000",
      "state": "SP",
      "street": "Rua Teste"
    },
    "banner": "https://...",
    "cnpj": "01321456000123",
    "description": "O melhor mercado",
    "email": "email@email.com",
    "logo": "https://...",
    "name": "Mercado",
    "phone": "+55 16 990000-0000",
    "type": "MARKET",
    "website": "https://..."
  }
}
```
