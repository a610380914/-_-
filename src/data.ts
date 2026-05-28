/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book, RoyaltyDetail } from './types';

export const STORY_BOOKS: Book[] = [
  {
    id: 'all',
    title: '全部作品',
    wordCount: '共 4 篇',
    status: '连载中',
    coverGradient: 'from-gray-100 to-gray-200 text-gray-400',
    genre: '全部'
  },
  {
    id: 'book2',
    title: '重来一次：打造华夏科技帝国',
    wordCount: '112.5万字',
    status: '连载中',
    coverGradient: 'from-blue-600 via-indigo-600 to-violet-700 text-white',
    genre: '都市商战'
  },
  {
    id: 'book3',
    title: '规则怪谈：我的妻子不是人',
    wordCount: '86.4万字',
    status: '连载中',
    coverGradient: 'from-zinc-800 via-neutral-900 to-slate-950 text-white',
    genre: '悬疑惊悚'
  },
  {
    id: 'book4',
    title: '娇软王妃在八零：糙汉首富拿命宠',
    wordCount: '52.1万字',
    status: '已完结',
    coverGradient: 'from-rose-400 via-pink-500 to-red-500 text-white',
    genre: '现代言情'
  },
  {
    id: 'book5',
    title: '末世：我靠百亿物资打造神级避难所',
    wordCount: '210.8万字',
    status: '已完结',
    coverGradient: 'from-amber-500 via-orange-600 to-yellow-700 text-white',
    genre: '科幻末世'
  }
];

export const LONG_BOOKS: Book[] = [
  {
    id: 'all',
    title: '全部作品',
    wordCount: '共 4 篇',
    status: '连载中',
    coverGradient: 'from-gray-100 to-gray-200 text-gray-400',
    genre: '全部'
  },
  {
    id: 'book2',
    title: '傲世狂澜：回到25岁做科技霸主',
    wordCount: '112.5万字',
    status: '连载中',
    coverGradient: 'from-blue-600 via-indigo-600 to-violet-700 text-white',
    genre: '都市商战'
  },
  {
    id: 'book3',
    title: '异空间怪谈：我的完美妻子',
    wordCount: '86.4万字',
    status: '连载中',
    coverGradient: 'from-zinc-800 via-neutral-900 to-slate-950 text-white',
    genre: '悬疑惊悚'
  },
  {
    id: 'book4',
    title: '落木萧萧：八零糙汉的掌心宠',
    wordCount: '52.1万字',
    status: '已完结',
    coverGradient: 'from-rose-400 via-pink-500 to-red-500 text-white',
    genre: '现代言情'
  },
  {
    id: 'book5',
    title: '废土降临：我靠神级仓库拯救人类',
    wordCount: '210.8万字',
    status: '已完结',
    coverGradient: 'from-amber-500 via-orange-600 to-yellow-700 text-white',
    genre: '科幻末世'
  }
];

export const BOOKS: Book[] = STORY_BOOKS;

