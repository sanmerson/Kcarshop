import { Address } from "../../Entities/addresses.entity";
import { Annoucement } from "../../Entities/annoucement.entity";
import { Comments } from "../../Entities/comments.entity";

export interface IAddressRequest {
  cep: string;
  state: string;
  city: string;
  number: string;
  road: string;
  complement?: string;
}

export interface IAddressPatch {
  cep?: string | null;
  state?: string | null;
  city?: string | null;
  number?: string | null;
  road?: string | null;
  complement?: string | null;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  description: string;
  is_seller: boolean;
  birth_date: Date;
  address: IAddressRequest;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  birth_date: Date;
  email: string;
  is_seller: boolean;
  phone: string;
  description: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  comments: Comments[];
  annoucement: Annoucement[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  birth_date: Date;
  is_seller: boolean;
  phone: string;
  cpf: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  address?: IAddressPatch | null;
  annoucement?: Annoucement[];
  comments?: Comments[];
}

export interface IUserWOpassword {
  id: string;
  name: string;
  email: string;
  birth_date: Date;
  is_seller: boolean;
  phone: string;
  cpf: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  address?: IAddressPatch | null;
  annoucement?: Annoucement[];
  comments?: Comments[];
}

export interface IUserUpdate {
  name?: string | null;
  phone?: string | null;
  birth_date?: Date | null;
  description?: string | null;
  cpf?: string | null;
  email?: string | null;
  password?: string | null;
  address?: IAddressPatch | null;
}
