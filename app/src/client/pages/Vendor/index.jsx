import React, { useState, useCallback, useMemo } from "react";

const Vendor = ({ data, handleHover }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { name, branches, fooditems, drinks } = data;

  const formatFoodItems = useCallback((items) => {
    if (isExpanded) {
      return items.join(", ");
    }
    const summary = items.join(", ").substr(0, 80);
    if (summary.length > 70) {
      const indexOfLastSpace = summary.split("").reverse().join("").indexOf(",") + 1;
      return summary.substr(0, 80 - indexOfLastSpace) + " & more...";
    }
    return summary;
  }, [isExpanded]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  }, []);

  const servesDrinks = useMemo(() => (
    <div className="row">
      <div className="icons">
        <i className="ion-wineglass"></i>
      </div>
      <div className="content">Serves Cold Drinks</div>
    </div>
  ), []);

  return (
    <li
      onMouseEnter={() => handleHover(name)}
      onClick={toggleExpand}
    >
      <p className="truck-name">{name}</p>
      <div className="row">
        <div className="icons">
          <i className="ion-android-pin"></i>
        </div>
        <div className="content">{branches.length} locations</div>
      </div>
      {drinks && servesDrinks}
      <div className="row">
        <div className="icons">
          <i className="ion-fork"></i> <i className="ion-spoon"></i>
        </div>
        <div className="content">
          Serves {formatFoodItems(fooditems)}
        </div>
      </div>
    </li>
  );
};

export default Vendor;
