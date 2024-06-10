import { createGlobalStyle } from 'styled-components';
import MainBenner from '../component/MainBennerImg';
import ContentDisplay from '../component/ContentDisplay';
import Notice from '../component/NoticeBox';
import UpcomigReleases from '../component/UpcomigReleases';
import Review from '../component/MainReview';
import Language from '../svg/Language';
import Rating from '../component/ReviewRating';
import Genre from '../component/Genre';
import HotContent from '../component/HotContent';
import app from '../css/App.module.css';
import Date from '../component/Date';
import styles from '../css/Layout.module.css';
import MaingPaddingTop from '../css/Navbar.module.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
	}
	body {
    background-color: #141414;
    margin: 0 auto;
    padding: 2px;
	}
`;

export default function MainPage() {
    return (
        <>
            <GlobalStyle />
            <div className={MaingPaddingTop.mianPagePaddingTop}>
                <MainBenner />
                {/* Left Notice */}
                <div className={styles.layout}>
                    <div className={styles.MainPageverticalContainer}>
                        <Notice />
                        <UpcomigReleases />
                        <Review />
                    </div>

                    {/* Right Notice */}
                    <div className={app.bg}>
                        <p className={app.title}>어떤 작품을 찾아볼까요?</p>
                        <Date />
                        <HotContent />
                    </div>
                </div>
                <ContentDisplay />
            </div>
        </>
    );
}
