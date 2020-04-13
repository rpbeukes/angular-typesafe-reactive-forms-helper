// tslint:disable-next-line:strict-export-declare-modifiers

// import { AssertTrue, AssertFalse, IsExact, Has } from 'conditional-type-checks';
import { OmitRu } from '../angularTypesafeReactiveFormsHelper';

// $ExpectType Pick<{ a: "1"; b: "2"; c: "3"; }, "a">
type Test_01_Omit = OmitRu<{ a: '1'; b: '2'; c: '3' }, 'a' | 'b'>;

// export type Test_02_Omit =
//   | AssertTrue<IsExact<Test_01_Omit, { c: '2' }>>
//   | AssertFalse<Has<Test_01_Omit, { a: '1'; b: '2' }>>;
