# ZCONF

ZCONF is a TypeScript library for validating and parsing configuration files. It
is based on the popular Zod library, which provides a simple and intuitive API
for defining and validating data schemas.

## Installation

To install ZCONF, use npm:

```bash
npm install @d6v/zconf
```

## Usage

To use ZCONF, first define a schema for your configuration file using the Zod
API. Then, use the parse function provided by ZCONF to parse and validate your
configuration file.

Here's an example:

```ts
import { z } from "zod";
import { zconf } from "@d6v/zconf";

const schema = z.object({
  port: z.number().min(0).max(65535),
  host: z.string().optional(),
  debug: z.boolean().optional(),
});

const validatedEnv = zconf(schema, "./config.json");
```

# 

In this example, we define a schema for a configuration file that has three
properties: `port`, `host`, and `debug`. The `port` property is required and
must be a number between 0 and 65535. The `host` and `debug` properties are
optional and can be either a string or a boolean, respectively.

## API

ZCONF provides the following API:

```ts
zconf(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Detects, parses and validates a configuration file using the given Zod schema.
Returns an object with the parsed values if the object is valid, or throws an
error with a detailed error message if the object is invalid.

```ts
zjson(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates a JSON file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zyaml(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates a YAML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
ztoml(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates a TOML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zjsonc(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates a JSONC file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zxml(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates an XML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zini(schema: z.ZodSchema, path: string): Promise<z.infer<z.ZodSchema>>
```

Parses and validates an INI file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zconfFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Detects, parses and validates a string using the given Zod schema. Returns an
object with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zjsonFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates a JSON string using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zyamlFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates a YAML string using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
ztomlFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates a TOML string using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zjsoncFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates a JSONC string using the given Zod schema. Returns an
object with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zxmlFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates an XML string using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
ziniFromString(schema: z.ZodSchema, data: string): z.infer<z.ZodSchema>
```

Parses and validates an INI string using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zconfSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Detects, parses and validates a configuration file using the given Zod schema.
Returns an object with the parsed values if the object is valid, or throws an
error with a detailed error message if the object is invalid.

```ts
zjsonSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Parses and validates a JSON file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zyamlSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Parses and validates a YAML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
ztomlSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Parses and validates a TOML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zjsoncSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Parses and validates a JSONC file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
zxmlSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

Parses and validates an XML file using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

```ts
ziniSync(schema: z.ZodSchema, path: string): z.infer<z.ZodSchema>
```

## License

ZCONF is licensed under the MIT License. See the LICENSE file for more
information.
