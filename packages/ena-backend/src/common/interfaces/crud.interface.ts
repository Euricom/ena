import { IUpdateCrudInput } from './inputs/updateCrud.input';

export interface ICrud {
  update(updateData: IUpdateCrudInput): void;
}
