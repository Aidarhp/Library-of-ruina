import React, { useContext } from "react";
import { CustomContext } from "../../utils/context";

const SideBarItem = ({ text, value }) => {
  const { changeGenre, setCurrentPage,checkboxes } = useContext(CustomContext);
  return (
    <form>
      <label className="sidebarItem" onClick={() => setCurrentPage(1)}>
        <input
          className="check"
          onChange={() => changeGenre(value)}
          checked={!!checkboxes[value]}
          type="checkbox"
        />
        <span></span>
        <p>{text}</p>
      </label>
    </form>
  );
};

export default SideBarItem;