import { TestBed, async } from '@angular/core/testing';
import { TestFormComponent } from './testform.component';
describe('TestFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'test-package-with-ng6'`, async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('test-package-with-ng6');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to test-package-with-ng6!');
  }));
});
