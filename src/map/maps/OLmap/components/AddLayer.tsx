import { useEffect, useContext } from "react";
import AddWMTSLayer from "./AddWMTSLayer";
import AddHLSLayer from "./AddHLSLayer";
import MapContext from "../../../context/MapContext";

const AddLayer = ({ layer }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
  });

  return (
    <>
      <AddWMTSLayer layer={layer} />
      <AddHLSLayer layer={layer} />
    </>
  );
};

export default AddLayer;
