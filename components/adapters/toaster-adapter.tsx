'use client'

import toast, {ToastBar, Toaster} from "react-hot-toast";
import React from "react";
import {Icon} from "@mui/material";

export const ToasterAdapter = () => {
  return (
      <Toaster>
          {(t) => (
              <ToastBar toast={t}>
                  {({ icon, message }) => {
                      if(t.type === "error"){
                          t.duration = 5000000;
                      }
                      return <>
                          {icon}
                          {message}
                          {t.type === 'error' && (
                              <button onClick={() => toast.dismiss(t.id)}>X</button>
                          )}
                      </>
                  }}
              </ToastBar>
          )}
      </Toaster>
  )
}