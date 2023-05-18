import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { z } from "zod";

export function canParseJson (text: string) {
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

export function zjsonFromString<T extends z.Schema> (schema: T, text: string) {
    try {
        const object = JSON.parse(text)
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
export async function zjson<T extends z.Schema> (schema: T, path: string) {
    const text = await readFile(path, 'utf8');
    return zjsonFromString(schema, text);
}

export function zjsonSync<T extends z.Schema> (schema: T, path: string) {
    const text = readFileSync(path, 'utf8');
    return zjsonFromString(schema, text);
}