import { compare } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { IUsersRepository } from "../repositories/Iusers-repository";
import { User } from "@prisma/client";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DefaultError("Invalid credentials.", 400);
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new DefaultError("Invalid credentials.", 400);
    }

    return { user };
  }
}
