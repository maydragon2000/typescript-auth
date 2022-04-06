import React from "react";

export default function Error( children:any ) {
  return (
    <div className="error">
      <b>{children}</b>
    </div>
  );
}
