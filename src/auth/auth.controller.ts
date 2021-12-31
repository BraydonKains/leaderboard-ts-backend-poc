import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { comparePassword, hashPassword } from './passwords';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    if (registerDto.password != registerDto.passwordConfirm) {
      throw new BadRequestException();
    }
    const newUser = new User();
    newUser.username = registerDto.username;
    newUser.email = registerDto.email;
    newUser.password = await hashPassword(registerDto.password);
    const createdUser = await this.usersService.upsert(newUser);
    return createdUser.responseFormat();
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findOne({ email: loginDto.email });
    if (!comparePassword(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() req) {
    return {
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('/changeRole')
  async makeAdmin(@Body() changeRoleDto: ChangeRoleDto) {
    const user = await this.usersService.findOne({ id: changeRoleDto.userId });
    user.role = changeRoleDto.newRole;
    const updatedUser = await this.usersService.upsert(user);
    return updatedUser.responseFormat();
  }
}
