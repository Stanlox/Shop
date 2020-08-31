import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from './Auth';
import { Find } from './Products/Find';

const NavMenu = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <header>
            <Navbar className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="navbar navbar-expand-md navbar-light bg-light sticky-top">
                    <div className="container-fluid">
                        <div className="navbar-brad"><img src="img/5element.png" width="150" /></div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <NavbarBrand tag={Link} to="/">Главная</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Contacts">Контакты</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Products">Все товары</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Laptops">Ноутбуки</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Phones">Мобильные телефоны</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Projectors">Проекторы</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Tablets">Планшеты</NavbarBrand>
                                <NavbarBrand tag={Link} className="text-dark" to="/Available">Доступные</NavbarBrand>
                                <li className="nav-item active">
                                    <a>
                                        <img src="https://img.icons8.com/metro/26/000000/shopping-cart.png" />
                                    </a>
                                </li>
                            </ul>
                            <Find />
                        </div>
                        <NavbarBrand tag={Link} className="text-dark" to="/AllProducts">Продукты</NavbarBrand>
                    </div>
                </div>
                {isAuthenticated ? (
                    <form style={{ position: "absolute", top: "15px", right: "15px" }}>
                        <button className="btn btn-primary" style="position:absolute; top:15px;" onClick={() => logout()}>Log out</button>
                    </form>
                ) : (
                        <form style={{ position: "absolute", top: "15px", right: "15px" }}>
                            <button className="btn btn-primary" onClick={() => loginWithRedirect()}>Log in</button>
                        </form>
                        )}
            </Navbar>
        </header>
    );
}

export default NavMenu;

