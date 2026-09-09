import content from '../../public/content.json';
export const data = content;
export type Portfolio = typeof content;
export type BlogPost = Portfolio['blog'][number];
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = 'https://theadityashah.com';
