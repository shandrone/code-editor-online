import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
//importing themes that i will use for the editors
//also inmporting styling for JS, css, xml/html so that syntax highlight look proper
import { Controlled as ControlledEditor } from "react-codemirror2"; //imporint text editor
//with this ^ we can control our input output

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

export default function Editor(props) {
  const { language, displayName, value, onChange } = props; //passing all of this as props

  const [open, setOpen] = useState(true);

  //this function will get the editor,the data and the value
  function handleChange(editor, data, value) {
    onChange(value);
  }
  let openState = "Open";
  let closeState = "Close";
  let state = "";

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      {" "}
      {/* for one full containter (xml or JS or css) */}
      <div className="editor-title">
        {" "}
        {/**this is for top part of the container where it will display HTML/JS/CSS */}
        {displayName}
        <button
          type="button"
          className="expand-coll-button"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faWindowMinimize : faWindowMaximize} />
        </button>{" "}
        {/**open/close button */}
      </div>
      {/** this options below are from code mirror, I can add/remove any options as necessary */}
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "",
        }}
      />
      <div>
        <state />
      </div>
    </div>
  );
}
