/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  wordCount: string;
  status: '连载中' | '已完结';
  coverGradient: string; // Tailwind gradient class or custom CSS gradient
  genre: string;         // e.g., 都市言情, 悬疑脑洞
}

export interface RoyaltyDetail {
  id: string;
  bookId: string;
  bookName: string;
  month: string;              // YYYY-MM格式
  guarantyRoyalty: number;    // 保底（买断）稿酬
  selfShareIncome: number;    // 自有分成收入（补贴后）
  thirdPartyShareIncome: number; // 三方分成收入
  copyrightShortPlay: number;  // 版权分成收入 - 短剧
  copyrightAudio: number;      // 版权分成收入 - 有声
  welfareIncome: number;      // 福利收入
  attendanceBonus: number;    // 全勤收入
  preTaxTotalIncome: number;  // 实发税前总收入
}
