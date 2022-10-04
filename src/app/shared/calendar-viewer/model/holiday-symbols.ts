export interface HolidaySymbolConf {
  symbolSrc: string;
  description: string;
}

export const HOLIDAY_SYMBOLS: HolidaySymbolConf[] = [
  {
    symbolSrc: '/assets/backgrounds/great_holyday.svg',
    description: 'Великие	Бденные'
  },
  {
    symbolSrc: '/assets/backgrounds/middle_bdennie.svg',
    description: 'Средние	Бденные'
  },
  {
    symbolSrc: '/assets/backgrounds/middle_polyieleiniye.svg',
    description: 'Средние Полиелейные'
  },
  {
    symbolSrc: '/assets/backgrounds/small_slavoslovnie.svg',
    description: 'Малые	Славословные'
  },
  {
    symbolSrc: '/assets/backgrounds/small_shesterichnie.svg',
    description: 'Малые	Шестеричные'
  }
];