import { createSelector } from "@reduxjs/toolkit";

export const getDancesState = state => state.schoolDance || {};
export const getDances = state => getDancesState(state).dances || [];