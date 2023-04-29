import { FC, useEffect, useState } from "react";
import { usecase } from "../../container";
import { Reflection } from "../../domain/Reflection";
import { RegisterModal } from "./RegisterModal";
import { supabase } from "../../lib/SuperbaseClient";
import { ResponseJson } from "../../driver/ReflectionDriver";

export const LogTable: FC = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  useEffect(() => {
    (async () => {
      setReflections(await usecase.getAll());
    })();
  }, []);

  const ReflectionChannel = supabase.channel("reflection");

  ReflectionChannel.on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "reflection" },
    ({ new: payloadNew }: { new: ResponseJson }) => {
      const newLog: Reflection = {
        ...payloadNew,
        createdAt: new Date(payloadNew.createdat),
        infoTech: payloadNew.infotech,
        ideaTech: payloadNew.ideatech,
        reflectionTech: payloadNew.reflectiontech,
      };
      setReflections([...reflections, newLog]);
    }
  ).subscribe();

  return (
    <div className="flex flex-col items-end mb-10">
      <label htmlFor="addLog" className="btn btn-primary w-fit my-5">
        登録
      </label>
      <RegisterModal />
      <div className="overflow-x-auto w-full">
        {reflections.length === 0 ? (
          <div>ないよ</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>実施日</th>
                <th>ボード</th>
                <th>情報取集</th>
                <th>アイデアだし</th>
                <th>ふりふり</th>
                <th>メモ</th>
              </tr>
            </thead>
            <tbody>
              {reflections.map(
                ({
                  id,
                  createdAt,
                  link,
                  infoTech,
                  ideaTech,
                  reflectionTech,
                  memo,
                }) => (
                  <tr key={id}>
                    <th>{createdAt?.toLocaleDateString()}</th>
                    <td>{link}</td>
                    <td>{infoTech}</td>
                    <td>{ideaTech}</td>
                    <td>{reflectionTech}</td>
                    <td>
                      <label htmlFor={id} className="btn">
                        🗒
                      </label>
                      <input type="checkbox" id={id} className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box">
                          <p className="py-4">{memo}</p>
                          <div className="modal-action">
                            <label htmlFor={id} className="btn">
                              CLOSE
                            </label>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
