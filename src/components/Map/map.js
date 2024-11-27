import { YMaps, Map } from "@pbe/react-yandex-maps";
import React from "react";

const Mapp = () => {
  return (
    <YMaps>
      <div>
        <Map
          defaultState={{ center: [42.81708, 73.848], zoom: 14 }}
          style={{ minWidth: "100px", width: "400px", height: "250px",filter:'drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.15))' }}
        />
      </div>
    </YMaps>
  );
};

export default Mapp;
