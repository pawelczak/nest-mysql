import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			'type': 'mysql',
			'host': 'localhost',
			'port': 3306,
			'username': 'root',
			'password': 'root!@#$',
			'database': 'nest-mysql',
			'synchronize': true,
			entities: [path.join(__dirname, '**/*.entity{.ts,.js}')]
		}),
		UsersModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
