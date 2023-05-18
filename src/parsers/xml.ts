import * as xml from 'fast-xml-parser';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { z } from "zod";
export function canParseXml (text: string) {
    try {
        const parser = new xml.XMLParser()
        parser.parse(text)
        return true;
    } catch (error) {
        return false;
    }
}
export function zxmlFromString<T extends z.Schema> (schema: T, text: string) {
    try {
        const parser = new xml.XMLParser()
        const object = parser.parse(text)
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
export async function zxml<T extends z.Schema> (schema: T, path: string) {
    const text = await readFile(path, 'utf8');
    return zxmlFromString(schema, text);
}
export function zxmlSync<T extends z.Schema> (schema: T, path: string) {
    const text = readFileSync(path, 'utf8');
    return zxmlFromString(schema, text);
}