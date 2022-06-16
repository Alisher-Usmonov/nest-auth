import { Body, Controller, Get, Post, Request, Res, Render, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Req } from './auth.interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compareHash, hashPass } from 'src/utils/bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @Get('signup')
  @Render('signup')
  signupPage(): void {
    return;
  }

  @Get('signin')
  @Render('signin')
  signinPage(): void {
    return;
  }

  @Post('signup')
  async signUpPost(
    @Body() createUserDto: CreateUserDto,
    @Request() req: Req,
    @Res() res: Response,
  ): Promise<void> {
    let hashPassword = await hashPass(createUserDto.password);
    let user = await this.authService.create({
      ...createUserDto,
      password: hashPassword,
    });

    let token = this.jwtService.sign({
      ...user,
      password: undefined,
    });

    res.cookie('token', token);
    res.redirect("/");
  }

  @Post('signin')
  async signInPost(
    @Body("username") username: string,
    @Body("password") password: string,
    @Request() req: Req,
    @Res() res: Response,
  ): Promise<void> {
    let user = await this.authService.findOne(username);

    if(!user) {
      throw new HttpException("Password or username invalid. Or you'r not registered.", HttpStatus.NOT_FOUND)
    }

    let isPassTrue = await compareHash(password, user.password);
    
    if(!isPassTrue) {
      throw new HttpException("Password is invalid", HttpStatus.BAD_REQUEST);
    }

    let token = this.jwtService.sign({
      ...user,
      password: undefined,
    });

    res.cookie('token', token);
    res.redirect("/");
  }

  @Get("signout")
  signOut(@Res() res: Response) {
    res.clearCookie("token");
    res.redirect("/");
  }
}
