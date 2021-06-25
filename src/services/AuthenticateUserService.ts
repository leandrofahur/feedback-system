import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error('Incorrect credentials');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect credentials');
    }

    console.log('here as well');
    const payload = {
      email: user.email,
    };

    const token = sign(payload, '76aa8e99f592680e6d8c93dd1bb1d932', {
      subject: user.id,
      expiresIn: '1d',
    });

    console.log(token);

    return token;
  }
}

export { AuthenticateUserService };
