import _ from 'lodash'
// @ts-ignore
import PrimeOne from 'primevue/themes/primeone'
// @ts-ignore
import Aura from 'primevue/themes/primeone/aura'
// @ts-ignore
import { definePreset } from 'primevue/themes'
// @ts-ignore
import button from 'primevue/themes/primeone/presets/aura/button'
// @ts-ignore
import toast from 'primevue/themes/primeone/presets/aura/toast'
// @ts-ignore
// import aura from 'primevue/themes/primeone/presets/aura'
import type { PrimeVueConfiguration } from 'primevue/config'

const newButton = _.merge({}, button, {
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
      },
      text: {
        secondary: {
          hoverBackground: '{surface.200}',
          activeBackground: '{surface.300}',
          color: '{surface.700}'
        },
        plain: {
          hoverBackground: '{surface.200}',
          activeBackground: '{surface.300}',
          color: '{surface.700}'
        }
      }
    },
    dark: {
      text: {
        primary: {
          hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 85%)',
          activeBackground: 'color-mix(in srgb, {primary.color}, transparent 70%)',
          color: '{primary.color}'
        }
      }
    }
  }
})

const newToast = _.merge({}, toast, {
  colorScheme: {
    dark: {
      blur: '1.5px',
      info: {
        background: 'color-mix(in srgb, {blue.950}, transparent 5%)',
        color: '{blue.400}'
      },
      success: {
        background: 'color-mix(in srgb, {green.950}, transparent 5%)',
        color: '{green.400}'
      },
      warn: {
        background: 'color-mix(in srgb, {yellow.950}, transparent 5%)',
        color: '{yellow.400}'
      },
      error: {
        background: 'color-mix(in srgb, {red.950}, transparent 5%)',
        color: '{red.400}'
      },
      secondary: {
        background: '{surface.800}',
        color: '{surface.300}'
      },
      contrast: {
        background: '{surface.0}',
        color: '{surface.950}'
      }
    }
  }
})

const preset = definePreset(Aura, {
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
        },
        maskBackground: 'rgba(0,0,0,0.8)',
        formField: {
          background: 'transparent',
          disabledBackground: '{surface.200}',
          filledBackground: '{surface.50}',
          filledFocusBackground: '{surface.0}',
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.400}',
          color: '{surface.700}',
          disabledColor: '{surface.500}',
          placeholderColor: '{surface.500}',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{surface.500}',
          floatLabelInvalidColor: '{red.400}',
          boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)'
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
        },
        maskBackground: 'rgba(0,0,0,0.9)',
        formField: {
          background: 'transparent',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledFocusBackground: '{surface.950}',
          borderColor: '{surface.700}',
          hoverBorderColor: '{surface.600}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.300}',
          color: '{surface.0}',
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{surface.400}',
          floatLabelInvalidColor: '{red.300}',
          boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)'
        }
      }
    }
  },
  components: {
    button: newButton,
    dialog: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: 'hsl(var(--foreground));'
          },
          headerIcon: {
            color: '{surface.500}',
            hoverColor: '{surface.600}',
            hoverBackground: '{surface.200}'
          }
        },
        dark: {
          root: {
            background: '#000000',
            borderColor: '{surface.700}',
            color: 'hsl(var(--foreground));'
          },
          headerIcon: {
            color: '{surface.400}',
            hoverColor: '{surface.300}',
            hoverBackground: '{surface.800}'
          }
        }
      }
    },
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
    },
    toast: newToast
  }
})

export const primeVueConfig: PrimeVueConfiguration = {
  theme: {
    base: PrimeOne,
    preset: preset,
    options: {
      darkModeSelector: 'html.dark'
    }
  }
}
