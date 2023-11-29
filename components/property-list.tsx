import { ReactNode } from "react";
import { List } from "@mui/material";
import PropTypes from 'prop-types';


export const PropertyList = ({children}: {children: ReactNode}) => (
  <List disablePadding>
    {children}
  </List>
)

PropertyList.propTypes = {
  children: PropTypes.node
};
