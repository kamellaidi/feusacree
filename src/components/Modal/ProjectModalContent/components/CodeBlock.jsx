const CodeBlock = ({ snippet, language }) => (
  <div className="code-block-wrapper">
    {language && (
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
      </div>
    )}
    <pre className="code-block">
      <code>{snippet}</code>
    </pre>
  </div>
);

export default CodeBlock;
