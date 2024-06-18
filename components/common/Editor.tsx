import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = dynamic(
  () => import("react-draft-wysiwyg").then((result) => result.Editor),
  {
    ssr: false,
    loading: () => (
      <p className="h-[200px] text-sm text-muted-foreground">
        Loading editor...
      </p>
    ),
  },
);

export default forwardRef<Object, EditorProps>(function Editor(
  { toolbarClassName, editorClassName, ...props },
  ref,
) {
  function setEditorRef(r: Object) {
    if (typeof ref === "function") {
      ref(r);
    } else if (ref) {
      ref.current = r;
    }
  }

  return (
    <DraftEditor
      editorRef={setEditorRef}
      toolbarClassName={cn("rounded-lg", toolbarClassName)}
      editorClassName={cn(
        "border px-2 rounded min-h-[200px] ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        editorClassName,
      )}
      toolbar={{
        options: ["inline", "list", "link", "history", "blockType"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      {...props}
    />
  );
});
