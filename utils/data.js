const voivodeships = [
  'Zachodniopomorskie',
  'Lubuskie',
  'Dolnośląskie',
  'Wielkopolskie',
  'Pomorskie',
  'Kujawsko-Pomorskie',
  'Łódzkie',
  'Opolskie',
  'Śląskie',
  'Małopolskie',
  'Podkarpackie',
  'Lubelskie',
  'Mazowieckie',
  'Warmińsko-Mazurskie',
  'Podlaskie',
  'Świętokrzyskie',
];

const divisions = [
  'Ekstraklasa',
  'I liga',
  'II liga',
  'III liga',
  'IV liga',
  'Klasa okręgowa',
  'Klasa A',
  'Klasa B',
  'Klasa C',
  'CLJ',
  'Rozgrywki juniorskie',
  'Inny/zagranica',
];

const groups = [
  'Grupa 1',
  'Grupa 2',
  'Grupa 3',
  'Grupa 4',
  'Grupa 5',
  'Grupa 6',
  'Grupa 7',
  'Grupa 8',
  'Grupa 9',
  'Grupa 10',
  'Grupa 11',
  'Grupa 12',
  'Grupa 13',
  'Grupa 14',
  'Grupa A',
  'Grupa B',
  'Grupa C',
  'Grupa D',
  'Grupa I',
  'Grupa II',
  'Grupa III',
  'Grupa IV',
  'Południe',
  'Północ',
  'Wschód',
  'Zachód',
];

const positions = [
  'GK',
  'LB',
  'RB',
  'CB',
  'CBL',
  'CBR',
  'CBM',
  'LW',
  'LWB',
  'RW',
  'RWB',
  'DM',
  'DM/CM',
  'CM',
  'CM/CAM',
  'CAM',
  'LM',
  'RM',
  'RM/LM',
  'RW/LW',
  'CAM/F',
  'F',
  'F/W',
];

const oldPositions = ['GK', 'FB', 'CB', 'CM', 'WM', 'F'];

const ratingCategories = ['individual', 'teamplay', 'offense', 'defense', 'physical', 'mental'];

const competitions = ['league', 'cup', 'friendly'];

const userRoles = ['admin', 'playmaker-scout', 'scout'];

const countryCodes = [
  'AF',
  'AL',
  'DZ',
  'AD',
  'AO',
  'AI',
  'AQ',
  'AG',
  'SA',
  'AR',
  'AM',
  'AW',
  'AU',
  'AT',
  'AZ',
  'BS',
  'BH',
  'BD',
  'BB',
  'BE',
  'BZ',
  'BJ',
  'BM',
  'BT',
  'BY',
  'BO',
  'BQ',
  'BA',
  'BW',
  'BR',
  'BN',
  'IO',
  'VG',
  'BG',
  'BF',
  'BI',
  'CL',
  'CN',
  'HR',
  'CW',
  'CY',
  'TD',
  'ME',
  'CZ',
  'UM',
  'DK',
  'CD',
  'DM',
  'DO',
  'DJ',
  'EG',
  'EC',
  'ER',
  'EE',
  'ET',
  'FK',
  'FJ',
  'PH',
  'FI',
  'FR',
  'TF',
  'GA',
  'GM',
  'GS',
  'GH',
  'GI',
  'GR',
  'GD',
  'GL',
  'GE',
  'GU',
  'GG',
  'GF',
  'GY',
  'GP',
  'GT',
  'GW',
  'GQ',
  'GN',
  'HT',
  'ES',
  'NL',
  'HN',
  'HK',
  'IN',
  'ID',
  'IQ',
  'IR',
  'IE',
  'IS',
  'IL',
  'JM',
  'JP',
  'YE',
  'JE',
  'JO',
  'KY',
  'KH',
  'CM',
  'CA',
  'QA',
  'KZ',
  'KE',
  'KG',
  'KI',
  'CO',
  'KM',
  'CG',
  'KR',
  'KP',
  'CR',
  'CU',
  'KW',
  'LA',
  'LS',
  'LB',
  'LR',
  'LY',
  'LI',
  'LT',
  'LU',
  'LV',
  'MK',
  'MG',
  'YT',
  'MO',
  'MW',
  'MV',
  'MY',
  'ML',
  'MT',
  'MP',
  'MA',
  'MQ',
  'MR',
  'MU',
  'MX',
  'FM',
  'MM',
  'MD',
  'MC',
  'MN',
  'MS',
  'MZ',
  'NA',
  'NR',
  'NP',
  'DE',
  'NE',
  'NG',
  'NI',
  'NU',
  'NF',
  'NO',
  'NC',
  'NZ',
  'OM',
  'PK',
  'PW',
  'PS',
  'PA',
  'PG',
  'PY',
  'PE',
  'PN',
  'PF',
  'PL',
  'PR',
  'PT',
  'ZA',
  'CF',
  'CV',
  'RE',
  'RU',
  'RO',
  'RW',
  'EH',
  'KN',
  'LC',
  'VC',
  'BL',
  'MF',
  'PM',
  'SV',
  'AS',
  'WS',
  'SM',
  'SN',
  'RS',
  'SC',
  'SL',
  'SG',
  'SX',
  'SK',
  'SI',
  'SO',
  'LK',
  'US',
  'SZ',
  'SD',
  'SS',
  'SR',
  'SJ',
  'SY',
  'CH',
  'SE',
  'TJ',
  'TH',
  'TW',
  'TZ',
  'TL',
  'TG',
  'TK',
  'TO',
  'TT',
  'TN',
  'TR',
  'TM',
  'TC',
  'TV',
  'UG',
  'UA',
  'UY',
  'UZ',
  'VU',
  'WF',
  'VA',
  'VE',
  'HU',
  'GB',
  'VN',
  'IT',
  'CI',
  'BV',
  'CX',
  'IM',
  'SH',
  'AX',
  'CK',
  'VI',
  'HM',
  'CC',
  'MH',
  'FO',
  'SB',
  'ST',
  'ZM',
  'ZW',
  'AE',
];

module.exports = {
  voivodeships,
  divisions,
  positions,
  oldPositions,
  ratingCategories,
  competitions,
  userRoles,
  countryCodes,
  groups,
};
