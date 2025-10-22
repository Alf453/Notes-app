import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded-xl p-4 bg-gradient-to-br from-[#f9fbfd] via-[#eef3fc] to-[#fdfdfd] hover:shadow-lg hover:scale-[1.02] transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-semibold text-slate-700">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`cursor-pointer text-lg ${
            isPinned ? "text-blue-500" : "text-slate-300"
          } hover:text-blue-400 transition-colors`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-slate-600 mt-3 leading-snug">
        {content?.slice(0, 80)}
      </p>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-slate-500 truncate">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="cursor-pointer text-slate-500 hover:text-green-600 transition-colors"
            onClick={onEdit}
          />
          <MdDelete
            className="cursor-pointer text-slate-500 hover:text-red-500 transition-colors"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
