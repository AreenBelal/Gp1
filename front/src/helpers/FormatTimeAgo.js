import React from "react";
import moment from "moment";

const FormatTimeAgo = ({ createdAt }) => {
  // تحويل التاريخ إلى كائن moment
  const date = moment(createdAt);
  // الآن
  const now = moment();
  // الفرق بالدقائق
  const diffMinutes = now.diff(date, "minutes");

  // إذا كانت الفرق أقل من دقيقة واحدة
  if (diffMinutes < 1) {
    return "الآن";
  }

  // إذا كانت الفرق أقل من ساعة
  if (diffMinutes < 60) {
    return `منذ ${diffMinutes} دقيقة`;
  }

  // إذا كانت الفرق أقل من يوم
  if (diffMinutes < 1440) {
    // 24 * 60 دقيقة
    const diffHours = Math.floor(diffMinutes / 60);
    return `منذ ${diffHours} ساعة`;
  }

  // إذا كانت الفرق أقل من شهر
  if (diffMinutes < 43200) {
    // 30 * 24 * 60 دقيقة
    const diffDays = Math.floor(diffMinutes / 1440);
    return `منذ ${diffDays} يوم`;
  }

  // للفترات الأطول
  return <span>{date.fromNow()}</span>;
};

export default FormatTimeAgo;
