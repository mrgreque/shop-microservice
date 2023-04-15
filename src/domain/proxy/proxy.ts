interface DefaulClass {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  execute(data: any): Promise<any>;
}

interface GetDefaultClass {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  execute(pagination: any): Promise<any>;
}

interface EstabilishmentProxy {
  createEstabilishment: DefaulClass;
  getEstabilishments: GetDefaultClass;
}

export interface IProxy {
  estabilishmentProxy(): EstabilishmentProxy;
}
