/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, ShieldAlert, Award, FileText, Calendar, Coins, Clapperboard, AudioLines } from 'lucide-react';

interface RulesExplainProps {
  isShort?: boolean;
  selectedBookId?: string;
}

export default function RulesExplain({ isShort = false, selectedBookId }: RulesExplainProps) {
  const isBook3 = selectedBookId === 'book3';
  return (
    <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-5 pb-3.5 border-b border-gray-100">
        <HelpCircle className="w-5 h-5 text-gray-500" />
        <h3 className="font-bold text-gray-800 text-sm">稿费及结算规则说明</h3>
      </div>

      {/* Grid of Rules */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${isShort || isBook3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 text-xs text-gray-655`}>
        {/* Rule 1: 保底转分成规则 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <span className="p-1 px-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Coins className="w-3.5 h-3.5" />
            </span>
            <span>1. 保底转分成规则</span>
          </div>
          <p className="text-gray-500 leading-relaxed pl-7">
            当（累计分成收入（不含全勤福利））&gt;（累计保底（买断）稿酬）时，即代表已达到收支平衡；之后则按每月自有分成收入（补贴后）+三方分成收入+版权分成收入+福利收入+全勤收入进行结算。
          </p>
        </div>

        {/* Rule 2: 出数据的时间 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-gray-805">
            <span className="p-1 px-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <span>2. 稿费更新时间</span>
          </div>
          <p className="text-gray-500 leading-relaxed pl-7">
            每月11日更新上月收入，如遇节假日顺延
          </p>
        </div>

        {/* Rule 3: 新版本书籍的结算说明 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-gray-805">
            <span className="p-1 px-1.5 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-3.5 h-3.5" />
            </span>
            <span>3. 新旧版本合并说明</span>
          </div>
          <p className="text-gray-500 leading-relaxed pl-7">
            新版本书籍的税前稿费结算自动并入原版稿费结算中，故新版本书籍的“实发税前总收入”显示为0
          </p>
        </div>

        {/* Rule 4: 破保底进度说明 */}
        {!isShort && !isBook3 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-gray-805">
              <span className="p-1 px-1.5 rounded-lg bg-rose-50 text-rose-600">
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
              <span>4. 破保底进度说明</span>
            </div>
            <p className="text-gray-500 leading-relaxed pl-7">
              仅针对2026年新书支持查看破保底进度
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
