import { schemaForType } from './schemaForType';
import type { TypedObject } from 'sanity';
import { z } from 'zod';

// All blocks will validate against this initially
export const baseTypedObjectSchema = z
	.object({
		_type: z.string(),
		_key: z.string().optional()
	})
	// Not happy we have to pass through, but this is the only way to
	// satisfy TypedObject for `value` in @react/portable-text and the rest of the data through
	.passthrough();

// This helper function will generate a zod parser for a given type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TypedObjectSchema = schemaForType<TypedObject>()(baseTypedObjectSchema);

export const typedObjectBlockZ = baseTypedObjectSchema.extend({
	style: z.string().optional()
	// children: z
	//   .array(
	//     z.object({
	//       _type: z.string(),
	//       _key: z.string(),
	//       marks: z.array(z.string()).optional(),
	//       text: z.string(),
	//     })
	//   )
	//   .optional(),
	// markDefs: z
	//   .array(
	//     z
	//       .object({
	//         _type: z.string(),
	//         _key: z.string(),
	//       })
	//       .optional()
	//   )
	//   .optional(),
});

export type TypedObjectBlock = z.infer<typeof typedObjectBlockZ>;
