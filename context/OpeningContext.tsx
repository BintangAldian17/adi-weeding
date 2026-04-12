"use client";
import { createContext, useContext } from "react";

export const OpenContext = createContext(false);
export const useIsOpen = () => useContext(OpenContext);
