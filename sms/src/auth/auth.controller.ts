import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStaffDto } from './dto/login-staff.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: LoginStaffDto) {
    return this.authService.login(signInDto);
  }

  @Post('student/login')
   studentLogin(@Body() signInDto: LoginStaffDto) {
    return this.authService.studentLogin(signInDto);
  }
}
