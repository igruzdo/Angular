import { CustomFilterPipe } from './custom-filter.pipe';

describe('CustomFilterPipe', () => {
  let pipe!: CustomFilterPipe | null;
  beforeEach(() => {
    pipe = new CustomFilterPipe();
  });

  it('create an instance', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe).toBeTruthy();
  });
  it('suld return all > 9', () => {
    expect(pipe?.transform([1,2,3,5,10,11,456], (item) => {return item > 9})).toEqual([10,11,456]);
  });

  it('suld return abcd', () => {
    expect(pipe?.transform(['asa', 'asde', 'abcd'], (item) => {return item == 'abcd'})).toEqual(['abcd']);
  });

  afterEach(() => {
    pipe = null
  })
});
