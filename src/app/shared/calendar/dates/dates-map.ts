export const dateMapM: { [key: string]: Map<number, string | string[]> | Set<string> } = {
  "twelfth": new Set(['09.11', '09.21', '.09.27', '10.09', '10.14', '12.04', '01.07', '01.14', '01.19', '02.15', '04.07', '05.21', '07.07', '07.13', '07.12', '08.19', '08.28']),
  "easter": new Map<number, string>(
    [
      [2020, '04.19.2020'],
      [2021, '05.02.2021'],
      [2022, '04.24.2022'],
      [2023, '04.16.2023'],
      [2024, '05.05.2024'],
      [2025, '04.20.2025'],
      [2026, '04.12.2026'],
      [2027, '05.02.2027'],
      [2028, '04.16.2028'],
      [2029, '04.08.2029'],
      [2030, '04.28.2030'],
      [2031, '04.13.2031']
    ]
  ),
  "daysOfLent": new Map(
    [
      [2020, ['03.02.2020', '04.18.2020']],
      [2021, ['03.15.2021', '05.01.2021']],
      [2022, ['03.07.2022', '04.23.2022']],
      [2023, ['02.27.2023', '04.15.2023']],
      [2024, ['03.18.2024', '05.04.2024']],
      [2025, ['03.03.2025', '04.19.2025']],
      [2026, ['02.23.2026', '04.11.2026']],
      [2027, ['03.15.2027', '05.01.2027']],
      [2028, ['02.28.2028', '04.15.2028']],
      [2029, ['02.19.2029', '04.07.2029']],
      [2030, ['03.11.2030', '04.27.2030']],
      [2031, ['02.24.2031', '04.12.2031']],
    ]
  ),
  "sergiy": new Set(['10.08', '07.18'])
};
