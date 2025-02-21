import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  //   This runs when the module is initialized
  async onModuleInit() {
    await this.$connect();
  }

  //   This runs when the module is destroyed (clean up resources)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
