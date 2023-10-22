import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Component, useRef, useEffect, useState } from 'react';

export default function MenuIntroduction(props) {
  const submitDate = (menuItem) => {
    return () => {
      setSelected(menuItem);
      console.log("HERE")
      props.dateChange(menuItem);
    };
  };

  const [selected, setSelected] = useState("Today ↓");

  return (
    <Dropdown>
      <MenuButton>{selected}</MenuButton>
      <Menu slots={{ listbox: Listbox }}>
    <MenuItem onClick={submitDate('1960')}>1960</MenuItem>
                <MenuItem onClick={submitDate('1970')}>1970</MenuItem>
                <MenuItem onClick={submitDate('1980')}>1980</MenuItem>
                <MenuItem onClick={submitDate('1990')}>1990</MenuItem>
                <MenuItem onClick={submitDate('2000')}>2000</MenuItem>
                <MenuItem onClick={submitDate('2010')}>2010</MenuItem>
                <MenuItem onClick={submitDate('2020')}>2020</MenuItem>
                <MenuItem onClick={submitDate('Today')}>Today</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  pointer-events: all;
  cursor: pointer;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  max-width: 200px;
  border-radius: 5px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  pointer-events: all;
  cursor: pointer;
  list-style: none;
  padding: 8px;
  border-radius: 5px;
  cursor: default;
  user-select: none;
  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  pointer-events: all;
  cursor: pointer;
  font-family: Helvetica;
  font-size: 0.875rem;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 2px 14px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  height: 30px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);