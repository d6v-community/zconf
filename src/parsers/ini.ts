import { parse } from 'ini';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { z } from "zod";

export function canParseIni (text: string) {
    try {
        parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

export function ziniFromString<T extends z.Schema> (schema: T, text: string) {
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
export async function zini<T extends z.Schema> (schema: T, path: string) {
    const text = await readFile(path, 'utf8');
    return ziniFromString(schema, text);
}
export function ziniSync<T extends z.Schema> (schema: T, path: string) {
    const text = readFileSync(path, 'utf8');
    return ziniFromString(schema, text);
}