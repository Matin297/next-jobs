import { cn } from "@/lib/utils";
import ReactMarkdown, { Components } from "react-markdown";

interface MarkdownProps {
  children: string;
  components?: Components;
}

export default function Markdown({ children, components }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        ...components,
        ul: (props) => (
          <ul
            {...props}
            className={cn("list-inside list-disc", props.className)}
          />
        ),
        a: (props) => (
          <a
            target="_blank"
            {...props}
            className={cn(
              "text-pink-400 underline hover:text-pink-600",
              props.className,
            )}
          />
        ),
        h1: (props) => (
          <h1
            {...props}
            className={cn("text-[24px] font-semibold", props.className)}
          />
        ),
        h2: (props) => (
          <h2
            {...props}
            className={cn("text-[20px] font-semibold", props.className)}
          />
        ),
        h3: (props) => (
          <h3
            {...props}
            className={cn("text-[18px] font-semibold", props.className)}
          />
        ),
        h4: (props) => (
          <h4
            {...props}
            className={cn("text-[16px] font-semibold", props.className)}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
