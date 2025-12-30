"use client";

import Editor from "@/app/ui/editor";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef } from "react";

export default function EditPageMDX(props: {
  markdown: string;
  onTextChange?: (value: string) => void;
}) {
  const { markdown, onTextChange } = props;
  const [text, setText] = useState(markdown);

  const isMounted = useRef(false);

  const handleTextChange = useDebouncedCallback((value: string) => {
    if (isMounted.current) {
      setText(value);
      if (onTextChange) {
        onTextChange(value);
      }
    }
  }, 300);

  return (
    <div className="p-2 border border-black dark:border-gray-300 rounded-xl w-full">
      <Editor markdown={text} onChange={handleTextChange} />
    </div>
  );
}
