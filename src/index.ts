import { readFile } from "fs/promises";
import { canParseIni, zini, ziniFromString } from "parsers/ini";
import { canParseJson, zjson, zjsonFromString } from "parsers/json";
import { canParseJsonC, zjsonc, zjsoncFromString } from "parsers/jsonc";
import { canParseToml, ztoml, ztomlFromString } from "parsers/toml";
import { canParseXml, zxml, zxmlFromString } from "parsers/xml";
import { canParseYaml, zyaml, zyamlFromString } from "parsers/yaml";
import { z } from "zod";


export { z, zini, ziniFromString, zjson, zjsonFromString, zjsonc, zjsoncFromString, ztoml, ztomlFromString, zxml, zxmlFromString, zyaml, zyamlFromString };
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

