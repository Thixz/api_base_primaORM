import { compare } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { IUsersRepository } from "../../users/repositories/Iusers-repository";
import { CheckIn, User } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/Icheck-ins-repository";
import { IGymsRepository } from "../../gyms/repositories/Igyms-repository";

interface CreateCheckInUseCaseRequest {
  user_id: string;
  gym_id: string;
  userLatitude: number;
  userLongitude: number;
}

interface CreateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CreateCheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    user_id,
    gym_id,
    userLatitude,
    userLongitude,
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {
    const gym = this.gymsRepository.findById(gym_id);

    if (!gym) {
      throw new DefaultError("Gym not found.", 400);
    }

    
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new DefaultError(
        "A check in with the same date already exists.",
        400
      );
    }

    const checkIn = await this.checkInsRepository.create({ user_id, gym_id });

    return { checkIn };
  }
}
