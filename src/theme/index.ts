import { extendTheme } from '@chakra-ui/react';

import styles from './styles';

import Link from './components/link';

const overrides = {
  ...styles,
  components: {
    Link,
  },
};

export default extendTheme(overrides);
