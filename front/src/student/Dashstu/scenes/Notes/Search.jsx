import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearch }) => {
  return (
    <div className="search-container" style={{
      display: 'flex',
      alignItems: 'center',
      width:' 100% ',
      maxWidth: '4000px' , /* تحديد الحجم الأقصى لصندوق البحث */
      backgroundColor: '#f5f5f5' , /* لون خلفية صندوق البحث */
      borderRadius:' 20px ' , /* تدوير حواف صندوق البحث */
      padding: '10px' , /* تضبيط التباعد الداخلي */
      boxShadow:' 0px 4px 6px rgba(0, 0, 0, 0.1)' , /* إضافة ظل لصندوق البحث */
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '30px'

    }}>
      <MdSearch className="search-icon" size={24} 
      style={{
      marginRight: '10px', /* تضبيط التباعد بين أيقونة البحث وحقل النص */
      color: '#d5b9c2' /* لون أيقونة البحث */}}
      />
      <input
        className="search-input"
        onChange={(event) => handleSearch(event.target.value)}
        type="text"
        placeholder="بحث"
        style={{
          flex: '1', /* جعل حقل النص يمتد ليأخذ المساحة المتبقية */
          border: 'none', /* إزالة الحدود حول حقل النص */
          backgroundColor: 'transparent', /* جعل خلفية حقل النص شفافة */
          fontSize: '16px', /* حجم النص في حقل البحث */
          outline: 'none', /* إزالة الحدود الداخلية عند التركيز */
          color: 'black',
        }}  
      />
    </div>
  );
};

export default Search;

