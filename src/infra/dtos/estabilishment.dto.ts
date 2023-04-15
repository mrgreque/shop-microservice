/* eslint-disable no-unused-vars */
import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';

export enum EstabilishmentType {
  MARKET = 'MARKET',
  PHARMACY = 'PHARMACY',
  BUTCHER = 'BUTCHER',
}

registerEnumType(EstabilishmentType, {
  name: 'EstabilishmentType',
  description: 'Estabilishment type',
});

@ObjectType()
export class Address {
  @Field(() => String)
  street: string;

  @Field(() => Number)
  number: number;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  postalCode: string;
}

@InputType()
export class AddressInput {
  @Field(() => String)
  street: string;

  @Field(() => Number)
  number: number;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  postalCode: string;
}

@ObjectType()
export class Database {
  @Field(() => String)
  acronyum: string;
}

@ObjectType()
export class Channels {
  @Field(() => Database)
  database: Database;
}

@ObjectType()
export class EstabilishmentObject {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  cnpj: string;

  @Field(() => Address)
  address: Address;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  website: string;

  @Field(() => String)
  logo: string;

  @Field(() => String)
  banner: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  type: EstabilishmentType;

  @Field(() => Channels)
  channels: Channels;
}

@InputType()
export class EstabilishmentInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  cnpj: string;

  @Field(() => AddressInput)
  address: AddressInput;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  website: string;

  @Field(() => String)
  logo: string;

  @Field(() => String)
  banner: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  type: EstabilishmentType;
}

@ObjectType()
export class EstabilishmentResponse {
  @Field(() => [EstabilishmentObject])
  estabilishments: EstabilishmentObject[];

  @Field(() => Number)
  total: number;
}
