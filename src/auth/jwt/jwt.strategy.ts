import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { payload } from './jwt.payload';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: payload) {
    const cat = await this.catsRepository.findCatByWithoutPassword(payload.sub);

    if (cat) {
      return cat; //request.user
    } else {
      throw new UnauthorizedException('인증 오류');
    }
  }
}
