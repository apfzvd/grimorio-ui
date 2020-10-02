import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import DatePicker from './date-picker-component';

const stories = storiesOf('DatePicker', module);

const action = name => (...params) => {
  console.log(name, params);
};

stories.add('Normal', () => {
  return (
    <div>
      <DatePicker
        isRangeDate
        onChange={action('onChange: dates object')}
        isOutsideRange={() => false}
      />
    </div>
  );
});

stories.add('Single Date', () => {
  return (
    <div>
      <DatePicker
        monthsToShow={1}
        onChange={action('onChange: dates object')}
      />
    </div>
  );
});

stories.add('Mobile', () => {
  return (
    <div>
      <DatePicker
        isRangeDate
        isMobile
        onChange={action('onChange: dates object')}
      />
    </div>
  );
});


stories.add('Default Values', () => {
  return (
    <div>
      <DatePicker
        isRangeDate
        defaultStartDate={moment().subtract(7, 'days')}
        defaultEndDate={moment()}
        onChange={action('onChange: dates object')}
      />

      <br/>
      <br/>

      <DatePicker
        defaultSingleDate={moment().subtract(7, 'days')}
        monthsToShow={1}
        initialMonth={moment()}
        onChange={action('onChange: dates object')}
      />
    </div>
  );
});

stories.add('Align', () => {
  return (
    <div>
      <DatePicker
        isRangeDate
        align="left"
        label="Align Calendar Left"
        onChange={action('onChange: dates object')}
      />

      <br/>
      <br/>

      <DatePicker
        isRangeDate
        align="right"
        label="Align Calendar Right"
        onChange={action('onChange: dates object')}
      />
    </div>
  );
});
