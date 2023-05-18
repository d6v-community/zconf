import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { z } from "zod";
import { canParseIni, zini, ziniFromString, ziniSync } from "./parsers/ini";
import { canParseJson, zjson, zjsonFromString, zjsonSync } from "./parsers/json";
import { canParseJsonC, zjsonc, zjsoncFromString, zjsoncSync } from "./parsers/jsonc";
import { canParseToml, ztoml, ztomlFromString, ztomlSync } from "./parsers/toml";
import { canParseXml, zxml, zxmlFromString, zxmlSync } from "./parsers/xml";
import { canParseYaml, zyaml, zyamlFromString, zyamlSync } from "./parsers/yaml";


export {
    z,
    zini,
    ziniFromString,
    ziniSync,
    zjson,
    zjsonFromString,
    zjsonSync,
    zjsonc,
    zjsoncFromString,
    zjsoncSync,
    ztoml,
    ztomlFromString,
    ztomlSync,
    zxml,
    zxmlFromString,
    zxmlSync,
    zyaml,
    zyamlFromString,
    zyamlSync
};
export function zconfFromString<T extends z.Schema> (schema: T, text: string) {
    if (canParseToml(text)) {
        return ztomlFromString(schema, text);
    }
    if (canParseJson(text)) {
        return zjsonFromString(schema, text);
    }
    if (canParseYaml(text)) {
        return zyamlFromString(schema, text);
    }
    if (canParseXml(text)) {
        return zxmlFromString(schema, text);
    }
    if (canParseIni(text)) {
        return ziniFromString(schema, text);
    }
    if (canParseJsonC(text)) {
        return zjsoncFromString(schema, text);
    }
    throw new Error('Unable to parse config file');
}
export async function zconf<T extends z.Schema> (schema: T, path: string) {
    if (path.endsWith('.yml') || path.endsWith('.yaml')) {
        return zyaml(schema, path);
    }
    if (path.endsWith('.toml')) {
        return ztoml(schema, path);
    }
    if (path.endsWith('.json')) {
        return zjson(schema, path);
    }
    if (path.endsWith('.xml')) {
        return zxml(schema, path);
    }
    if (path.endsWith('.ini')) {
        return zini(schema, path);
    }
    if (path.endsWith('.jsonc')) {
        return zjsonc(schema, path);
    }
    const text = await readFile(path, 'utf8');
    return zconfFromString(schema, text);
}


export function zconfSync<T extends z.Schema> (schema: T, path: string) {
    if (path.endsWith('.yml') || path.endsWith('.yaml')) {
        return zyamlSync(schema, path);
    }
    if (path.endsWith('.toml')) {
        return ztomlSync(schema, path);
    }
    if (path.endsWith('.json')) {
        return zjsonSync(schema, path);
    }
    if (path.endsWith('.xml')) {
        return zxmlSync(schema, path);
    }
    if (path.endsWith('.ini')) {
        return ziniSync(schema, path);
    }
    if (path.endsWith('.jsonc')) {
        return zjsoncSync(schema, path);
    }
    const text = readFileSync(path, 'utf8');
    return zconfFromString(schema, text);
}