import { Project } from "ts-morph";
import * as path from "path";
import { EventEmitter } from "events";

const listener = new EventEmitter();

listener.on("테스트 코드 1", () => {
  const getPath = (filename: string) =>
    path.resolve(__dirname, "__test__", filename);

  const project = new Project({ tsConfigFilePath: "./tsconfig.json" });

  function extractFunctionJsDoc() {
    const sourceFile = project.getSourceFileOrThrow(
      getPath("functional.spec.ts")
    );
    const functionSymbol = sourceFile.getFunctionOrThrow("test1");

    const comment = functionSymbol.getJsDocs()[0].getComment();

    console.log(comment);
  }

  function extractClassJsDoc() {
    const sourceFile = project.getSourceFileOrThrow(getPath("classes.spec.ts"));
    const classSymbol = sourceFile.getClassOrThrow("App");

    const methods = classSymbol.getMethods();

    const jsdoc = methods[0].getJsDocs()[0];

    const comment = jsdoc.getComment();

    console.log(comment);

    jsdoc.getTags().forEach((tag) => {
      console.log("%s %s", tag.getTagName(), tag.getComment());
    });
  }

  listener.on("함수 위 코멘트 추출", () => extractFunctionJsDoc());
  listener.on("클래스 메소드 위 코멘트 추출", () => extractClassJsDoc());
});

listener.emit("테스트 코드 1");
listener.emit("함수 위 코멘트 추출");
listener.emit("클래스 메소드 위 코멘트 추출");
