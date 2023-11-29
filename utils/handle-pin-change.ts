import React from "react";

const pinMaxLength = 14;

export function handlePinChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  handleChange: (event: React.ChangeEvent<any>) => void
) {
  let pin = event.target.value
  
  if (pin.length > pinMaxLength) {
    return
  }
  
  pin = pin.replace(/\D*/g, '')
  event.target.value = pin
  
  handleChange(event)
}