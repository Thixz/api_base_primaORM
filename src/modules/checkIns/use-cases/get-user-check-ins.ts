import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../../checkIns/repositories/Icheck-ins-repository";

interface GetUserCheckInsUseCaseRequest {
  user_id: string;
}

interface GetUserCheckInsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserCheckInsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    user_id,
  }: GetUserCheckInsUseCaseRequest): Promise<GetUserCheckInsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(user_id);

    return { checkInsCount };
  }
}
