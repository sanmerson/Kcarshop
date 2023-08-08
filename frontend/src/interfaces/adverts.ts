import { Dispatch, SetStateAction } from 'react';

export interface IAdvertsProps {
  adverts: iAdvert[] | null;
  addAdverts: (data: any) => Promise<void>;
  delAdverts: (id: string) => Promise<void>;
  getAdverts: () => Promise<void>;
  patchAdverts: (data: any, id: string) => Promise<void>;
  children?: React.ReactNode;
  getEspecificAdverts: any;
  brands: string[];
  selectBrand: string;
  setSelectBrand: Dispatch<SetStateAction<string>>;
  selectModelValues: iModel[];
  setSelectModelValues: Dispatch<SetStateAction<iModel[]>>;
  selectModel: string;
  setSelectModel: Dispatch<SetStateAction<string>>;
  selectModelData: iModel | undefined;
  setSelectModelData: Dispatch<SetStateAction<iModel | undefined>>;
  inputImages: boolean[];
  setInputImages: Dispatch<SetStateAction<boolean[]>>;
  handleImages: () => void;
  handleBrandChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fuelType: (n: number) => '' | 'Flex' | 'Híbrido' | 'Elétrico';
  isConfirmModal: boolean;
  setIsConfirmModal: Dispatch<SetStateAction<boolean>>;
  filteredAdverts: iAdvert[] | null;
  setFilteredAdverts: React.Dispatch<React.SetStateAction<iAdvert[] | null>>;
}

export interface iCreateAdvertModalProps {
  setIsCreateAdvertModal: Dispatch<SetStateAction<boolean>>;
}

export interface iCreateAdvert {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  mileage: string | number;
  color: string;
  fip: string;
  price: string;
  description: string;
  banner: string;
  is_bargain?: boolean;
  is_published?: boolean;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  images: string[];
}

export interface iModel {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

export interface iEditAdvertModalProps {
  setIsEditAdvertModal: Dispatch<SetStateAction<boolean>>;
  id?: string;
}

export interface iAdvert {
  id: string;
  brand: string;
  banner: string;
  model: string;
  year: string;
  fuel: string;
  mileage: number;
  color: string;
  price: string;
  description: string;
  is_bargain: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  fip: string;
  images: string[]
}

export interface iAdvertComment {
  id: string;
  brand: string;
  banner: string;
  model: string;
  year: string;
  fuel: string;
  mileage: number;
  color: string;
  price: string;
  description: string;
  is_bargain: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  fip: string;
}

export interface iEditAdvert {
  brand?: string;
  banner?: string;
  model?: string;
  year?: string;
  fuel?: string;
  mileage?: string;
  color?: string;
  price?: string;
  description?: string;
  is_bargain?: boolean;
  is_published?: boolean;
  fip?: string;
  firstImage?: string;
  secondImage?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  images?: string[];
  [key: string]: any;
}

export interface iImage {
  url: string;
}

export interface iCreateComment {
  text: string;
}