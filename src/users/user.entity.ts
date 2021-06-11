import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 25 })
	fullName: string;

	@Column('date')
	birthday: Date;

	@Column()
	isActive: boolean;

	static of(partialUser: Partial<User>): User {
		const user = new User();

		Object.assign(user, partialUser);

		return user;
	}

}
