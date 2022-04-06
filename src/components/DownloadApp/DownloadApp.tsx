import React from "react";
const DownloadApp = (props:any) => {
  return (
    <div className={props.classVal}>

      <a href="#">
        {" "}
        <img className="" src={"assets/icons/Download@1x.svg"} />
      </a>
      <a href="#">
        {" "}
        <img className="" src={"assets/icons/google-play-badge.svg"} />
      </a>
    </div>
  );
};

export default DownloadApp;
