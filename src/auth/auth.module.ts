import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokensModule } from './tokens/tokens.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [TokensModule],
  controllers: [AuthController]
})
export class AuthModule {}
