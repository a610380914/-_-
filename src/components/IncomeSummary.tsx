/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { HelpCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { ROYALTY_DETAILS, STORY_BOOKS, LONG_BOOKS } from '../data';

interface IncomeSummaryProps {
  selectedBookId: string;
  selectedBookTitle: string;
  startMonth: string;
  endMonth: string;
  isShort?: boolean;
}

export default function IncomeSummary({
  selectedBookId,
  selectedBookTitle,
  startMonth,
  endMonth,
  isShort = false,
}: IncomeSummaryProps) {
  // Format month to text, e.g., 2026-04 -> 2026年04月
  const formatMonthText = (mStr: string) => {
    const [year, month] = mStr.split('-');
    return `${year}年${month}月`;
  };

  const [isExpanded, setIsExpanded] = React.useState(false);

  const CURRENT_MONTH = '2026-04';

  const BOOKS_LIST = isShort ? STORY_BOOKS : LONG_BOOKS;

  // 1. Calculate Current Month Royalty components for selectedBookId in CURRENT_MONTH
  const currentMonthDetails = ROYALTY_DETAILS.filter(d => {
    const isBookInList = BOOKS_LIST.some(b => b.id === d.bookId && b.id !== 'all');
    const bookMatches = selectedBookId === 'all' ? isBookInList : d.bookId === selectedBookId;
    return bookMatches && d.month === CURRENT_MONTH;
  });

  const currentMonthBreakdown = currentMonthDetails.reduce(
    (acc, cur) => {
      acc.guaranty += cur.guarantyRoyalty;
      acc.selfShare += cur.selfShareIncome;
      acc.thirdParty += cur.thirdPartyShareIncome;
      acc.shortPlay += cur.copyrightShortPlay;
      acc.audio += cur.copyrightAudio;
      acc.welfare += cur.welfareIncome;
      acc.attendance += cur.attendanceBonus;
      acc.total += cur.preTaxTotalIncome;
      return acc;
    },
    { guaranty: 0, selfShare: 0, thirdParty: 0, shortPlay: 0, audio: 0, welfare: 0, attendance: 0, total: 0 }
  );

  // 2. Calculate Period Royalty components for selectedBookId within [startMonth, endMonth]
  const periodDetails = ROYALTY_DETAILS.filter(d => {
    const isBookInList = BOOKS_LIST.some(b => b.id === d.bookId && b.id !== 'all');
    const bookMatches = selectedBookId === 'all' ? isBookInList : d.bookId === selectedBookId;
    const withinRange = (!startMonth || d.month.localeCompare(startMonth) >= 0) && 
                        (!endMonth || d.month.localeCompare(endMonth) <= 0);
    return bookMatches && withinRange;
  });

  const periodBreakdown = periodDetails.reduce(
    (acc, cur) => {
      acc.guaranty += cur.guarantyRoyalty;
      acc.selfShare += cur.selfShareIncome;
      acc.thirdParty += cur.thirdPartyShareIncome;
      acc.shortPlay += cur.copyrightShortPlay;
      acc.audio += cur.copyrightAudio;
      acc.welfare += cur.welfareIncome;
      acc.attendance += cur.attendanceBonus;
      acc.total += cur.preTaxTotalIncome;
      return acc;
    },
    { guaranty: 0, selfShare: 0, thirdParty: 0, shortPlay: 0, audio: 0, welfare: 0, attendance: 0, total: 0 }
  );

  // Formatting helper for currency in CNY (元)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Calculations for guarantee status
  const guaranty = periodBreakdown.guaranty;
  const otherIncome = periodBreakdown.total - periodBreakdown.guaranty;
  const diff = otherIncome - guaranty;
  const isBroken = diff > 0;
  const hasGuaranty = guaranty > 0;
  const isShortBook3 = selectedBookId === 'book3' && isShort;
  const isLongBook3 = selectedBookId === 'book3' && !isShort;
  const isLongBook2 = selectedBookId === 'book2' && !isShort;
  const showGuarantyCard = selectedBookId !== 'book1' && !isShortBook3 && !isLongBook3 && !isLongBook2;
  const showProgressCard = selectedBookId !== 'book1' && !isShortBook3 && !isLongBook3;

  // Count visible cards to determine columns
  let visibleCardsCount = 1; // Card 1 is always visible
  if (showGuarantyCard) visibleCardsCount++;
  if (!isShortBook3) visibleCardsCount++; // Card 3 (Cumulative share revenue)
  if (!isShortBook3 && !isLongBook3) visibleCardsCount++; // Card 4 (Cumulative attendance revenue)
  if (!startMonth && !endMonth && showProgressCard) visibleCardsCount++; // Card 5

  const lgGridCols = 
    visibleCardsCount === 1 ? 'lg:grid-cols-1 max-w-xs' :
    visibleCardsCount === 2 ? 'lg:grid-cols-2 max-w-md' :
    visibleCardsCount === 3 ? 'lg:grid-cols-3' :
    visibleCardsCount === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5';

  return (
    <div className="space-y-4 mb-5">
      {selectedBookId === 'all' ? (
        /* 2-Column Metrics Cards Grid for ALL books */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 当期稿费 Card */}
          <div className="bg-white rounded-xl border border-gray-150 p-5 relative hover:border-blue-200 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-2 text-xs text-gray-500 font-medium font-sans">
              <div className="flex items-center gap-1.5">
                <span>本期实发税前总和 ({formatMonthText(CURRENT_MONTH)})</span>
                {/* Tooltip */}
                <div className="relative group/tooltip inline-block cursor-help font-serif font-sans">
                  <Info className="w-3.5 h-3.5 text-gray-405 hover:text-blue-500 transition-colors" />
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900/95 backdrop-blur-md text-white text-[11px] p-3 rounded-lg shadow-xl border border-gray-805 opacity-0 scale-95 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:pointer-events-auto transition-all duration-200 z-50 space-y-1 text-left font-sans">
                    <div className="font-semibold text-blue-450 border-b border-gray-800 pb-1 mb-1 flex items-center justify-between">
                      <span>账单明细构成</span>
                      <span>元</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 font-mono text-gray-300">
                      <span>保底/买断:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.guaranty)}</span>
                      <span>自有分成（补贴后）:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.selfShare)}</span>
                      <span>三方分成:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.thirdParty)}</span>
                      <span>版权分成收入:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.shortPlay + currentMonthBreakdown.audio)}</span>
                      <span>福利收入:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.welfare)}</span>
                      <span>全勤奖金:</span>
                      <span className="text-right">{formatCurrency(currentMonthBreakdown.attendance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
                ¥{formatCurrency(currentMonthBreakdown.total)}
              </span>
              <span className="text-xs text-gray-450 font-medium">元</span>
            </div>
          </div>

          {/* 累计稿费 Card */}
          <div className="bg-white rounded-xl border border-gray-150 p-5 relative hover:border-blue-200 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-2 text-xs text-gray-500 font-medium font-sans">
              <div className="flex items-center gap-1.5">
                <span>累计实发税前总和</span>
                <div className="relative group/tooltip inline-block cursor-help font-sans">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-405 hover:text-blue-500 transition-colors" />
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900/95 backdrop-blur-md text-white text-[11px] p-3 rounded-lg shadow-xl border border-gray-805 opacity-0 scale-95 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:pointer-events-auto transition-all duration-200 z-50 space-y-1 text-left font-sans">
                    <div className="font-semibold text-blue-450 border-b border-gray-800 pb-1 mb-1 flex items-center justify-between">
                      <span>累计明细构成</span>
                      <span>元</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 font-mono text-gray-300">
                      <span>保底/买断:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.guaranty)}</span>
                      <span>自有分成（补贴后）:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.selfShare)}</span>
                      <span>三方分成:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.thirdParty)}</span>
                      <span>版权分成收入:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.shortPlay + periodBreakdown.audio)}</span>
                      <span>福利收入:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.welfare)}</span>
                      <span>全勤奖金:</span>
                      <span className="text-right">{formatCurrency(periodBreakdown.attendance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
                ¥{formatCurrency(periodBreakdown.total)}
              </span>
              <span className="text-xs text-gray-450 font-medium">元</span>
            </div>
          </div>
        </div>
      ) : (
        /* Dynamic Metrics Cards Grid for SINGLE book based on selected period */
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${lgGridCols} gap-4`}>
          {/* Card 1: 累计实发税前收入（不含全勤奖金） / 累计实发税前收入 */}
          <div className="bg-white rounded-xl border border-gray-150 p-4 hover:border-blue-200 transition-all shadow-xs relative">
            <div className="text-xs text-gray-500 font-medium mb-1.5 font-sans">
              {!isShort && selectedBookId !== 'all' && selectedBookId !== 'book3' ? '累计实发税前收入（不含全勤奖金）' : '累计实发税前收入'}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900 font-mono tracking-tight">
                ¥{formatCurrency(
                  !isShort && selectedBookId !== 'all' && selectedBookId !== 'book3'
                    ? (isBroken ? (otherIncome - periodBreakdown.attendance) : guaranty)
                    : (isBroken ? otherIncome : guaranty)
                )}
              </span>
              <span className="text-[10px] text-gray-450 font-sans">元</span>
            </div>
          </div>

          {/* Card 2: 累计保底稿酬 */}
          {showGuarantyCard && (
            <div className="bg-white rounded-xl border border-gray-150 p-4 hover:border-blue-200 transition-all shadow-xs relative">
              <div className="text-xs text-gray-500 font-medium mb-1.5 font-sans">
                累计保底稿酬
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-800 font-mono tracking-tight">
                  ¥{formatCurrency(guaranty)}
                </span>
                <span className="text-[10px] text-gray-450 font-sans">元</span>
              </div>
            </div>
          )}

          {/* Card 3: 累计分成收入（含福利） / 累计分成收入 */}
          {!isShortBook3 && (
            <div className="bg-white rounded-xl border border-gray-150 p-4 hover:border-blue-200 transition-all shadow-xs relative">
              <div className="text-xs text-gray-500 font-medium mb-1.5 font-sans flex items-center gap-1.5">
                <span>{isShort ? '累计分成收入（含福利）' : '累计分成收入'}</span>
                <div className="relative group/tooltip inline-block cursor-help">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-405 hover:text-blue-500 transition-colors" />
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900/95 backdrop-blur-md text-white text-[11px] p-3 rounded-lg shadow-xl border border-gray-805 opacity-0 scale-95 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:pointer-events-auto transition-all duration-200 z-50 text-left font-sans font-normal normal-case leading-relaxed">
                    {isShort 
                      ? '累计分成收入（含福利）= 自有分成（补贴后）+ 三方分成 + 版权分成收入 + 福利收入'
                      : '累计分成收入 = 自有分成（补贴后）+ 三方分成 + 版权分成收入'
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-800 font-mono tracking-tight">
                  ¥{formatCurrency(isShort ? otherIncome : (periodBreakdown.selfShare + periodBreakdown.thirdParty + periodBreakdown.shortPlay + periodBreakdown.audio))}
                </span>
                <span className="text-[10px] text-gray-450 font-sans">元</span>
              </div>
            </div>
          )}

          {/* Card 4: 累计全勤奖金 */}
          {!isShortBook3 && !isLongBook3 && (
            <div className="bg-white rounded-xl border border-gray-150 p-4 hover:border-blue-200 transition-all shadow-xs relative">
              <div className="text-xs text-gray-500 font-medium mb-1.5 font-sans">
                累计全勤奖金
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-800 font-mono tracking-tight">
                  ¥{formatCurrency(periodBreakdown.attendance)}
                </span>
                <span className="text-[10px] text-gray-450 font-sans">元</span>
              </div>
            </div>
          )}

          {/* Card 5: 距离破保底还差 / 距离收支平衡还差 */}
          {!startMonth && !endMonth && showProgressCard && (
            <div className={`rounded-xl border p-4 transition-all shadow-xs relative ${
              isBroken 
                ? 'bg-emerald-50/20 border-emerald-150 hover:border-emerald-300' 
                : 'bg-blue-50/15 border-blue-150 hover:border-blue-300'
            }`}>
              <div className="text-xs text-gray-500 font-medium mb-1.5 font-sans flex items-center justify-between col-span-1">
                <div className="flex items-center gap-1.5">
                  <span>{isShort ? '距离破保底还差' : '距离收支平衡还差'}</span>
                  <div className="relative group/tooltip inline-block cursor-help">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-405 hover:text-blue-500 transition-colors" />
                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900/95 backdrop-blur-md text-white text-[11px] p-3 rounded-lg shadow-xl border border-gray-805 opacity-0 scale-95 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:pointer-events-auto transition-all duration-200 z-50 text-left font-sans font-normal normal-case leading-relaxed">
                      <p className="font-medium">{isShort ? '距离破保底还差' : '距离收支平衡还差'} = {isShort ? '累计分成收入（含福利）' : '累计分成收入'} - 累计保底稿酬</p>
                      <p className="text-gray-305 mt-1">若 {isShort ? '累计分成收入（含福利）' : '累计分成收入'} - 累计保底稿酬 &gt; 0则视为{isShort ? '破保底' : '收支平衡'}</p>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isBroken ? 'bg-emerald-100 text-emerald-850' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isShort ? (isBroken ? '已破保底' : '未破保底') : (isBroken ? '收支平衡' : '收支未平衡')}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-bold font-mono tracking-tight ${
                  isBroken ? 'text-emerald-700' : 'text-blue-600'
                }`}>
                  {isBroken ? '+' : ''}{formatCurrency(diff)}
                </span>
                <span className="text-[10px] text-gray-450 font-sans">元</span>
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}
