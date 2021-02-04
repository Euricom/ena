export interface UpdateCrudInput {
  id: string;
}

export interface Crud {
  update(updateData: UpdateCrudInput): void;
}
