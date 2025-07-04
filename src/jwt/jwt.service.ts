import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { Payload } from 'src/interfaces/payload';

@Injectable()
export class JwtService {
  config = {
    auth: {
      secret: 'authSecret',
      expiresIn: '15m',
    },
    refresh: {
      secret: 'refreshSecret',
      expiresIn: '1d',
    },
  };

  generateToken(
    payload: { email: string },
    type: 'refresh' | 'auth' = 'auth',
  ): string {
    return sign(payload, this.config[type].secret, {
      expiresIn: this.config[type].expiresIn,
    });
  }

  refreshToken(refreshToken: string): { accessToken: string; refreshToken: string } {
    try {
      const payload = this.getPayload(refreshToken, 'refresh');
      const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');

      return {
        accessToken: this.generateToken({ email: payload.email }),
        refreshToken:
          timeToExpire < 20
            ? this.generateToken({ email: payload.email }, 'refresh')
            : refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
    const decoded = verify(token, this.config[type].secret);

    if (typeof decoded === 'string') {
      throw new UnauthorizedException('Token inválido');
    }

    return decoded as Payload;
  }
}
