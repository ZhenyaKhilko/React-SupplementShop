export type Supplement = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  types: number[];
  weights: number[];
  price: number;
  category: number;
  rating: number;
};

export type SearchSupplementsParams = {
  currentPage: number;
  category: string;
  sortBy: string;
  sort: string;
  search: string;
};
