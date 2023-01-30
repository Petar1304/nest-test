import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityFactory } from 'src/ability/ability.factory';
import { User } from '../user/entities/user.entity';
import { Action, Subject } from '../ability/ability.factory';
import { CheckAbilities } from 'src/ability/abilities.decorator';
  
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private abilityFactory: AbilityFactory
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // const user = req.user;
    const user: User = {
      id: 1,
      isAdmin: false,
    }
    
    const ability = this.abilityFactory.defineAbility(user);

    const isAllowed = ability.can(Action.Create, Subject.Finances);

    if (!isAllowed) {
      throw new ForbiddenException('You are not authorized');
    }
    
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckAbilities({action: Action.Delete, subject: Subject.Locations})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
