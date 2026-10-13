import { type Item } from "jsr:@shougo/ddc-vim@~7.0.0/types";
import { BaseSource } from "jsr:@shougo/ddc-vim@~7.0.0/source";

type Params = {
  jsonPath: string;
};

export class Source extends BaseSource<Params> {
  override async gather(args: { sourceParams: Params }): Promise<Item[]> {

    const jsonPath = args.sourceParams.jsonPath;
    if (!jsonPath) {
      console.log("[comp_alter] jsonPath is empty");
      return [];
    }

    try {
      const text = await Deno.readTextFile(jsonPath);
      const rawData = JSON.parse(text);

      if (!Array.isArray(rawData)) {
        return [];
      }

      return rawData.map((item: Record<string, unknown>) => ({
        word: String(item.word ?? ""),
        abbr: item.abbr ? String(item.abbr) : undefined,
        menu: item.menu ? String(item.menu) : undefined,
      })).filter((item) => item.word.length > 0);


    } catch (e) {
      console.error(`[comp_alter] Error: ${e}`);
      return [];
    }
  }

  override params(): Params {
    return { jsonPath: "" };
  }
}