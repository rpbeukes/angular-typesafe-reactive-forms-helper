// // import { AssertTrue, AssertFalse, IsExact, Has } from 'conditional-type-checks';
// import { OmitRu } from '../angularTypesafeReactiveFormsHelper';

// move this to ../angularTypesafeReactiveFormsHelper.ts
// export type OmitRu<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// // $ExpectType Pick<{ a: "1"; b: "2"; c: "3"; }, "c">
// type Test_01_Omit = OmitRu<{ a: '1'; b: '2'; c: '3' }, 'a' | 'b'>;

// // export type Test_02_Omit =
// //   | AssertTrue<IsExact<Test_01_Omit, { c: '2' }>>
// //   | AssertFalse<Has<Test_01_Omit, { a: '1'; b: '2' }>>;
