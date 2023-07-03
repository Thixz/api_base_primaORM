import { PrismaGymsRepository } from "../../../gyms/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { CreateCheckInUseCase } from "../create-check-in";

export function makeCreateCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const createCheckInUseCase = new CreateCheckInUseCase(prismaCheckInRepository,prismaGymsRepository);

  return createCheckInUseCase;
}
