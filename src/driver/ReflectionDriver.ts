import { Reflection } from "../domain/Reflection.ts";
import { supabase } from "../lib/SuperbaseClient.ts";

export class ReflectionDriver {
  async getAll(): Promise<Reflection[]> {
    const { data, error } = await supabase.from("reflection").select();
    if (error)
      throw new Error(
        `supabaseからのデータ取得に失敗しました: ${error.message}`
      );
    return data as Reflection[];
  }
}
