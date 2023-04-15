import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import path from 'node:path';
import { EstabilishmentResolver } from './infra/resolvers/estabilishment.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [EstabilishmentResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
