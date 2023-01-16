import React from 'react';
import styles from '../assets/css/productList.module.css';
import defaultLang from '../helpers/lang';

export default function InStock(props){
    const numStock = props.stock;
    const lang = defaultLang.lang;
    let textStock = ""
    let className = ""
    if(numStock < 5 && numStock > 0){
        textStock = lang.outStock
        className = styles.outStock
    }else if(numStock >= 5){
        textStock = lang.inStock
        className = styles.inStock
    }else{
        textStock = lang.soldOut
        className = styles.outStock
    }

    return(
        <div className={`${props.addClass} ${className}`}>{textStock}</div>
    )
}