import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id?: number;
    @Column({ type: 'varchar', unique: true, name: 'email' })
    email: string;
    @Column({ type: 'varchar', name: 'password' })
    password: string;
}
