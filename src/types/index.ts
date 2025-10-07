export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  imageHint: string;
  role: 'Farmer' | 'Expert';
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  tags: string[];
  replies: Reply[];
};

export type Reply = {
  id:string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  type: 'Article' | 'Video' | 'Tutorial';
  url: string;
};
