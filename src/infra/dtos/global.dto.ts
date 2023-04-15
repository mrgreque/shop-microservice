import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class DefaultResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class Pagination {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;
}

@ObjectType()
export class QueryParams {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  limit: number;
}
