import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};

export const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1024px',
    xl: '1201px',
  },
  semanticTokens: {
    colors: {
      primary: 'pink.400',
      hprimary: 'pink.300',
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.50',
      },
    }),
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});
