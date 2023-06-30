import { compare } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { IUsersRepository } from "../repositories/Iusers-repository";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  user_id: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    user_id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new DefaultError("Resource not found.", 400);
    }

    return { user };
  }
}
