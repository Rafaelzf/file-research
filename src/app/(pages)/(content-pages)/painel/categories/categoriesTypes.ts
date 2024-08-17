import { Id } from "../../../../../../convex/_generated/dataModel";

export type CategoriesType = {
  _id: Id<"categories">;
  name: string;
  description?: string;
  _creationTime: number;
};
