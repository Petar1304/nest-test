import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AbilityModule } from 'src/ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from 'src/ability/abilities.guard';

@Module({
  imports: [AbilityModule],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
