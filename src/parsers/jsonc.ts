import { readFile } from 'fs/promises';
import { parse } from 'jsonc-parser';
import { z } from "zod";

export function canParseJsonC (text: string) {
    try {
        parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

export function zjsoncFromString<T extends z.Schema> (schema: T, text: string) {
    try {
        const object = parse(text)
        const parsed = schema.parse(object);
        return parsed as z.infer<T>;
    } catch (error) {
        if (error instanceof z.ZodError) {
            let errorList: string[] = []
            errorList.push('Config validation error:');
            for (const issue of error.issues) {
                errorList.push(['      ', issue.path.join('.'), issue.message].join(' '));
            }
            throw new Error(errorList.join('\n'));
        } else {
            throw error;
        }
    }
}
export async function zjsonc<T extends z.Schema> (schema: T, path: string) {
    const text = await readFile(path, 'utf8');
    return zjsoncFromString(schema, text);
}