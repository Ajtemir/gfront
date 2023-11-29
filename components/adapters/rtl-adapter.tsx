'use client'

import React, { useContext } from "react";
import { SettingsContext } from "@/contexts/settings-context";
import { RTL } from "@/components/adapters/rtl";

export const RtlAdapter = ({children}: {children: React.ReactNode}) => {
  const { settings }  = useContext(SettingsContext)
  
  return (
    <RTL direction={settings.direction}>
      {children}
    </RTL>
  )
}