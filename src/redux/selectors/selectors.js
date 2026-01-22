import { ExternalLinkIcon } from "@chakra-ui/icons";
import { createSelector } from "@reduxjs/toolkit";

export const getSchoolState = state => state.schoolDance || {};
export const getDances = state => getSchoolState(state).dances || [];

export const getTrainerByDances = state => getSchoolState(state).trainers || []

export const getShedulesByTrainer = state=>getSchoolState(state).schedule || []
