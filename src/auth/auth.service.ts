import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginuserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //   this is for creating a new user!

  async signup(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    // hash the password before storing it in the db!
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user in the database using Prisma
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  // Logic for logging In

  async validateUser(loginUserDto: LoginuserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return new HttpException('User not found', 404);

    // Checking if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) return user;

    return new HttpException('Invalid credentials', 401);
  }

  // Login and return a JWT TOken!

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
