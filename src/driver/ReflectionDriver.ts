import { Reflection } from "../domain/Reflection.ts";
import { supabase } from "../lib/SuperbaseClient.ts";

export class ReflectionDriver {
  constructor(private table: string) {}
  async getAll(): Promise<Reflection[]> {
    const { data, error } = await supabase.from(this.table).select();
    if (error)
      throw new Error(
        `supabaseからのデータ取得に失敗しました: ${error.message}`
      );
    return data as Reflection[];
  }
}
