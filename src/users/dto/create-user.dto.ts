export class CreateUserDto {
    name: string;
    email: string;
    role: 'Developer' | 'QATester' | 'DevOps'
}