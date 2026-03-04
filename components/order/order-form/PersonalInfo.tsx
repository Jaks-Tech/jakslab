"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { inputClasses, labelClasses } from "./styles";

type PersonalInfoProps = {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  platform: string;
  setPlatform: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
};

export default function PersonalInfo({
  fullName,
  setFullName,
  email,
  setEmail,
  platform,
  setPlatform,
  phone,
  setPhone,
}: PersonalInfoProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-2">
        Personal Information
      </h3>

      <div className="space-y-6">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className={inputClasses}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Contact Method */}
        <div>
          <label className={labelClasses}>Contact Method</label>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Platform */}
            <div className="relative w-full sm:w-1/3">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={`${inputClasses} appearance-none`}
              >
                <option className="bg-slate-900">WhatsApp</option>
                <option className="bg-slate-900">Telegram</option>
                <option className="bg-slate-900">Signal</option>
                <option className="bg-slate-900">WeChat</option>
              </select>

              <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Phone Input */}
            <div className="flex-1">
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={(value) => setPhone(value)}
                enableSearch
                enableAreaCodes
                countryCodeEditable={false}

                containerClass="!w-full"
                inputClass="!w-full !bg-white/5 !text-white !border !border-white/10 !rounded-xl !h-[48px] !pl-14 focus:!border-blue-500/50"
                buttonClass="!bg-transparent !border-white/10 !rounded-l-xl hover:!bg-white/10"
                dropdownClass="!bg-slate-800 !text-white"
                searchClass="!bg-slate-700 !text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}