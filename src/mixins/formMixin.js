import regex from '@/helpers/regex';

const formMixin = {
  data() {
    return {
      rules: {
        signs: [
          (v) => this.getValidationMessage(v) && this.getRegexValidationMessage(regex.signs, v, 'Remove invalid Sign'),
          (v) => this.getRegexValidationMessage(regex.newLine, v, 'Every line should start from capital letter', true),
          (v) => this.getValidationBrackets(v),
        ],
        color: [(v) => this.getRegexValidationMessage(regex.color, v, 'This is invalid color')],
        colorsList: [(v) => this.getValidationMessage(v), (v) => this.getValidColorsList(v)],
      },
    };
  },
  methods: {
    getValidationMessage(value) {
      return !!value || `This field is required`;
    },
    getRegexValidationMessage(regex, valueToTest, message, negative = false) {
      return negative
        ? !new RegExp(regex).test(valueToTest) || message
        : new RegExp(regex).test(valueToTest) || message;
    },
    getValidColorsList(value) {
      const colorArray = value
        .replace(regex.whiteSpace, '')
        .split(',')
        .filter((color) => color.match(regex.color));
      return !!colorArray.length || 'There is not valid color on the list ';
    },
    getValidationBrackets(value) {
      const stack = [];
      const onlyBracketString = value.replace(new RegExp(regex.notBrackets), '');
      let valid = true;
      let message = '';

      const addToStack = (char) => {
        stack.push(char);
      };

      const removeFromStack = (char, prevChar) => {
        if (stack[stack.length - 1] !== `${prevChar}`) {
          valid = false;
          message = `Close bracket ${char}`;
        } else {
          stack.pop();
        }
      };

      for (let i = 0; i < onlyBracketString.length; i++) {
        const char = onlyBracketString.charAt(i);
        switch (char) {
          case '(':
          case '[':
          case '{':
            addToStack(char);
            break;
          case ')':
            removeFromStack(char, '(');
            break;
          case ']':
            removeFromStack(char, '[');
            break;
          case '}':
            removeFromStack(char, '{');
            break;
          default:
            break;
        }
      }
      if (stack.length !== 0) {
        valid = false;
        message = `Close bracket ${stack[stack.length - 1]}`;
      }
      return valid || message;
    },
  },
};

export default formMixin;
