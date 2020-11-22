//Components
import ColorsForm from '@/components/Forms/ColorsForm';

describe('ColorsForm.vue - getConvertedToRGB()', () => {
  it('Converting empty value', () => {
    expect(ColorsForm.methods.getConvertedToRGB()).toBe(undefined);
  });

  it('Converting non hex value', () => {
    expect(ColorsForm.methods.getConvertedToRGB('fff')).toBe(undefined);
  });

  it('Converting short hex - #fff', () => {
    expect(ColorsForm.methods.getConvertedToRGB('#fff')).toStrictEqual([255, 255, 255]);
  });

  it('Converting long hex - #ffffff', () => {
    expect(ColorsForm.methods.getConvertedToRGB('#ffffff')).toStrictEqual([255, 255, 255]);
  });
});

describe('ColorsForm.vue - getRatioRGB', () => {
  it('get RBG Ratio - empty value', () => {
    expect(ColorsForm.methods.getRatioRGB()).toBe(undefined);
  });

  it('get RBG Ratio - [255, 255, undefined], [250, 250, 250]', () => {
    expect(ColorsForm.methods.getRatioRGB()).toBe(undefined);
  });

  it('get RBG Ratio - [255, 255, 255], [250, 250]', () => {
    expect(ColorsForm.methods.getRatioRGB()).toBe(undefined);
  });

  it('get RBG Ratio - [255, 255, 255], [250, 250, 250]', () => {
    expect(ColorsForm.methods.getRatioRGB([255, 255, 255], [250, 250, 250])).toStrictEqual(8.660254037844387);
  });
});
