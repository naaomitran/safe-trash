import React from 'react';

import { Grommet, Box, Meter, Stack, Text, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

export const MeterComp = () => {
  const meterValue = 10;

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" background='#9FE2BF'>
        <Stack anchor="center">
          <Meter
            type="circle"
            background="light-2"
            values={[{ value: meterValue, color: '#205072'}]}
            size="medium"
            thickness="large"
          />
          <Box direction="row" align="center" pad={{ bottom: 'xsmall' }} >
            <Heading size="xlarge" weight="bold">
              {meterValue}
            </Heading>
            <Heading size="large">%</Heading>
          </Box>
        </Stack>
      </Box>
    </Grommet>
  );
};

export default MeterComp;