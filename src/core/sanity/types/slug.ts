import { z } from 'zod';

// Not making this nullable as all queries check for slug
export const SlugSchema = z.string();
