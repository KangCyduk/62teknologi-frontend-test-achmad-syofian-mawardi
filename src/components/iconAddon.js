import React from 'react';
import bestSeller from '../assets/img/best-seller.png';
import hotItem from '../assets/img/hot-item.png';
import newItem from '../assets/img/new.png';
import styles from '../assets/css/productList.module.css';
import { Image } from 'react-bootstrap';

export default function IconAddOn(props){
    const getIconAddOn = (value) => {
        let srcImage = null;
        let enumBestSeller = 0;

        if(value.rating >= 4 && value.numOfReviews > 25){
            enumBestSeller = 1;
        }
        if(value.stock > 0){
            if(value.isNew==1 && enumBestSeller==1){
                srcImage = hotItem
            }else if(enumBestSeller==1){
                srcImage = bestSeller
            }else if(value.isNew==1){
                srcImage = newItem
            }
        }
        return srcImage
    }

    return(
        <Image src={getIconAddOn(props)} className={styles.iconAddOn}/>
    )
}