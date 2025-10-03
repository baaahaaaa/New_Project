import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsNotEmpty({ message: 'L\'adresse email ne peut pas être vide.' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide.' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  password: string;
}