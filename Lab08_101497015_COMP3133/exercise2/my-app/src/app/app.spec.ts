import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Tour of Heroes heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tour of Heroes');
  });

  it('should show selected hero details after choosing a hero', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstHeroButton = compiled.querySelector('.hero-button') as HTMLButtonElement;

    firstHeroButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('.details-panel h2')?.textContent).toContain('DR NICE');
  });

  it('should render dashed hero names with spaces in the list', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const heroNames = Array.from(compiled.querySelectorAll('.hero-name')).map((item) =>
      item.textContent?.trim()
    );

    expect(heroNames).toContain('Night Hawk');
    expect(heroNames).toContain('Fire Blade');
    expect(heroNames).not.toContain('Night-Hawk');
  });
});
