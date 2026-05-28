# AI Coding Agent Guidelines

## 1. Business Logic Partitioning
- **Short-Form Income (短篇收益 - `story_income`)** and **Long-Form Income (长篇收益 - `long_form_income`)** are structurally and logically independent. 
- Always ensure modifications to one logic do not bleed into or affect the other unless explicitly requested.
- Use explicit visual flags and conditions (e.g., `isShort`, `showProgressCard`, `showGuarantyCard`, etc.) to isolate behavior for custom rules on specific books (e.g., *规则怪谈：我的妻子不是人*, *狂飙在都市的逆天狂医*, *末世：我靠百亿物资打造神级避难所*, etc.).

## 2. Book-Specific Rules
- **狂飙在都市的逆天狂医**: Remove the cumulative guarantee card ("累计保底稿酬") under columns setup.
- **规则怪谈：我的妻子不是人**: Keep only the cumulative real paid pre-tax income ("累计实发税前收入") card.
- **末世：我靠百亿物资打造神级避难所** / **重生之我在异世界**: Retain the version/revision TAB split logic under their respective book selector options.
- **Progress Cards**: Only show progress cards for Long-Form books of 2026. Avoid rendering any of these notices or text indicators in the Short-Form section.
