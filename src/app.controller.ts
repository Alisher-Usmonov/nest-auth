import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from "express";
import { AppService } from './app.service';
import { Req as Request } from './auth/auth.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Req() req: Request, @Res() res: Response): any {
    res.render("home", {
      user: req.user
    })
  }
}
