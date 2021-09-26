import React from "react";
import "./styles.scss";

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;

  return (
    <div className="loading-container">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
