import { Prisma, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { IUsersRepository } from "../Iusers-repository";
import { randomUUID } from 'node:crypto'


export class InMemoryUsersRepository implements IUsersRepository {
    public users : Prisma.UserCreateInput[] = [];
    create(data: Prisma.UserCreateInput) {
        const user = { 
            id: randomUUID(),
            name:data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at : new Date()
        }

        this.users.push(user);

        return user;
    }

    findByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
 
}
