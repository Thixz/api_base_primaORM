import { PrismaCheckInsRepository } from "../../../checkIns/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchUserUseCase = new FetchUserCheckInsUseCase(prismaCheckInsRepository);

  return fetchUserUseCase;
}
