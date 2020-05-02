import React from "react";
import cx from "classnames";

export default function TodoItem({ onToggle, title, completed }) {
  return (
    <li className={cx("TodoItem", completed && "TodoItem--completed")}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        <span>{title}</span>
      </label>
    </li>
  );
}
