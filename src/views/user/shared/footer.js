import React, { 
} from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import defaultLang from '../../../helpers/lang';
import styles from '../../../assets/css/footer.module.css';
import fb from '../../../assets/img/fb.png';
import ig from '../../../assets/img/ig.png';
import twt from '../../../assets/img/twt.png';

export default function Footer(){

    const image = [
        {imageUrl:ig, className:"pe-4 me-3"},
        {imageUrl:fb, className:"pe-4 me-3"},
        {imageUrl:twt, className:""},
    ]

    return(
        <Container className={styles.footer + " p-4 mt-4"} fluid>
            <Container>
                <Row>
                    <Col sm={4} className="py-3">
                        {image.map((v,i)=>
                            <Image src={v.imageUrl} className={v.className} key={i}/>
                        )}
                    </Col>
                    <Col sm={8} className="py-3">
                        <Row>
                            <Col className="text-sm-end">{defaultLang.lang.footerText1}</Col>
                            <Col sm={1} className="text-sm-center">|</Col>
                            <Col className="text-sm-start">{defaultLang.lang.footerText2}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}