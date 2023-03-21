import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당 이메일이 있는지 없는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인하세요');
    }
    //* 해당 비밀번호가 있는지 없는지 확인
    const isPasswordValidate: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidate) {
      throw new UnauthorizedException('이메일과 비빌먼호를 확인하세요');
    }

    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
