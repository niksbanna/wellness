export type ResourceType = 'blog' | 'guide' | 'faq' | 'news';

export type ResourceCategory =
  | 'weight-loss'
  | 'nutrition'
  | 'exercise'
  | 'medications'
  | 'mental-health'
  | 'success-stories'
  | 'general';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: ResourceType;
  category: ResourceCategory;
  author: {
    name: string;
    credentials?: string;
    avatar?: string;
  };
  publishedDate: string;
  lastUpdated?: string;
  readTime: number; // in minutes
  featuredImage?: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
