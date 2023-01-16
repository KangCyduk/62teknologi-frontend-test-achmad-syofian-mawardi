import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getData, postData } from '../../helpers/apiHelper';
import styles from '../../assets/css/productDetail.module.css';
import IconAddOn from '../../components/iconAddon';
import iconPoint from '../../assets/img/point-give.png';
import btnRedeem from '../../assets/img/btn_redeem.png';
import btnAddCart from '../../assets/img/btn_add_cart.png';
import wishlistOn from '../../assets/img/wishlist-on.png';
import wishlistOff from '../../assets/img/wishlist-off.png';
import routeAll from '../../helpers/route';
import { Link } from 'react-router-dom';
import StarRating from '../../components/starRating';
import InStock from '../../components/inStock';

export default function ProductDetail(){
    const param = useParams()

    const [state, setState] = useState(
        {
            detailData:{},
            qty:1
        }
    );
    
    useEffect(()=>{
        if(param){
            if(param.id){
                loadAllData()
            }
        }
    },[param])

    const loadAllData = async () => {
        const response = await getData(`gifts/${param.id}`);
        if(response){
            const list = response.data.data.attributes
            setState(state=>({...state,detailData:list}))
        }
    }

    const setWishlist = async ()=>{
        const response = await postData(`gifts/${param.id}/wishlist`);
        if(response){
            const detail = state.detailData;
            detail.isWishlist = detail.isWishlist==1?0:1;
            setState(state=>({...state,detailData:detail}))
        }
    }

    const setQty = (param)=>{
        let currentQty = state.qty
        switch (param) {
            case "down":
                if(currentQty > 1){
                    setState(state => ({...state,qty:currentQty-1}))
                }
                break;
            case "up":
                if(currentQty >= 1){
                    setState(state => ({...state,qty:currentQty+1}))
                }
                break;
        }
    }

    const renderPoints = ()=>{
        return(
            <div className="point pb-3 d-flex flex-row align-items-center">
                <div className={`${styles.point}`}>
                    <Image src={iconPoint} className="pe-1"/> {state.detailData.points} poins
                </div>
                <InStock {...state.detailData} addClass="px-3"/>
            </div>
        )
    }

    const renderQty = () => {
        return(
            <div className="d-flex flex-column">
                <div className="review-txt"><p className={styles.jumlah}>Jumlah</p></div>
                <div>
                    <InputGroup className={styles.inputGroup} size="sm">
                        <Button variant="secondary" className={styles.inputButton} onClick={()=>setQty("down")}>-</Button>
                        <Form.Control
                            value={state.qty}
                            readOnly={true}
                            className={styles.inputGroupFormControl}
                        />
                        <Button variant="secondary" className={styles.inputButton} onClick={()=>setQty("up")}>+</Button>
                    </InputGroup>
                </div>
            </div>
        )
    }

    const renderButton = () =>{
        const buttonWishlist = state.detailData.isWishlist==0?wishlistOff:wishlistOn
        return(
            <div className="d-flex-sm flex-row">
                <div className="p-2"><Image src={buttonWishlist} height={45} onClick={()=>setWishlist()}/></div>
                <div className="p-2"><Image src={btnRedeem} height={45}/></div>
                <div className="p-2"><Image src={btnAddCart} height={45}/></div>
            </div>
        )
    }

    const renderDetailProduct = () =>{
        return(
            <div className="d-flex flex-column">
                <div className={styles.title}>{state.detailData.name}</div>
                <div className="py-2"><StarRating {...state.detailData} size={26}/></div>
                {renderPoints()}
                <div className="description pb-2" dangerouslySetInnerHTML={{__html:state.detailData.info}}/>
                <div className="qty pb-2">
                    {renderQty()}
                </div>
                <div className="btn pb-2">
                    {renderButton()}
                </div>
            </div>
        )
    }

    const renderInfoRincianProduct = () =>{
        return(
            <div className="d-flex flex-column">
                <div><p className={styles.headerInfoProduk}>Info Produk</p></div>
                <div className={styles.hr_class+" my-3"}>
                    <div className={styles.hr_class_green}></div>
                </div>
                <div className="pt-3 pb-4"><p className={styles.titleRincianProduk}>Rincian</p></div>
                <div className={styles.rincianProduk+" pb-5"} dangerouslySetInnerHTML={{__html:state.detailData.description}}/>
            </div>
            
        )
    }

    return(
        <Container>
            <p className={`${styles.breadcrumb} pb-3`}><Link to={routeAll.user.ProductList.path}>List product</Link>{` > ${state.detailData.name}`}</p>
            <Row>
                <Col sm={6} className={`p-5 ${styles.imageArea}`}>
                    <IconAddOn {...state.detailData}/>
                    <Image src={state.detailData.images} className="w-100 p-4"/>
                </Col>
                <Col sm={6} className={"py-3 px-5"}>
                    {renderDetailProduct()}
                </Col>
            </Row>
            <div className="d-flex flex-column">
                {renderInfoRincianProduct()}
            </div>
        </Container>
    )
}