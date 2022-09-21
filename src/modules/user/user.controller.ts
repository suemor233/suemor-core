import { Body, Controller, Get,  HttpCode,  Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { UserDto, UserRegisterDto } from './user.dto'
import { UserService } from './user.service'
import { AuthService } from '../auth/auth.service';
import { Auth } from '~/common/decorator/auth.decorator'


@Controller('user')
@ApiName
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() userDto: UserRegisterDto) {
    await this.userService.createUser(userDto)
    return 'ok'  
  }

  @Get()
  @ApiOperation({ summary: '获取主人基本信息' })
  async getUserInfo() {
    return await this.userService.getUserInfo()
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @HttpCode(200)
  async login(@Body() dto: UserDto) {
    const user = await this.userService.login(dto.username, dto.password)
    const { username } = user
    return {
      username,
      token: await this.authService.signToken(user.id.toString()),
      expiresIn: 7,
    }
  }

  @Get('check_logged')
  @ApiOperation({ summary: '判断当前 Token 是否有效 ' })
  @Auth()
  checkLogged() {
    return 'ok'
  }
}
