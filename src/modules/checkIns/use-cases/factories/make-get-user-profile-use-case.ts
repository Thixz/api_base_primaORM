import { PrismaUsersRepository } from "../../../users/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../../../users/use-cases/get-user-profile";

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository);

  return getUserProfileUseCase;
}
