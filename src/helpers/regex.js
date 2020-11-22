export default {
  signs: /^[a-zA-Z-+=[\]{}()\s\r\n]+$/,
  newLine: /(((?<=\n)|^|-)[a-z])/,
  notBrackets: /[^()[\]{}]+/g,
  color: /^#(?:[0-9a-fA-F]{3}){1,2}$/i,
  hexToRGB: /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
  twoSignsGroup: /.{2}/g,
  whiteSpace: /[\r\n\t\f\v\s]/gm,
};
