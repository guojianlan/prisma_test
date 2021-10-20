import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    });
  }
  @Get('test')
  getHelloTest() {
    return prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    });
  }
  @Get('testdelete')
  async getHelloTestDelete() {
    return await prisma.user.delete({
      where: {
        id: 2,
      },
    });
  }
}
