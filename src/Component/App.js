import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import UseLocalStorage from "../Hooks/UseLocalStorage";

function App() {
  const [html, setHtml] = UseLocalStorage("html", "");
  const [css, setCss] = UseLocalStorage("css", "");
  const [js, setJs] = UseLocalStorage("js", "");

  const [srcDoc, setSrcDoc] = useState("");

  /** to render html css js to the ifram, source doc is created and delaying it by
   * .5 second so that it doesnot render iframe immidietly and end up slowing down the
   * browser
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout); //everytime html, css,js is changed, it will creal the timeout
  }, [html, css, js]);

  return (
    /**
     * the app will be divided into two part
     * on top part, 3 section dedicated for text editors
     * bottom part for showing output, that's why creating two <div>
     */
    <>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
    </>
  );
}

export default App;
