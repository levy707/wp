<template>
  <v-form v-model="isFormValid">
    <v-text-field
      v-model="baseColor"
      :rules="rules['color']"
      :disabled="isDescriptionVisible"
      label="Base color"
      outlined
    ></v-text-field>
    <v-textarea
      v-model="colorList"
      :rules="rules['colorsList']"
      :disabled="isDescriptionVisible"
      label="List of colors"
      outlined
    />
    <v-btn v-if="!isDescriptionVisible" color="primary" @click="setClosestColor(baseColor)" :disabled="!isFormValid">
      Find
    </v-btn>
    <v-btn v-if="isDescriptionVisible" color="primary" @click="resetClosestColor()">Find Again</v-btn>
    <div v-if="isDescriptionVisible" class="d-flex align-center justify-center my-5">
      The closest color to the base color {{ baseColor }}
      <span class="closest-color" :style="{ background: baseColor }"></span> is {{ closestColor.hex }}
      <span class="closest-color" :style="{ background: closestColor.hex }"></span>
    </div>
  </v-form>
</template>

<script>
import regex from '@/helpers/regex';
import formMixin from '@/mixins/formMixin';
export default {
  name: 'ColorsForm',
  mixins: [formMixin],
  data() {
    return {
      isFormValid: false,
      baseColor: '',
      colorList: '',
      closestColor: {},
    };
  },
  computed: {
    convertedColorList() {
      return this.colorList
        .replace(regex.whiteSpace, '')
        .split(',')
        .filter((color) => color.match(regex.color))
        .map((color) => {
          return {
            hex: color,
            rgb: this.getConvertedToRGB(color),
          };
        });
    },
    isDescriptionVisible() {
      return !!Object.keys(this.closestColor).length;
    },
  },
  methods: {
    getConvertedToRGB(hex) {
      //return array of numbers => [r, g, b]
      if (!new RegExp(regex.color).test(hex)) return;
      return hex
        .replace(regex.hexToRGB, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(regex.twoSignsGroup)
        .map((x) => parseInt(x, 16));
    },
    getRatioRGB(firstColor, secondColor) {
      // return ratio
      if (!Array.isArray(firstColor) || firstColor.length !== 3) return;
      if (!Array.isArray(secondColor) || secondColor.length !== 3) return;
      return Math.sqrt(
        Math.pow(firstColor[0] - secondColor[0], 2) +
          Math.pow(firstColor[1] - secondColor[1], 2) +
          Math.pow(firstColor[2] - secondColor[2], 2)
      );
    },
    getColorListWithRatio(base) {
      const baseRGB = this.getConvertedToRGB(base);
      return this.convertedColorList.map((color) => {
        return { ...color, ratio: this.getRatioRGB(baseRGB, color.rgb) };
      });
    },
    setClosestColor(base) {
      const closestColor = this.getColorListWithRatio(base).sort((a, b) => a.ratio - b.ratio);
      this.closestColor = closestColor[0];
    },
    resetClosestColor() {
      this.closestColor = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.closest-color {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border: 2px solid $Black;
  border-radius: 50%;
}
</style>
