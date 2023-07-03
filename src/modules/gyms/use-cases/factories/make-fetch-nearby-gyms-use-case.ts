import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const fetchNearbyGymUseCase = new FetchNearbyGymsUseCase(prismaGymsRepository);

  return fetchNearbyGymUseCase;
}
