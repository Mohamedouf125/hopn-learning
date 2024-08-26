import { useState } from "react";

function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempTextArea);

    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return { copyToClipboard, isCopied };
}

export default useCopyToClipboard;
