import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JWTAuthGuard)
  @Get()
  getProtectedRoute() {
    return { message: 'This is a protected route!' };
  }
}
