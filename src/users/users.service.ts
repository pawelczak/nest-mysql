import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './rest/create-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './rest/update-user.dto';


@Injectable()
export class UsersService {

	constructor(private readonly usersRepository: UserRepository) {
	}

	getUsers(): Promise<Array<User>> {
		return this.usersRepository.find();
	}

	async getUserById(id: number): Promise<User> {
		const user = await this.usersRepository.findOne({
			where: { 'id': id }
		});

		if (user === undefined) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	createUser(createUserDto: CreateUserDto): Promise<User> {

		let newUser = new User();

		newUser.id = createUserDto.id;
		newUser.fullName = createUserDto.fullName;
		newUser.birthday = new Date(Date.now());
		newUser.isActive = false;

		return this.usersRepository.save(newUser);
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const userToUpdate = await this.getUserById(id);

		userToUpdate.fullName = updateUserDto.fullName;

		return this.usersRepository.save(userToUpdate);
	}

	async deleteUser(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
