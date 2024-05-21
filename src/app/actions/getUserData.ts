
import { PRODUCTS_PER_PAGE } from '@/constants';
import axios from 'axios'

export interface IUserDataParams {
  page?: number;
  skip?: number;
}
export interface IUser {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
interface IUserData {
  data: IUser[];
  totalItems: number;
}
const getUserData = async (params: IUserDataParams):Promise<IUserData> => {
  try {
    const skip = params.skip ? Number(params.skip) : 0;
    const take = PRODUCTS_PER_PAGE
    const res = await axios.get<IUser[]>(
      "https://jsonplaceholder.typicode.com/photos"
    ); 
    const resFilter = res.data.filter((user) => user.id > skip && user.id < skip + take + 1);
    const totalItems = res.data.length / take;
    return {
      data: resFilter,
      totalItems,
    };
  } catch (error: any) {
    throw new Error(error)
  }
}
export default getUserData