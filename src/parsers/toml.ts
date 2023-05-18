import { readFile } from 'fs/promises';
import * as toml from 'toml';
import { z } from "zod";

export function canParseToml (text: string) {
    try {
        toml.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

export function ztomlFromString<T extends z.Schema> (schema: T, text: string) {
    try {
        const object = toml.parse(text)
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
export async function ztoml<T extends z.Schema> (schema: T, path: string) {
    const text = await readFile(path, 'utf8');
    return ztomlFromString(schema, text);
}