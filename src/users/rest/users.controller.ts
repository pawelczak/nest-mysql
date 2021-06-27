import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { Response } from 'express';


@Controller('user')
export class UsersController {

	constructor(private usersService: UsersService) {
	}

	@Get()
	async findAll(
		@Res() response: Response
	) {
		const users = await this.usersService.getUsers();

		return response.status(HttpStatus.OK).json(users);
	}

	@Get(':id')
	async findOne(
		@Param('id', new ParseIntPipe()) id: number,
		@Res() response: Response
	) {
		const user = await this.usersService.getUserById(id);

		return response.status(HttpStatus.OK).json(user);
	}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@Res() response: Response
	) {
		const user = await this.usersService.createUser(createUserDto);

		return response.status(HttpStatus.CREATED).json(user);
	}

	@Put(':id')
	async update(
		@Param('id', new ParseIntPipe()) id: number,
		@Body() updateUserDto: UpdateUserDto,
		@Res() response: Response
	) {
		const updatedUser: User = await this.usersService.updateUser(id, updateUserDto);

		return response.status(HttpStatus.OK).json(updatedUser);
	}

	@Delete(':id')
	async deleteUser(
		@Param('id', new ParseIntPipe()) id: number,
		@Res() res: Response
	) {
		await this.usersService.deleteUser(id);

		return res.status(HttpStatus.NO_CONTENT).send();
	}
}
