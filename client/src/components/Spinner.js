import React from "react";
import { Spin } from "antd";

function Spinner() {
  return (
    <div className="spinner">
      <Spin color='blue' style={{color:'blue'}} size='large'/>
    </div>
  );
}

export default Spinner;
