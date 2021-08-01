import React, { memo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Markdown from "react-markdown";

const useStyles = makeStyles({
  wrapper: {
    padding: "10px 20px",
    maxWidth: "1200px",
    textAlign: "left",
    display: "block",
    margin: "0 auto",
    left: 0,
    right: 0,
  },
});

const MD = () => {
  const classes = useStyles();

  const [readme, setReadme] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then((response) => response.text())
      .then((text) => {
        setReadme(text);
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Markdown>{readme}</Markdown>
    </div>
  );
};

export default memo(MD);