// Generates royalty details for our books
export const ROYALTY_DETAILS: RoyaltyDetail[] = [
  // 狂飙在都市的逆天狂医 (book1) - Started Oct 2025
  {
    id: 'r1_202605',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2026-05',
    guarantyRoyalty: 8000,
    selfShareIncome: 24750.50,
    thirdPartyShareIncome: 4210.80,
    copyrightShortPlay: 12500.00,
    copyrightAudio: 2150.00,
    welfareIncome: 1200,
    attendanceBonus: 1500,
    preTaxTotalIncome: 54311.30
  },
  {
    id: 'r1_202604',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2026-04',
    guarantyRoyalty: 8000,
    selfShareIncome: 29850.00,
    thirdPartyShareIncome: 5420.20,
    copyrightShortPlay: 14200.00,
    copyrightAudio: 2300.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 62070.20
  },
  {
    id: 'r1_202603',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2026-03',
    guarantyRoyalty: 8000,
    selfShareIncome: 21400.00,
    thirdPartyShareIncome: 3900.50,
    copyrightShortPlay: 9800.00,
    copyrightAudio: 1850.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 47250.50
  },
  {
    id: 'r1_202602',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2026-02',
    guarantyRoyalty: 8000,
    selfShareIncome: 18200.00,
    thirdPartyShareIncome: 2800.00,
    copyrightShortPlay: 6500.05,
    copyrightAudio: 1400.00,
    welfareIncome: 1500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 39900.05
  },
  {
    id: 'r1_202601',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2026-01',
    guarantyRoyalty: 8000,
    selfShareIncome: 16500.00,
    thirdPartyShareIncome: 2100.00,
    copyrightShortPlay: 4800.00,
    copyrightAudio: 950.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 34850.00
  },
  {
    id: 'r1_202512',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2025-12',
    guarantyRoyalty: 8000,
    selfShareIncome: 12400.00,
    thirdPartyShareIncome: 1750.00,
    copyrightShortPlay: 2200.00,
    copyrightAudio: 600.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 27250.00
  },
  {
    id: 'r1_202511',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2025-11',
    guarantyRoyalty: 8000,
    selfShareIncome: 9200.00,
    thirdPartyShareIncome: 1100.00,
    copyrightShortPlay: 0.00,
    copyrightAudio: 350.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 20950.00
  },
  {
    id: 'r1_202510',
    bookId: 'book1',
    bookName: '狂飙在都市的逆天狂医',
    month: '2025-10',
    guarantyRoyalty: 4000, // Partial month
    selfShareIncome: 3400.00,
    thirdPartyShareIncome: 450.00,
    copyrightShortPlay: 0.00,
    copyrightAudio: 120.00,
    welfareIncome: 0,
    attendanceBonus: 0,
    preTaxTotalIncome: 7970.00
  },

  // 重来一次：打造华夏科技帝国 (book2) - Started Nov 2025
  {
    id: 'r2_202605',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2026-05',
    guarantyRoyalty: 15000,
    selfShareIncome: 4500.00,
    thirdPartyShareIncome: 1200.00,
    copyrightShortPlay: 0,
    copyrightAudio: 200.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 23400.00
  },
  {
    id: 'r2_202604',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2026-04',
    guarantyRoyalty: 15000,
    selfShareIncome: 3500.00,
    thirdPartyShareIncome: 650.00,
    copyrightShortPlay: 0.00,
    copyrightAudio: 150.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 21300.00
  },
  {
    id: 'r2_202603',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2026-03',
    guarantyRoyalty: 15000,
    selfShareIncome: 4200.00,
    thirdPartyShareIncome: 600.00,
    copyrightShortPlay: 1200.00,
    copyrightAudio: 300.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 23300.00
  },
  {
    id: 'r2_202602',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2026-02',
    guarantyRoyalty: 15000,
    selfShareIncome: 1100.00,
    thirdPartyShareIncome: 950.00,
    copyrightShortPlay: 0,
    copyrightAudio: 150.00,
    welfareIncome: 1200,
    attendanceBonus: 1500,
    preTaxTotalIncome: 19900.00
  },
  {
    id: 'r2_202601',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2026-01',
    guarantyRoyalty: 15000,
    selfShareIncome: 1800.00,
    thirdPartyShareIncome: 400.00,
    copyrightShortPlay: 0,
    copyrightAudio: 100.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 19600.00
  },
  {
    id: 'r2_202512',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2025-12',
    guarantyRoyalty: 15000,
    selfShareIncome: 1500.00,
    thirdPartyShareIncome: 350.00,
    copyrightShortPlay: 0,
    copyrightAudio: 50.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 18900.00
  },
  {
    id: 'r2_202511',
    bookId: 'book2',
    bookName: '重来一次：打造华夏科技帝国',
    month: '2025-11',
    guarantyRoyalty: 7500,
    selfShareIncome: 1100.00,
    thirdPartyShareIncome: 420.00,
    copyrightShortPlay: 0,
    copyrightAudio: 90.00,
    welfareIncome: 0,
    attendanceBonus: 750,
    preTaxTotalIncome: 9860.00
  },

  // 规则怪谈：我的妻子不是人 (book3) - Started Dec 2025
  {
    id: 'r3_202605',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2026-05',
    guarantyRoyalty: 12000,
    selfShareIncome: 4100.00,
    thirdPartyShareIncome: 800.00,
    copyrightShortPlay: 0,
    copyrightAudio: 300.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 19700.00
  },
  {
    id: 'r3_202604',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2026-04',
    guarantyRoyalty: 12000,
    selfShareIncome: 3500.00,
    thirdPartyShareIncome: 600.00,
    copyrightShortPlay: 0.00,
    copyrightAudio: 200.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 18300.00
  },
  {
    id: 'r3_202603',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2026-03',
    guarantyRoyalty: 12000,
    selfShareIncome: 9500.00,
    thirdPartyShareIncome: 1650.00,
    copyrightShortPlay: 200.00,
    copyrightAudio: 650.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 26000.00
  },
  {
    id: 'r3_202602',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2026-02',
    guarantyRoyalty: 12000,
    selfShareIncome: 7400.00,
    thirdPartyShareIncome: 1100.00,
    copyrightShortPlay: 0,
    copyrightAudio: 450.00,
    welfareIncome: 1200,
    attendanceBonus: 1500,
    preTaxTotalIncome: 23650.00
  },
  {
    id: 'r3_202601',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2026-01',
    guarantyRoyalty: 12000,
    selfShareIncome: 4100.00,
    thirdPartyShareIncome: 650.00,
    copyrightShortPlay: 0,
    copyrightAudio: 210.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 19260.00
  },
  {
    id: 'r3_202512',
    bookId: 'book3',
    bookName: '规则怪谈：我的妻子不是人',
    month: '2025-12',
    guarantyRoyalty: 6000, // half month sign
    selfShareIncome: 1250.00,
    thirdPartyShareIncome: 180.00,
    copyrightShortPlay: 0,
    copyrightAudio: 50.00,
    welfareIncome: 0,
    attendanceBonus: 0,
    preTaxTotalIncome: 7480.00
  },

  // 娇软王妃在八零：糙汉首富拿命宠 (book4) - Active Jan 2026 - Apr 2026 (Finished)
  {
    id: 'r4_202604',
    bookId: 'book4',
    bookName: '娇软王妃在八零：糙汉首富拿命宠',
    month: '2026-04',
    guarantyRoyalty: 0,
    selfShareIncome: 18500.00,
    thirdPartyShareIncome: 2900.00,
    copyrightShortPlay: 1500.00,
    copyrightAudio: 800.00,
    welfareIncome: 3000, // Finish bonus
    attendanceBonus: 1500,
    preTaxTotalIncome: 28200.00
  },
  {
    id: 'r4_202603',
    bookId: 'book4',
    bookName: '娇软王妃在八零：糙汉首富拿命宠',
    month: '2026-03',
    guarantyRoyalty: 0,
    selfShareIncome: 22400.00,
    thirdPartyShareIncome: 4100.00,
    copyrightShortPlay: 500.00,
    copyrightAudio: 1200.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 30200.00
  },
  {
    id: 'r4_202602',
    bookId: 'book4',
    bookName: '娇软王妃在八零：糙汉首富拿命宠',
    month: '2026-02',
    guarantyRoyalty: 0,
    selfShareIncome: 19100.00,
    thirdPartyShareIncome: 3200.00,
    copyrightShortPlay: 0,
    copyrightAudio: 750.00,
    welfareIncome: 500,
    attendanceBonus: 1500,
    preTaxTotalIncome: 25050.00
  },
  {
    id: 'r4_202601',
    bookId: 'book4',
    bookName: '娇软王妃在八零：糙汉首富拿命宠',
    month: '2026-01',
    guarantyRoyalty: 0,
    selfShareIncome: 8500.00,
    thirdPartyShareIncome: 1200.00,
    copyrightShortPlay: 0,
    copyrightAudio: 300.00,
    welfareIncome: 1000, // Sign on
    attendanceBonus: 1500,
    preTaxTotalIncome: 12500.00
  },

  // 末世：我靠百亿物资打造神级避难所 (book5) - Started Oct 2025, ended May 2026
  {
    id: 'r5_202605',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2026-05',
    guarantyRoyalty: 15000,
    selfShareIncome: 12100.00,
    thirdPartyShareIncome: 2100.00,
    copyrightShortPlay: 18000.00, // Big hit on short plays!
    copyrightAudio: 1500.00,
    welfareIncome: 4000, // Finished book reward list
    attendanceBonus: 1500,
    preTaxTotalIncome: 54200.00
  },
  {
    id: 'r5_202604',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2026-04',
    guarantyRoyalty: 15000,
    selfShareIncome: 18600.00,
    thirdPartyShareIncome: 3600.00,
    copyrightShortPlay: 14000.00,
    copyrightAudio: 1900.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 55600.00
  },
  {
    id: 'r5_202603',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2026-03',
    guarantyRoyalty: 15000,
    selfShareIncome: 16500.00,
    thirdPartyShareIncome: 2900.00,
    copyrightShortPlay: 9000.00,
    copyrightAudio: 1400.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 47300.00
  },
  {
    id: 'r5_202602',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2026-02',
    guarantyRoyalty: 15000,
    selfShareIncome: 12400.00,
    thirdPartyShareIncome: 1800.00,
    copyrightShortPlay: 4500.00,
    copyrightAudio: 1100.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 37300.00
  },
  {
    id: 'r5_202601',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2026-01',
    guarantyRoyalty: 15000,
    selfShareIncome: 10800.00,
    thirdPartyShareIncome: 1500.00,
    copyrightShortPlay: 2000.00,
    copyrightAudio: 850.00,
    welfareIncome: 1000,
    attendanceBonus: 1500,
    preTaxTotalIncome: 32650.00
  },
  {
    id: 'r5_202512',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2025-12',
    guarantyRoyalty: 15000,
    selfShareIncome: 9200.00,
    thirdPartyShareIncome: 1200.00,
    copyrightShortPlay: 0,
    copyrightAudio: 600.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 28300.00
  },
  {
    id: 'r5_202511',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2025-11',
    guarantyRoyalty: 15000,
    selfShareIncome: 6500.00,
    thirdPartyShareIncome: 800.00,
    copyrightShortPlay: 0,
    copyrightAudio: 410.00,
    welfareIncome: 800,
    attendanceBonus: 1500,
    preTaxTotalIncome: 25010.00
  },
  {
    id: 'r5_202510',
    bookId: 'book5',
    bookName: '末世：我靠百亿物资打造神级避难所',
    month: '2025-10',
    guarantyRoyalty: 10000, // half month
    selfShareIncome: 2400.00,
    thirdPartyShareIncome: 400.00,
    copyrightShortPlay: 0,
    copyrightAudio: 180.00,
    welfareIncome: 0,
    attendanceBonus: 1500,
    preTaxTotalIncome: 14480.00
  }
];

// List of all unique months in descending order
export const MONTHS = Array.from(new Set(ROYALTY_DETAILS.map(d => d.month))).sort((a, b) => b.localeCompare(a));
