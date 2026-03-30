import { RemoveSpacesPipe } from './remove-spaces-pipe';

describe('RemoveSpacesPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveSpacesPipe();
    expect(pipe).toBeTruthy();
  });

  it('replaces all dashes with spaces', () => {
    const pipe = new RemoveSpacesPipe();

    expect(pipe.transform('Night-Hawk')).toBe('Night Hawk');
    expect(pipe.transform('Sky-Fire-Rider')).toBe('Sky Fire Rider');
  });

  it('returns an empty string for nullish or empty values', () => {
    const pipe = new RemoveSpacesPipe();

    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('leaves names without dashes unchanged', () => {
    const pipe = new RemoveSpacesPipe();

    expect(pipe.transform('Bombasto')).toBe('Bombasto');
  });
});
