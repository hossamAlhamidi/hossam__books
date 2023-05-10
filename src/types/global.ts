export interface IResourceCardActions<T> {
    label: string;
    type: string;
    onPress: (item: T) => void;
    isLoading?: boolean;
  }

  export type BookItem = {
    title: string;
    image: string;
    authors: string[];
    id:string
}