'use client'

import toast, {ToastBar, Toaster} from "react-hot-toast";
import React from "react";
import {Icon} from "@mui/material";

export const ToasterAdapter = () => {
  return (
      <Toaster>
          {(t) => (
              <ToastBar toast={t}>
                  {({ icon, message }) => (
                      <>
                          {icon}
                          {message}
                          {t.type === 'error' && (
                              <button onClick={() => toast.dismiss(t.id)}>X</button>
                          )}
                      </>
                  )}
              </ToastBar>
          )}
      </Toaster>
  )
}