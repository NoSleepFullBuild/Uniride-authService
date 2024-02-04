import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column('bigint')
    expiration: number; // Stocker le timestamp d'expiration pour éventuellement nettoyer les vieux tokens
}
