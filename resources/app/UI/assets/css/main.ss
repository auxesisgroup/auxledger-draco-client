@font-face {
  font-family: 'Lato_Light';
  src: url("../fonts/Lato-Light.ttf") format("truetype"); }
@font-face {
  font-family: 'Lato_Regular';
  src: url("../fonts/Lato-Regular.ttf") format("truetype"); }
@font-face {
  font-family: 'Lato_Bold';
  src: url("../fonts/Lato-Bold.ttf") format("truetype"); }
@font-face {
  font-family: 'Lato_Black';
  src: url("../fonts/Lato-Black.ttf") format("truetype"); }
a {
  text-decoration: none; }
  a:hover {
    text-decoration: none; }

.header_dark {
  font-family: 'Lato_Black';
  font-size: 30px;
  color: #313131; }

.header_white {
  font-family: 'Lato_Black';
  font-size: 30px;
  color: #F7F7F7; }

.sub_header_dark {
  font-family: 'Lato_Light';
  font-size: 22px;
  color: #313131; }

.sub_header_white {
  font-family: 'Lato_Light';
  font-size: 22px;
  color: #F7F7F7; }

.sub_header_blue {
  font-family: 'Lato_Light';
  font-size: 22px;
  color: #2575FC; }

.body_dark {
  font-size: 14px;
  font-family: 'Lato_Regular';
  color: #313131; }

.body_white {
  font-size: 14px;
  font-family: 'Lato_Regular';
  color: #F7F7F7; }

.body_small {
  font-size: 11px;
  font-family: 'Lato_Regular';
  color: #313131; }

.body_small_white {
  font-size: 11px;
  font-family: 'Lato_Regular';
  color: #F7F7F7; }

.label_dark {
  font-family: 'Lato_Light';
  font-size: 18px;
  color: #313131; }

.label_white, .bottom_sub_links .app_version {
  font-family: 'Lato_Light';
  font-size: 18px;
  color: #F7F7F7; }

.sub_label_dark {
  font-size: 11px;
  font-family: 'Lato_Regular';
  color: #313131; }

.sub_label_white {
  font-size: 11px;
  font-family: 'Lato_Regular';
  color: #F7F7F7; }

.link_dark {
  font-family: 'Lato_Light';
  font-size: 13px;
  color: #313131; }

.link_white, .side_ul li {
  font-family: 'Lato_Light';
  font-size: 13px;
  color: #F7F7F7; }

.bold_label {
  font-family: 'Lato_Bold';
  font-size: 14px;
  color: #F7F7F7; }

body {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(359.97deg, #05172B 0%, #001F3A 35.14%, #083760 100%);
  background-repeat: no-repeat; }

* {
  box-sizing: border-box !important; }

a {
  text-decoration: none; }
  a:hover {
    color: #2575FC; }

.relative {
  position: relative; }

.main_wrapper {
  position: relative;
  float: right;
  width: 85%;
  width: calc(100% - 200px);
  height: 500px;
  padding-top: 90px; }

.sidebar {
  position: fixed;
  width: 185px;
  height: 100vh;
  top: 0;
  left: 0;
  color: #F7F7F7; }

.logo_div {
  width: 140px;
  display: block;
  box-sizing: border-box;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 60px; }

.side_ul {
  list-style: none;
  padding: 0px; }
  .side_ul a {
    color: #F7F7F7;
    transition: all 0.2s ease; }
    .side_ul a:hover {
      color: #2575FC; }
  .side_ul li {
    padding-left: 30px;
    height: 30px;
    display: block;
    display: flex;
    align-items: center; }
    .side_ul li.active {
      font-family: 'Lato_Bold';
      background-color: #021D37;
      border-left: solid 4px #E77638; }
    .side_ul li.category {
      font-family: 'Lato_Bold';
      font-size: 12px;
      margin-top: 25px;
      margin-bottom: 15px; }

.bottom_sub_links {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-left: 30px; }
  .bottom_sub_links .bottom_links {
    font-size: 12px;
    color: rgba(247, 247, 247, 0.56);
    font-family: 'Lato_Bold';
    display: block;
    margin-bottom: 11px; }
  .bottom_sub_links .app_version {
    color: rgba(247, 247, 247, 0.56);
    margin-top: 10px;
    margin-bottom: 30px; }

.app_quit_btn {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 20px;
  height: 20px;
  display: block;
  z-index: 10;
  cursor: pointer; }

.intro_screen_link {
  position: relative;
  display: flex;
  width: 100%;
  height: 130px;
  color: #F7F7F7;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  align-items: center;
  justify-content: center; }
  .intro_screen_link:hover {
    background: rgba(0, 0, 0, 0.5); }

/*# sourceMappingURL=main.ss.map */