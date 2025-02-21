import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PrismaService,
    JwtModule.register({
      secret: 'basanta!', // Replace with environment variable later
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
