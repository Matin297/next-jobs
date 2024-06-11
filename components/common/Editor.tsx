import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Editor as DraftEditor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      {...props}
    />
  );
});
