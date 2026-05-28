/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar } from 'lucide-react';
import { MONTHS } from '../data';

interface MonthRangePickerProps {
  startMonth: string;
  endMonth: string;
  onChange: (start: string, end: string) => void;
}

export default function MonthRangePicker({ startMonth, endMonth, onChange }: MonthRangePickerProps) {
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  const startRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);

  // Close when clicked outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (startRef.current && !startRef.current.contains(event.target as Node)) {
        setStartOpen(false);
      }
      if (endRef.current && !endRef.current.contains(event.target as Node)) {
        setEndOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatMonth = (mStr: string) => {
    if (!mStr) return '无';
    const [year, month] = mStr.split('-');
    return `${year}年${month}月`;
  };

  // Sorted from oldest to newest for chronological ordering
  const sortedMonths = [...MONTHS].reverse();

  // Helper values for comparisons
  const latestMonth = MONTHS[0]; // 2026-05

  // Determine which preset matches current startMonth and endMonth
  const isAll = !startMonth && !endMonth;
  const isLast3 = startMonth === '2026-03' && endMonth === '2026-05';
  const isLast6 = startMonth === '2025-12' && endMonth === '2026-05';
  const isThisYear = startMonth === '2026-01' && endMonth === '2026-05';

  const activePreset = isAll 
    ? 'all' 
    : isLast3 
    ? 'last3' 
    : isLast6 
    ? 'last6' 
    : isThisYear 
    ? 'thisYear' 
    : 'custom';

  const handlePresetSelect = (preset: 'all' | 'last3' | 'last6' | 'thisYear' | 'custom') => {
    if (preset === 'all') {
      onChange('', '');
    } else if (preset === 'last3') {
      onChange('2026-03', '2026-05');
    } else if (preset === 'last6') {
      onChange('2025-12', '2026-05');
    } else if (preset === 'thisYear') {
      onChange('2026-01', '2026-05');
    } else if (preset === 'custom') {
      // If switching to custom, default to first half-year of current dataset if empty, or keep previous
      const start = startMonth || '2026-01';
      const end = endMonth || '2026-04';
      onChange(start, end);
    }
  };

  const handleStartSelect = (month: string) => {
    setStartOpen(false);
    const end = endMonth || latestMonth;
    if (month.localeCompare(end) > 0) {
      onChange(month, month);
    } else {
      onChange(month, end);
    }
  };

  const handleEndSelect = (month: string) => {
    setEndOpen(false);
    const start = startMonth || '2025-10';
    if (start.localeCompare(month) > 0) {
      onChange(month, month);
    } else {
      onChange(start, month);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 relative z-40">
      {/* Preset segment selector */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 select-none">
        <button
          onClick={() => handlePresetSelect('all')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activePreset === 'all'
              ? 'bg-white text-blue-600 shadow-sm font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          全部账期
        </button>
        <button
          onClick={() => handlePresetSelect('last3')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activePreset === 'last3'
              ? 'bg-white text-blue-650 shadow-sm font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          近3个月
        </button>
        <button
          onClick={() => handlePresetSelect('last6')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activePreset === 'last6'
              ? 'bg-white text-blue-650 shadow-sm font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          近6个月
        </button>
        <button
          onClick={() => handlePresetSelect('thisYear')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activePreset === 'thisYear'
              ? 'bg-white text-blue-650 shadow-sm font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          今年
        </button>
        <button
          onClick={() => handlePresetSelect('custom')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activePreset === 'custom'
              ? 'bg-white text-blue-650 shadow-sm font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          自定义
        </button>
      </div>

      {/* Custom Picker Fields - visible when activePreset === 'custom' */}
      {activePreset === 'custom' && (
        <div className="flex items-center gap-1.5 animate-fade-in relative">
          {/* Start Month Picker */}
          <div className="relative inline-block text-left" ref={startRef}>
            <div
              onClick={() => setStartOpen(!startOpen)}
              className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 border border-gray-200 cursor-pointer select-none transition-all active:scale-98"
            >
              <span className="text-gray-400 font-medium">开始：</span>
              <span className="font-mono text-gray-800">{formatMonth(startMonth || '2025-10')}</span>
              <Calendar className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {startOpen && (
              <div className="absolute left-0 mt-1.5 w-48 bg-white border border-gray-150 rounded-xl shadow-2xl z-50 py-1.5 animate-slide-down origin-top">
                <div className="px-3 py-1.5 mb-1 border-b border-gray-50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  选择开始月份
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5 px-1 scrollbar-thin">
                  {sortedMonths.map((month) => {
                    const isActive = month === startMonth;
                    const isAfterEnd = endMonth ? month.localeCompare(endMonth) > 0 : false;
                    return (
                      <button
                        key={month}
                        onClick={() => handleStartSelect(month)}
                        className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : isAfterEnd
                            ? 'text-gray-300 hover:bg-gray-50 hover:text-gray-400 line-through cursor-not-allowed'
                            : 'text-gray-650 hover:bg-gray-50 hover:text-gray-950'
                        }`}
                      >
                        <span>{formatMonth(month)}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Separator word */}
          <span className="text-gray-400 font-semibold text-[10px] px-0.5">至</span>

          {/* End Month Picker */}
          <div className="relative inline-block text-left" ref={endRef}>
            <div
              onClick={() => setEndOpen(!endOpen)}
              className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 border border-gray-200 cursor-pointer select-none transition-all active:scale-98"
            >
              <span className="text-gray-400 font-medium">结束：</span>
              <span className="font-mono text-gray-800">{formatMonth(endMonth || latestMonth)}</span>
              <Calendar className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {endOpen && (
              <div className="absolute right-0 sm:left-0 mt-1.5 w-48 bg-white border border-gray-150 rounded-xl shadow-2xl z-50 py-1.5 animate-slide-down origin-top">
                <div className="px-3 py-1.5 mb-1 border-b border-gray-50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  选择结束月份
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5 px-1 scrollbar-thin">
                  {sortedMonths.map((month) => {
                    const isActive = month === endMonth;
                    const isBeforeStart = startMonth ? month.localeCompare(startMonth) < 0 : false;
                    return (
                      <button
                        key={month}
                        onClick={() => handleEndSelect(month)}
                        className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : isBeforeStart
                            ? 'text-gray-300 hover:bg-gray-50 hover:text-gray-400 line-through cursor-not-allowed'
                            : 'text-gray-650 hover:bg-gray-50 hover:text-gray-950'
                        }`}
                      >
                        <span>{formatMonth(month)}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
