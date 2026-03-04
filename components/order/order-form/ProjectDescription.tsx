import { Dispatch, SetStateAction } from "react";
import { inputClasses } from "./styles";

type ProjectDescriptionProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export default function ProjectDescription({
  description,
  setDescription,
}: ProjectDescriptionProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
        Project Description
      </h3>

      <textarea
        rows={6}
        required
        placeholder="Describe your project..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={inputClasses}
      />
    </section>
  );
}