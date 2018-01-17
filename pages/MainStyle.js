import css from 'styled-jsx/css'

export default css`
  .suki__item {
    width: 100%;
  }
  .categories__item {
    width: 69%;
    min-height: 800px;
    float: left;
    border-left: 1px solid;
  }  
  .menu__item {
    float: left;
    width: 33%;
    text-align:center;
    margin-top: 15px;
  }
  .menu__images {
    width: 70%;
    border: 2px solid;
    border-color: #afafaf;
  }
  .menu__order {
    float: right;
    width: 30%;
    min-height: 800px;
    border-left: 1px solid;
    border-right: 1px solid;
  }
  .menu__order__title {
    text-align: center;
    border-bottom: 1px solid;
  }
  .menu__order__btn>button {
    width: 45%;
    margin-left: 6px;
  }
  .menu__order__detail, .menu__order__btn, .order__all {
    margin-top: 15px;
  }
  .nav__categories {
    text-align: center;
  }
  .item__img__box {
    text-align: center;
    margin-top: 20px;
  }
  .item__img {
    width: 60%;
    border: 2px solid;
    border-color: #afafaf;
  }
  }
  .item__detail {
    margin-left: 40px;
  }
  .font__rating {
    position: relative;
    vertical-align: middle;
    display: inline-block;
    font-size: 14pt;
    margin-left: 10px;
  }
  .menu__comment__detail {
    margin-left: 20px;
  }
  .index__img {
    width: 60%;
  }
  .ratings {
    position: relative;
    vertical-align: middle;
    display: inline-block;
    color: #b1b1b1;
    overflow: hidden;
  }
  
  .full-stars{
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
    color: #fde16d;
  }
  
  .empty-stars:before,
  .full-stars:before {
    content: "\\2605\\2605\\2605\\2605\\2605";
    font-size: 14pt;
  }
  
  .empty-stars:before {
    -webkit-text-stroke: 1px #848484;
  }
  
  .full-stars:before {
    -webkit-text-stroke: 1px orange;
  }
  .order__menu {
    width: 100%;
    min-height: 50px;
  }
  .order__name {
    float: left;
    margin-left: 5px;
    width: 55%;
  }
  .order__amount {
    float: left;
    text-align: center;
    width: 20%;
  }
  .roder__remove__btn {
    float: right;
    margin-right: 5px;
    width: 15%;
    background: #ff0000;
    color: #fff;
    font-weight: bold;
  }
  table {
    width: 100%;
  }
  table>thead>tr>th {
   border-bottom: 1px solid;
  }
  table>tbody>tr>td {
    padding-left 5px;
  }
  .td__order {
    border-right: 1px solid;
  }
  .td__sum {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-right: 1px solid;
  }
  .center {
    text-align: center;
  }
  .order__list__name {
    width: 40%;
  }
  .order__list__number {
    width: 20%;
  }
  .checkbill__container {
    height: 200px;
    line-height:200px;
    margin:25px auto; 
    padding:5px;
  }
  .checkbill__number {
    margin-left: 30px;
    text-align: right;
  }
  .vertical-middle { 
    line-height: 1.2; 
    display: inline-block; 
    vertical-align: middle; 
    text-align: left;
    width: 40%;
  }
  textarea {
    width: 300px;
    height: 100px;
    margin-right: 30px;
  }
`
