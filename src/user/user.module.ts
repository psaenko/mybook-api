import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	imports: [MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema },
	])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {
}
