import { DefaultError } from "../../../helpers/DefaultError";
import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/Icheck-ins-repository";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest {
  checkIn_id: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkIn_id,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkIn_id);

    if (!checkIn) {
      throw new DefaultError("Check-in not found.", 400);
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new DefaultError("Check-in expired.", 400);
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
