import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import styles from '../../assets/css/productList.module.css';
import StarRating from '../../components/starRating';
import { getData } from '../../helpers/apiHelper';
import iconPoint from '../../assets/img/point-icon.png';
import wishlistOn from '../../assets/img/wishlist-on.png';
import wishlistOff from '../../assets/img/wishlist-off.png';
import eyeSolid from '../../assets/img/eye-solid.svg';
import { useLocation } from 'react-router';
import routeAll from '../../helpers/route';
import { Link } from 'react-router-dom';
import IconAddOn from '../../components/iconAddon';
import InStock from '../../components/inStock';


var _ = require('lodash');

export default function ProductList(){
    const location = useLocation()
    // eslint-disable-next-line
    const [state, setState] = useState(
        {
            meta: {
                totalItems: 20,
                currentPage: 1,
                itemPerPage: 20,
                totalPages: 4
            },
            filterData:[
                {id:1,label:"Rating 4 ke atas",checked:false},
                {id:2,label:"Stock Tersedia",checked:false}
            ],
            listData:[],
            sortingData:[],
            sorting:0,
            filter:[]
        }
    );

    useEffect(()=>{
        if(location.pathname){
            loadAllData()
            sort("1")
        }
    },[location.pathname]);

    useEffect(()=>{
        if(state.listData){
            let list = state.listData
            if(state.sorting){
                switch (state.sorting) {
                    case "1":
                        list = _.orderBy(state.listData,['isNew','id'],['desc','desc'])
                        break;
                    case "2":
                        list = _.orderBy(state.listData,['rating','numOfReviews'],['desc','desc'])
                        break;
                }
                
            }
            if(state.filter){
                state.filter.forEach((v)=>{
                    switch (v) {
                        case 1:
                            list = list.filter(x=>x.rating >= 4)
                            break;
                        case 2:
                            list = list.filter(x=>x.stock > 0)
                            break;
                    }
                })
            }
            setState(state => ({...state,sortingData:list}))
        }
    },[state.sorting, state.listData, state.filter]);

    const loadAllData = async () => {
        const getMetaData = await getData(`gifts`);
        if(getMetaData){
            const pageNumber = getMetaData.data.meta.currentPage
            const pageSize = getMetaData.data.meta.totalItems
            const response = await getData(`gifts?page[number]=${pageNumber}&page[size]=${pageSize}`)
            if(response){
                const list = response.data.data.map((v)=>
                    v.attributes
                )
                setState(state=>({...state,listData:list}))
            }
        }
        
    }

    const sort = (e)=> {
        setState(state => ({...state,sorting:e}))
    }

    const setFilter=(idx)=>{
        const filter = state.filterData
        let filterArr = []
        filter[idx].checked = !filter[idx].checked
        const valIdFilter = filter[idx].id
        if(state.filter.includes(valIdFilter)){
            filterArr = state.filter.filter(v=>v!==valIdFilter)
        }else{
            filterArr = [...state.filter,valIdFilter]
        }
        setState(state => ({...state,filterData:filter, filter:filterArr}))
    }

    const hr = ()=>{
        return(
            <div className={styles.hr_class+" my-3"}></div>
        )
    }

    const pointStarsReviewBtnWishlist = (value) =>{
        const buttonWishlist  = value.isWishlist==0? wishlistOff:wishlistOn;
        return(
            <div className={"d-flex flex-row align-items-center justify-content-between"}>
                <div className={"pe-2"}>
                    <div className={"d-flex flex-column"}>
                        <div className={styles.point}><Image src={iconPoint}/> {value.points} poins</div>
                        <div><StarRating {...value} size={17}/></div>
                    </div>
                </div>
                <div><Image src={buttonWishlist} className={`cursor-pointer ${styles.btn_wishlist} ${styles.opacity1}`}/></div>
            </div>
        )
    }

    const boxListData = (value,index) =>{
        const className = `h-100 ${styles.filter_box} cursor-pointer ${value.stock==0 && styles.soldOut}`
        const classNameNoStock = `p-0 ${value.stock==0? styles.opacity73:""}`
        const buttonWishlist  = value.isWishlist==0? wishlistOff:wishlistOn;
        return(
            <Col key={index}>
                <Link to={routeAll.user.ProductDetail.path.replace(':id',value.id)} >
                    <Card className={className} body>
                        <IconAddOn {...value}/>
                        <Card.Body className={classNameNoStock}>
                            <div className={"d-flex flex-column"}>
                                <InStock {...value} addClass="pb-2 px-3 pt-3"/>
                                <div className={"image py-2 align-self-center"}><Image src={value.images[0]} height={"250"}/></div>
                                <div className={`py-2 px-3 ${styles.list_data_title}`}>{value.name}</div>
                                <div className={"point-stars-review-btnWishlist pb-3 px-3"}>{pointStarsReviewBtnWishlist(value)}</div>
                            </div>
                        </Card.Body>
                        <Card.ImgOverlay className={styles.choosen}>
                            <Card.Body className="p-0">
                            <div className={"d-flex flex-column"}>
                                <InStock {...value} addClass="pb-5 px-3 pt-3 text-white"/>
                                <div className={`px-3 ${styles.titleChosen} text-white`}>{value.name}</div>
                                <div className={`text-white py-5`}>
                                    <Button className={styles.buttonChosen} variant="outline-light"> 
                                        <Image src={eyeSolid} width={12} className={styles.imageChoosen}/> View detail
                                    </Button>
                                </div>
                                <div className="text-end"><Image src={buttonWishlist} className={`cursor-pointer ${styles.opacity1}`} width={70}/></div>
                            </div>
                            </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </Link>
            </Col>
        )
    }

    const filter = () =>{
        const showFilter = state.filterData;
        return(
            <div className='d-flex flex-column'>
                <div><p className={styles.section_title}>Filter</p></div>
                {hr()}
                <div className='py-1'>
                    <div className={`d-flex flex-column p-3 ${styles.filter_box}`}>
                        {showFilter.map((v,idx)=>
                            <div className="d-flex flex-row py-2 justify-content-between cursor-pointer" key={idx} onClick={()=>setFilter(idx)}>
                                <div>{v.label}</div>
                                <div><Form.Check 
                                        type={'checkbox'}
                                        id={`chk-${idx}`}
                                        checked={v.checked}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const productList = ()=>{
        return(
            <div className='d-flex flex-column'>
                <div className={styles.header_p_list}>
                    <p className={styles.section_title}>Product List</p>
                    <div className={`d-flex flew-row ${styles.group_sorting}`}>
                        <div className={`${styles.sorting_label} pe-4`}>urutkan</div>
                        <div >
                            <Form.Select className={`${styles.sorting_input}`} aria-label="Default select example" value={state.sorting} onChange={(e)=>sort(e.target.value)}>
                                <option value="1">Terbaru</option>
                                <option value="2">Ulasan</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
                {hr()}
                <div className='py-1'>
                    <Row className="row-cols-1 row-cols-md-3 g-4">
                        {state.sortingData.length > 0 && state.sortingData.map((v,idx)=>
                            boxListData(v,idx)
                        )}
                    </Row>
                </div>
            </div>
        )
    }

    return(
        <Container>
            <Row>
                <Col sm={3} className="pe-sm-5 pb-5">{filter()}</Col>
                <Col sm={9} className="px-2">{productList()}</Col>
            </Row>
        </Container>
    )
}