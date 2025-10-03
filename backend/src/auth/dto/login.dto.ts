import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsNotEmpty({ message: 'L\'adresse email ne peut pas être vide.' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide.' })
  password: string;
}