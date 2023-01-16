import React, { 
} from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Image, Navbar } from 'react-bootstrap';
import routeAll from '../../../helpers/route';
import companyLogo from '../../../assets/img/logo-dummy.png';
import styles from '../../../assets/css/header.module.css';

export default function Header(props){
    return(
        <>
            <Helmet>
                <title>{props.children.props.pageName}</title>
                <meta name="description" content="Web site test frontend di RGB" />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>
            <Navbar bg="light" expand="lg" className={styles.navbar}>
                <Container fluid>
                    <Navbar.Brand href={routeAll.user.ProductList.path}><Image src={companyLogo} /></Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}