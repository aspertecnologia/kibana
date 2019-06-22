/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { CHART_FORMAT_LIMITS } from '../../../../common/constants';

const {
  FIFTEEN_DAYS,
  EIGHT_MINUTES,
  FOUR_YEARS,
  THIRTY_SIX_HOURS,
  THREE_WEEKS,
} = CHART_FORMAT_LIMITS;

/**
 * Any date range that falls between these stops will have the value applied as its label.
 * The goal is to provide a helpful label for chunks of time, i.e. if a timespan covers only 12 hours but those
 * hours are intersected by a date change, we should show the month/day along with the time. The thinking here
 * is that if there are a minimum of four or more of most units, it is safe to decrease the label's resolution.
 */
const dateStops: Array<{ key: number; value: string }> = [
  {
    key: EIGHT_MINUTES,
    value: 'HH:mm:ss',
  },
  {
    key: THIRTY_SIX_HOURS,
    value: 'HH:mm',
  },
  {
    key: FIFTEEN_DAYS,
    value: 'MM-dd HH:mm',
  },
  {
    key: THREE_WEEKS,
    value: 'MM-dd',
  },
  {
    key: FOUR_YEARS,
    value: 'yyyy-MM',
  },
];

/**
 * Returns an appropriate label format bbased on pre-defined intervals.
 * @param delta The length of the timespan in milliseconds
 */
export const getLabelFormat = (delta: number): string => {
  for (let index = 0; index < dateStops.length; index += 1) {
    const { key, value } = dateStops[index];
    if (delta < key) {
      return value;
    }
  }
  return 'yyyy';
};