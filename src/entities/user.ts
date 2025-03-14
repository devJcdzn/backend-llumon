import { nanoid } from "nanoid";

export interface UserDTO {
  name: string;
  surname: string;
  cpf?: string;
  email: string;
}

export class User {
  public id: string;
  public name: string;
  public surname: string;
  public cpf?: string;
  public email: string;

  constructor(data: UserDTO) {
    this.id = `user_${nanoid()}`;
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;

    if (data.cpf) {
      this.cpf = this.cpf;
    }
  }

  changeName(name: string) {
    this.name = name;
  }

  changeSurname(surname: string) {
    this.surname = surname;
  }

  changeCpf(cpf: string) {
    this.cpf = cpf;
  }
}
