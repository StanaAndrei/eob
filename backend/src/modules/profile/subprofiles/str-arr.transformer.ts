export class StringArrayTransformer {
  to(databaseValue: string[]): string {
    return JSON.stringify(databaseValue);
  }

  from(value: string): string[] {
    return JSON.parse(value);
  }
}
