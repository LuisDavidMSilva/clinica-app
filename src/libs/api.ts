import axios from 'axios';

// export const baseURL = 'http://localhost:3333';
export const baseURL = 'https://clinica-api-for-mobile.herokuapp.com';

export const api = axios.create({ baseURL });
/**
 * patients
 * authentication
 * seeds
 *   public readonly id: string;
  public name: string;
  public cpf: string;
  public rg: string;
  public phone: string;
  public email: string;
  public gender: Gender = 'MALE';
  public address: string;
  public district: string;
  public county: string;
 */
