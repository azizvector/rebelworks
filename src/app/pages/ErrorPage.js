import React, { useEffect } from "react";

export function ErrorPage({ history }) {
  useEffect(() => {
    history.push("/movies");
  });

  return <div />;
}