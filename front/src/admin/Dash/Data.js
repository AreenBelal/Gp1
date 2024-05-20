// استيراد الأيقونات الجانبية
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// استيراد بيانات بطاقات التحليل
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

// استيراد الصور
import img1 from "./imgs/img1.png";
import img2 from "./imgs/img2.png";
import img3 from "./imgs/img3.png";

// بيانات القائمة الجانبية
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "لوحة التحكم ",
    route: "/admin/Dash/admindash",
  },
  {
    icon: UilClipboardAlt,
    heading: "الطلاب",
    route: "/admin/studentAdmin/stuadminfinal",
  },
  {
    icon: UilUsersAlt,
    heading: "المعلمون",
    route:"/admin/teachAdmin/teachadminfinal",
  },
 
  {
    icon: UilChart,
    heading: 'إعدادات'
  },
];

// بيانات بطاقات التحليل
export const cardsData = [
  {
    title: "المبيعات",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "المبيعات",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "الإيرادات",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "الإيرادات",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "المصروفات",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "المصروفات",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// بيانات بطاقات التحديثات الأخيرة
export const UpdatesData = [
  {
    img: img1,
    name: "أندرو توماس",
    noti: "قام بطلب ساعة ذكية من آبل ببطارية سعتها 2500 مللي أمبير.",
    time: "منذ 25 ثانية",
  },
  {
    img: img2,
    name: "جيمس بوند",
    noti: "استلم جهاز سامسونج لشحن البطارية.",
    time: "منذ 30 دقيقة",
  },
  {
    img: img3,
    name: "آيرون مان",
    noti: "قام بطلب ساعة ذكية من آبل وجهاز سامسونج لشحن البطارية بسعة 2500 مللي أمبير.",
    time: "منذ 2 ساعة",
  },
];
