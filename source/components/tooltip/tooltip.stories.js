import React from 'react';

import Tooltip from './tooltip-component';

import Button from '../button';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const Normal = () => (
  <div style={{ paddingLeft: '20%' }}>
    <Tooltip message="Tooltip" />
    <br />
    <br />
    <Tooltip message="Tooltip" position="bottom">
      Bottom
    </Tooltip>
    <br />
    <br />
    <Tooltip
      position="bottom"
      width="450px"
      message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    />
    <br />
    <br />
    <Tooltip message="Tooltip" icon="remove_red_eye" size={40} position="left" />
    <br />
    <br />
    <Tooltip message="Tooltip" position="right">
      <Button>Info</Button>
    </Tooltip>
  </div>
);
