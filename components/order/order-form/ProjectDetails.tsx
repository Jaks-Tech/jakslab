"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { inputClasses, labelClasses } from "./styles";

type ProjectDetailsProps = {
  projectType: string;
  setProjectType: Dispatch<SetStateAction<string>>;
  customProject: string;
  setCustomProject: Dispatch<SetStateAction<string>>;
  deadline: string;
  setDeadline: Dispatch<SetStateAction<string>>;
};

export default function ProjectDetails({
  projectType,
  setProjectType,
  customProject,
  setCustomProject,
  deadline,
  setDeadline,
}: ProjectDetailsProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
        Project Details
      </h3>

      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className={labelClasses}>Project Type</label>

          <div className="relative">
            <select
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="" className="bg-slate-900 text-white">
                Select Type
              </option>

              {/* Academic Writing */}
              <option className="bg-slate-900 text-white">
                Essay Writing
              </option>
              <option className="bg-slate-900 text-white">
                Research Paper
              </option>
              <option className="bg-slate-900 text-white">
                Literature Review
              </option>
              <option className="bg-slate-900 text-white">
                Thesis Writing
              </option>
              <option className="bg-slate-900 text-white">
                Dissertation
              </option>
              <option className="bg-slate-900 text-white">
                Case Study
              </option>
              <option className="bg-slate-900 text-white">
                Term Paper
              </option>
              <option className="bg-slate-900 text-white">
                Report Writing
              </option>

              {/* Technical / Development */}
              <option className="bg-slate-900 text-white">
                Web Development
              </option>
              <option className="bg-slate-900 text-white">
                Mobile App Development
              </option>
              <option className="bg-slate-900 text-white">
                Machine Learning Project
              </option>
              <option className="bg-slate-900 text-white">
                Data Science Project
              </option>
              <option className="bg-slate-900 text-white">
                AI / Deep Learning
              </option>
              <option className="bg-slate-900 text-white">
                Software Engineering
              </option>
              <option className="bg-slate-900 text-white">
                Database Design
              </option>
              <option className="bg-slate-900 text-white">
                API Development
              </option>

              {/* Custom */}
              <option className="bg-slate-900 text-white">
                Custom Project
              </option>
            </select>

            <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Custom Project Field */}
        {projectType === "Custom Project" && (
          <input
            placeholder="Describe your custom project"
            value={customProject}
            onChange={(e) => setCustomProject(e.target.value)}
            className={inputClasses}
          />
        )}

        {/* Deadline */}
        <div>
          <label className={labelClasses}>Project Deadline</label>

          <input
            type="date"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
    </section>
  );
}