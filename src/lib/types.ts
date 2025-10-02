export type Quote = {
  id: number;
  text: string;
  author: string;
};

export type Category = {
  id: number;
  slug: string;
  title: string;
  description: string;
  details: {
    causes: string[];
    symptoms: string[];
    effects: string[];
  };
};
