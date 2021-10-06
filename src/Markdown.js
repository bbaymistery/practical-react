import React from "react";
import { useState } from "react";

const MarkDown = () => {
  const [value, setValue] = useState("#Write here and delete from here");
  return (
    <section className="markdown">
      <textarea
        className="input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        #MarkDown preview
      </textarea>

      <textarea className="result" value={value}></textarea>
    </section>
  );
};

export default MarkDown;
