import { PrismaCheckInsRepository } from "../../../checkIns/repositories/prisma/prisma-check-ins-repository";
import { GetUserCheckInsUseCase } from "../../../checkIns/use-cases/get-user-check-ins";

export function makeGetUserCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const getUserCheckInsUseCase = new GetUserCheckInsUseCase(prismaCheckInsRepository);

  return getUserCheckInsUseCase;
}
