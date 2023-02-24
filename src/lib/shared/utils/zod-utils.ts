import { z } from 'zod';

// A way to parse URLSearchParams with Zod

function safeParseJSON(string: string): any {
	try {
		return JSON.parse(string);
	} catch {
		return string;
	}
}

function searchParamsToValues(searchParams: URLSearchParams): Record<string, any> {
	return Array.from(searchParams.keys()).reduce((record, key) => {
		const values = searchParams.getAll(key).map(safeParseJSON);
		return { ...record, [key]: values.length > 1 ? values : values[0] };
	}, {} as Record<string, any>);
}

export function makeSearchParamsObjSchema<Schema extends z.ZodObject<z.ZodRawShape>>(
	schema: Schema
) {
	return z.instanceof(URLSearchParams).transform(searchParamsToValues).pipe(schema);
}

export function coerceToArray<Schema extends z.ZodArray<z.ZodTypeAny>>(schema: Schema) {
	return z.union([z.any().array(), z.any().transform((x) => [x])]).pipe(schema);
}
