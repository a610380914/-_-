/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RoyaltyDetail } from '../types';
import { ROYALTY_DETAILS, MONTHS, STORY_BOOKS, LONG_BOOKS } from '../data';
import { Filter, Download, ListFilter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface RoyaltyDetailsProps {
  selectedBookId: string;
  startMonth: string;
  endMonth: string;
  isShort?: boolean;
}

type SortField = 'month' | 'guarantyRoyalty' | 'selfShareIncome' | 'thirdPartyShareIncome' | 'copyrightShortPlay' | 'copyrightAudio' | 'welfareIncome' | 'attendanceBonus' | 'preTaxTotalIncome';
type SortOrder = 'asc' | 'desc';

export default function RoyaltyDetails({ selectedBookId, startMonth, endMonth, isShort = false }: RoyaltyDetailsProps) {
  // Sorting state
  const [sortField, setSortField] = React.useState<SortField>('month');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');
  
  // Selected revision state under the active book
  const [selectedRevisionId, setSelectedRevisionId] = React.useState<string>('all');

  // Reset selected version tab to 'all' whenever selected book changes
  React.useEffect(() => {
    setSelectedRevisionId('all');
  }, [selectedBookId]);

  const BOOKS_LIST = isShort ? STORY_BOOKS : LONG_BOOKS;

  // Define dynamic versions list based on the active selected book
  const getRevisions = (bookId: string) => {
    if (bookId === 'book2') {
      const bookTitle = BOOKS_LIST.find(b => b.id === 'book2')?.title || '重来一次：打造华夏科技帝国';
      return [
        { id: 'all', name: bookTitle },
        { id: 'main', name: '重生之我在异世界' },
        { id: 'sub_a', name: '科技帝国商战精装' },
        { id: 'sub_b', name: '科技帝国轻量渠道' },
      ];
    }
    if (bookId === 'book5') {
      const bookTitle = BOOKS_LIST.find(b => b.id === 'book5')?.title || '末世：我靠百亿物资打造神级避难所';
      return [
        { id: 'all', name: bookTitle },
        { id: 'main', name: '本站首发版' },
        { id: 'sub_a', name: '百亿物资末世生存版' },
        { id: 'sub_b', name: '神级避难所爽文配置' },
      ];
    }
    return [];
  };

  const revisions = getRevisions(selectedBookId);
  const selectedRevisionName = revisions.find(r => r.id === selectedRevisionId)?.name || '合并版';

  // Filter actual data based on selected properties
  const filteredDetails = ROYALTY_DETAILS.filter(item => {
    // Book constraint
    const isBookInList = BOOKS_LIST.some(b => b.id === item.bookId && b.id !== 'all');
    const bookMatches = selectedBookId === 'all' ? isBookInList : item.bookId === selectedBookId;
    
    // Month range constraint (inclusive, supports empty for unlimited)
    const monthMatches = (!startMonth || item.month.localeCompare(startMonth) >= 0) && 
                         (!endMonth || item.month.localeCompare(endMonth) <= 0);
    
    return bookMatches && monthMatches;
  });

  // Scale data dynamically based on the selected revision
  const revisedDetails = filteredDetails.map((item) => {
    let factor = 1.0;
    if (selectedRevisionId === 'main') factor = 0.65;
    else if (selectedRevisionId === 'sub_a') factor = 0.23;
    else if (selectedRevisionId === 'sub_b') factor = 0.12;

    const roundVal = (num: number) => Math.round(num * factor * 100) / 100;

    const revisedGuaranty = roundVal(item.guarantyRoyalty);
    const revisedSelfShare = roundVal(item.selfShareIncome);
    const revisedThirdParty = roundVal(item.thirdPartyShareIncome);
    const revisedAudio = roundVal(item.copyrightAudio);
    const revisedShortPlay = roundVal(item.copyrightShortPlay);
    const revisedWelfare = roundVal(item.welfareIncome);
    const revisedAttendance = roundVal(item.attendanceBonus);
    
    const revisedTotal = revisedGuaranty + revisedSelfShare + revisedThirdParty + revisedAudio + revisedShortPlay + revisedWelfare + revisedAttendance;

    const bookTitle = BOOKS_LIST.find(b => b.id === item.bookId)?.title || item.bookName;

    return {
      ...item,
      bookName: selectedRevisionId === 'all' ? bookTitle : selectedRevisionName,
      guarantyRoyalty: revisedGuaranty,
      selfShareIncome: revisedSelfShare,
      thirdPartyShareIncome: revisedThirdParty,
      copyrightAudio: revisedAudio,
      copyrightShortPlay: revisedShortPlay,
      welfareIncome: revisedWelfare,
      attendanceBonus: revisedAttendance,
      preTaxTotalIncome: Math.round(revisedTotal * 100) / 100
    };
  });

  // Sort data
  const sortedDetails = [...revisedDetails].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'desc' 
        ? valB.localeCompare(valA) 
        : valA.localeCompare(valB);
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'desc' 
        ? valB - valA 
        : valA - valB;
    }
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
    }).format(val);
  };

  const formatMonthText = (mStr: string) => {
    const [year, month] = mStr.split('-');
    return `${year}-${month}`;
  };

  // Real client-side CSV exporter
  const exportToCSV = () => {
    const headers = [
      '书籍名称',
      '月份',
      '保底（买断）稿酬 (元)',
      '自有分成收入（补贴后） (元)',
      '三方分成收入 (元)',
      '版权分成-有声 (元)',
      '版权分成-漫剧 (元)',
      '福利收入 (元)',
      '全勤奖金 (元)',
      '实发税前总收入 (元)'
    ];

    const rows = sortedDetails.map(item => [
      item.bookName,
      item.month,
      item.guarantyRoyalty,
      item.selfShareIncome,
      item.thirdPartyShareIncome,
      item.copyrightAudio,
      item.copyrightShortPlay,
      item.welfareIncome,
      item.attendanceBonus,
      item.preTaxTotalIncome
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const rangeName = startMonth && endMonth ? `${startMonth}_至_${endMonth}` : '全时段';
    link.setAttribute("download", `点众稿费明细_${selectedBookId === 'all' ? '全部书籍' : sortedDetails[0]?.bookName || ''}_${rangeName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden mb-6">
      {/* Table Action Controls Header */}
      <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50/20">
        <div className="flex flex-wrap items-center gap-2">
          <ListFilter className="w-5 h-5 text-gray-500" />
          <h3 className="text-base font-bold text-gray-900">
            稿费详情明细
          </h3>
          {revisions.length > 0 && (
            <span className="text-[11px] text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
              💡 含改版书籍
            </span>
          )}
        </div>

        {/* Horizontal scrollable revision/version tabs under the selected book */}
        {revisions.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full -mx-5 px-5 md:mx-0 md:px-0">
            {revisions.map((rev) => {
              const isSelected = selectedRevisionId === rev.id;
              return (
                <button
                  key={rev.id}
                  onClick={() => setSelectedRevisionId(rev.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150 whitespace-nowrap cursor-pointer select-none ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100'
                      : 'bg-white text-gray-650 border-gray-200 hover:bg-gray-50 hover:text-gray-950 hover:border-gray-300'
                  }`}
                >
                  {rev.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[1100px]">
          {/* Header */}
          <thead className="bg-gray-50 text-[11px] text-gray-450 uppercase tracking-wider font-semibold border-b border-gray-100 select-none">
            {/* Headers Row */}
            <tr>
              <th rowSpan={2} className="px-5 py-3.5 text-gray-650 font-bold border-r border-gray-100 w-[17%]" style={{ minWidth: '150px' }}>
                书籍名称
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('month')}
                className="px-4 py-3.5 text-center text-gray-650 font-bold border-r border-gray-100 w-[7%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '70px' }}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>月份</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('guarantyRoyalty')}
                className="px-4 py-3.5 text-right text-gray-650 font-bold border-r border-gray-100 w-[10%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '100px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>保底/买断稿酬</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('selfShareIncome')}
                className="px-4 py-3.5 text-right text-gray-650 font-bold border-r border-gray-100 w-[12%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '120px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>自有分成(补贴后)</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('thirdPartyShareIncome')}
                className="px-4 py-3.5 text-right text-gray-650 font-bold border-r border-gray-100 w-[9%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '94px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>三方分成</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              {/* Copyright Umbrella Column */}
              <th colSpan={2} className="py-2.5 text-center text-blue-650 font-bold bg-blue-50/40 border-b border-r border-gray-100 uppercase tracking-widest font-sans font-medium">
                版权分成收入
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('welfareIncome')}
                className="px-4 py-3.5 text-right text-gray-650 font-bold border-r border-gray-100 w-[9%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '85px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>福利收入</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('attendanceBonus')}
                className="px-4 py-3.5 text-right text-gray-650 font-bold border-r border-gray-100 w-[9%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '85px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>全勤奖金</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </div>
              </th>
              <th 
                rowSpan={2} 
                onClick={() => handleSort('preTaxTotalIncome')}
                className="px-5 py-3.5 text-right text-blue-700 font-extrabold w-[13%] hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ minWidth: '120px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>实发税前总和</span>
                  <ArrowUpDown className="w-3 h-3 text-blue-500" />
                </div>
              </th>
            </tr>
            {/* Headers Row 2 (Splits for Copyright) */}
            <tr className="bg-blue-50/10 text-[10px] text-blue-600 border-b border-gray-100 select-none">
              <th 
                onClick={() => handleSort('copyrightAudio')}
                className="px-4 py-2 text-right font-semibold border-r border-gray-100 w-[7%] hover:bg-blue-50/20 transition-colors cursor-pointer"
                style={{ minWidth: '80px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>有声 🎙️</span>
                  <ArrowUpDown className="w-2.5 h-2.5 text-blue-400" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('copyrightShortPlay')}
                className="px-4 py-2 text-right font-semibold border-r border-gray-100 w-[7%] hover:bg-blue-50/20 transition-colors cursor-pointer"
                style={{ minWidth: '80px' }}
              >
                <div className="flex items-center justify-end gap-1">
                  <span>漫剧 🎬</span>
                  <ArrowUpDown className="w-2.5 h-2.5 text-blue-400" />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body rows */}
          <tbody className="divide-y divide-gray-100 text-xs font-sans text-gray-650">
            {sortedDetails.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-100/30 transition-all duration-100 active:bg-gray-50/60"
              >
                {/* Book name */}
                <td className="px-5 py-4 font-semibold text-gray-800 border-r border-gray-100 break-words line-clamp-2" title={row.bookName}>
                  {row.bookName}
                </td>
                
                {/* Month */}
                <td className="px-4 py-4 text-center font-mono text-gray-500 border-r border-gray-100">
                  {row.month}
                </td>

                {/* Guaranty */}
                <td className="px-4 py-4 text-right font-mono text-gray-650 border-r border-gray-100">
                  {row.guarantyRoyalty > 0 ? `¥${formatCurrency(row.guarantyRoyalty)}` : '—'}
                </td>

                {/* Self share */}
                <td className="px-4 py-4 text-right font-mono text-gray-650 border-r border-gray-100">
                  {row.selfShareIncome > 0 ? `¥${formatCurrency(row.selfShareIncome)}` : '—'}
                </td>

                {/* Third party share */}
                <td className="px-4 py-4 text-right font-mono text-gray-650 border-r border-gray-100">
                  {row.thirdPartyShareIncome > 0 ? `¥${formatCurrency(row.thirdPartyShareIncome)}` : '—'}
                </td>

                {/* Split copyrightAudio 有声 */}
                <td className="px-4 py-4 text-right font-mono text-gray-500 bg-blue-50/5 border-r border-gray-100 font-medium">
                  {row.copyrightAudio > 0 ? (
                    <span className="text-gray-700">¥{formatCurrency(row.copyrightAudio)}</span>
                  ) : '—'}
                </td>

                {/* Split copyrightShortPlay 漫剧 */}
                <td className="px-4 py-4 text-right font-mono text-gray-500 bg-blue-50/5 border-r border-gray-100 font-medium">
                  {row.copyrightShortPlay > 0 ? (
                    <span className="text-gray-700">¥{formatCurrency(row.copyrightShortPlay)}</span>
                  ) : '—'}
                </td>

                {/* Welfare income */}
                <td className="px-4 py-4 text-right font-mono text-gray-650 border-r border-gray-100">
                  {row.welfareIncome > 0 ? `¥${formatCurrency(row.welfareIncome)}` : '—'}
                </td>

                {/* Attendance bonus */}
                <td className="px-4 py-4 text-right font-mono text-gray-650 border-r border-gray-100">
                  {row.attendanceBonus > 0 ? `¥${formatCurrency(row.attendanceBonus)}` : '—'}
                </td>

                {/* Pretax Total */}
                <td className="px-5 py-4 text-right font-sans font-extrabold text-[#EF4444] bg-red-50/5">
                  ¥{formatCurrency(row.preTaxTotalIncome)}
                </td>
              </tr>
            ))}

            {sortedDetails.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400 text-sm">
                  暂时没有匹配的作品月度账单明细
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Info footer */}
      <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between text-[11px] text-gray-450 gap-2 select-none">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>* 排序：点击表头可将列表按该项进行升序或降序排列</span>
        </div>
      </div>
    </div>
  );
}
