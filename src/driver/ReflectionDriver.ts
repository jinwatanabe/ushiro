import { Reflection } from "../domain/Reflection.ts";
import { supabase } from "../lib/SuperbaseClient.ts";
// https://supabase.com/docs/reference/javascript/typescript-support#type-hints

export class ReflectionDriver {
  constructor(private table: string) {}
  async getAll(): Promise<ResponseJson[]> {
    const { data, error } = await supabase.from(this.table).select("*");
    if (error)
      throw new Error(
        `supabaseからのデータ取得に失敗しました: ${error.message}`
      );
    return data as ResponseJson[];
  }

  // 今だけany
  async addLog({
    link,
    infoTech,
    ideaTech,
    reflectionTech,
    memo,
  }: Reflection): Promise<any> {
    const response = await supabase.from(this.table).insert({
      link,
      infotech: infoTech,
      ideatech: ideaTech,
      reflectiontech: reflectionTech,
      memo,
    });
    return response;
  }
}

export type ResponseJson = {
  id: string;
  createdat: string;
  link: string;
  infotech: string;
  ideatech: string;
  reflectiontech: string;
  memo: string;
  user_id: string;
};
