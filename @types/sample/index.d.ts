// types/sample/index.d.ts

declare module "sample" {
  // 1. 타입(인터페이스) 선언
  interface ISample {
    camelCase(str?: string): string;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const $iSample: ISample;

  // 3. 내보내기(CommonJS)
  export = $iSample;
}
