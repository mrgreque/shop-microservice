import { Arg, Mutation, Query } from 'type-graphql';
import { DefaultResponse, Pagination } from '../dtos';
import { UseCaseProxy } from '../usecase-proxy/usecase.proxy';
import {
  CreateEstabilishment,
  GetEstabilishments,
} from '../../usecases/establishment';
import {
  EstabilishmentInput,
  EstabilishmentResponse,
} from '../dtos/estabilishment.dto';

export class EstabilishmentResolver {
  private readonly usecaseProxy: UseCaseProxy;
  private readonly createEstabilishmentProxy: CreateEstabilishment;
  private readonly getEstabilishmentsProxy: GetEstabilishments;

  constructor() {
    this.usecaseProxy = new UseCaseProxy();
    this.createEstabilishmentProxy =
      this.usecaseProxy.estabilishmentProxy().createEstabilishment;
    this.getEstabilishmentsProxy =
      this.usecaseProxy.estabilishmentProxy().getEstabilishments;
  }

  @Query(() => EstabilishmentResponse)
  async getEstabilishments(
    @Arg('pagination') pagination: Pagination,
  ): Promise<EstabilishmentResponse> {
    const estabilishments = await this.getEstabilishmentsProxy.execute(
      pagination,
    );
    return estabilishments;
  }

  @Mutation(() => DefaultResponse)
  async createEstabilishment(
    @Arg('input') input: EstabilishmentInput,
  ): Promise<DefaultResponse> {
    return await this.createEstabilishmentProxy.execute(input);
  }
}
