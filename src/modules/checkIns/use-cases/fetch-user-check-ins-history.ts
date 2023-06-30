import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../../checkIns/repositories/Icheck-ins-repository";

interface FetchUserCheckInsUseCaseRequest {
  user_id: string;
  page : number;
}

interface FetchUserCheckInsUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    user_id,
    page
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(user_id,page);

    return { checkIns };
  }
}
