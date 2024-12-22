import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const csvLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Comment: t.lineComment,
        Pattern: t.literal,
        Number: t.number,
        Boolean: t.bool,
        Separator: t.separator,
      }),
    ],
  }),
});

export function csv() {
  return new LanguageSupport(csvLanguage);
}
