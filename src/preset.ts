import _ from 'lodash'
// @ts-ignore
import Aura from 'primevue/themes/primeone/aura'
// @ts-ignore
import { definePreset } from 'primevue/themes'
// @ts-ignore
import button from 'primevue/themes/primeone/presets/aura/button'

_.merge(button, {
  colorScheme: {
    light: {
      root: {
        secondary: {
          background: '{surface.200}',
          hoverBackground: '{surface.300}',
          activeBackground: '{surface.400}',
          borderColor: '{surface.200}',
          hoverBorderColor: '{surface.300}',
          activeBorderColor: '{surface.400}',
          color: '{surface.600}',
          hoverColor: '{surface.700}',
          activeColor: '{surface.800}'
        }
      }
    }
  }
})

export const preset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      }
    }
  },
  components: {
    button,
    scrollpanel: {
      colorScheme: {
        light: {
          bar: {
            background: '{surface.300}'
          }
        },
        dark: {
          bar: {
            background: '{surface.700}'
          }
        }
      }
    }
  }
})
