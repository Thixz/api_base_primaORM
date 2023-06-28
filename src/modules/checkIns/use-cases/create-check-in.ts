import { compare } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { IUsersRepository } from "../../users/repositories/Iusers-repository";
import { CheckIn, User } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/Icheck-ins-repository";
import { IGymsRepository } from "../../gyms/repositories/Igyms-repository";
import { getDistanceBetweenCoordinates } from "../../../helpers/get-distance-between-coordinates";

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
    const gym = await this.gymsRepository.findById(gym_id);

    if (!gym) {
      throw new DefaultError("Gym not found.", 400);
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_METER = 100;
    if(distance > MAX_DISTANCE_IN_METER){
      throw new DefaultError(
        "You are trying to check in a Gym that has the distance bigger than permited.",
        400
      );
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
