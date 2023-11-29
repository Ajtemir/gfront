'use client'

import React from "react";
import Navbar from "@/components/navbar/navbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

export const MainLayout = ({children}: { children?: React.ReactNode}) => {
  return (
    <>
      <Navbar/>

      <Box sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 2,
      }}
      >
        {children}
      </Box>
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}