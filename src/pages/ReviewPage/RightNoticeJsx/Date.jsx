import style from "../../../css/Date.module.css";

export default function Date() {
  return (
    <div className={style.date}>
      <div className={style.date__content}>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.21447 3.33947 4.375 4.375 4.375H15.625C16.6605 4.375 17.5 5.21447 17.5 6.25V15.625M2.5 15.625C2.5 16.6605 3.33947 17.5 4.375 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625M2.5 15.625V9.375C2.5 8.33947 3.33947 7.5 4.375 7.5H15.625C16.6605 7.5 17.5 8.33947 17.5 9.375V15.625"
            stroke="#999999"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>날짜</p>
      </div>
      <p>2022 / 03 / 20</p>
    </div>
  );
}