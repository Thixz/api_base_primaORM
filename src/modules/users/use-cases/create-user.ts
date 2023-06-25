import { hash } from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { IUsersRepository } from "../repositories/Iusers-repository";
import { DefaultError } from "../../../helpers/DefaultError";
import { User } from "@prisma/client";

interface CreateUserUseCaseParams {
  name: string;
  email: string;
  password: string;
}

// SOLID
// D - DEPENDENCY INVERSION PRINCIPLE ( PRINCIPIO DE INVERSÃO DE DEPENDÊNCIA). Aqui no caso poderiamos instanciar o repositório e chamá-lo na service, porém você concordo
// que a service estaria diretamente ligada ao repositório e se caso amanhã quisessmos mudar o método comunicação com o database teriamos que alterar todas as services?
// por este motivo não instanciamos o repositótirio diretamenta na service, mas sim recebemos essa depência como parâmetro.

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseParams) {
    const password_hash = await hash(password, 6); // 6 é o numero de rounds que aquela senha vai ser encriptada. Quanto mais rounds mais seguro, porém mais pesado para a app.

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new DefaultError(
        "It's not possible to create an user with duplicated email address.",
        409
      );
    }

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { createdUser };
  }
}
