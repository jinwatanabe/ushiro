import { FC, useState, FormEvent } from "react";
import { technique } from "../data/technique";
import { usecase } from "../../container";
import { Reflection } from "../../domain/Reflection";

export const RegisterModal: FC = () => {
  const [submitError, setSubmitError] = useState("");
  const [infoTech, setInfoTech] = useState("");
  const [ideaTech, setIdeaTech] = useState("");
  const [reflectionTech, setReflectionTech] = useState("");
  const [link, setLink] = useState("");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!link && !infoTech && !ideaTech && !reflectionTech && !memo) {
      setSubmitError("すべての項目が未入力です");
      setIsLoading(false);
      return;
    }
    const reflection = new Reflection(
      link,
      infoTech,
      ideaTech,
      reflectionTech,
      memo
    );
    const state = await usecase.addLog(reflection);
    if (state !== 201) {
      setIsLoading(false);
      setSubmitError("登録に失敗しました");
      return;
    }
    document.getElementById("closeModal")?.click();

    setIsLoading(false);
    setSubmitError("");
    setLink("");
    setInfoTech("");
    setIdeaTech("");
    setReflectionTech("");
    setMemo("");
  };

  return (
    <div>
      <input type="checkbox" id="addLog" className="modal-toggle" />
      <label
        htmlFor="addLog"
        className="modal cursor-pointer"
        id="closeModal"
        onClick={() => {
          setSubmitError("");
        }}
      >
        <div className="modal-box relative">
          <form
            className="flex justify-center items-center flex-col"
            onSubmit={submitHandler}
          >
            <div className="form-control w-full max-w-md rounded">
              <label className="label">
                <span className="label-text">ボード</span>
              </label>
              <input
                type="text"
                value={link}
                placeholder="ボードのURL"
                className="input input-bordered w-full"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <label className="label">
                <span className="label-text">情報収集</span>
              </label>
              <select
                onChange={(e) => setInfoTech(e.target.value)}
                className="select w-full max-w-xs"
              >
                <option value="">選択してください</option>
                {technique.map((tech) => {
                  return (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  );
                })}
                ;
              </select>
              <label className="label">
                <span className="label-text">アイデア出し</span>
              </label>
              <select
                onChange={(e) => setIdeaTech(e.target.value)}
                className="select w-full max-w-xs"
              >
                <option value="">選択してください</option>
                {technique.map((tech) => {
                  return (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  );
                })}
                ;
              </select>
              <label className="label">
                <span className="label-text">ふりかえりのふりかえり</span>
              </label>
              <select
                onChange={(e) => setReflectionTech(e.target.value)}
                className="select w-full max-w-xs"
              >
                <option value="">選択してください</option>
                {technique.map((tech) => {
                  return (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  );
                })}
                ;
              </select>
              <label className="label">
                <span className="label-text">メモ</span>
              </label>
              <textarea
                value={memo}
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
                className="textarea textarea-bordered"
                placeholder="メモ"
              />
              <button
                type="submit"
                className={
                  isLoading
                    ? "btn btn-primary mt-5 loading"
                    : "btn btn-primary mt-5"
                }
              >
                作成
              </button>
            </div>
            {submitError ? (
              <p className="text-error mt-3 ">{submitError}</p>
            ) : (
              <></>
            )}
          </form>
        </div>
      </label>
    </div>
  );
};
