import { Company } from '../services/company.service';
import { Category } from './category';

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  freeShip: boolean;
  category: Category;
  company: Company;
};
