import React from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Nav from '../nav/nav';
import OwnerNav from '../nav/ownerNav';
import classes from './top.css';
import AuthContext from '../../../hoc/auth-context';
import sprite from '../../../assets/svg/sprite.svg';

class Top extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logoImage : <Logo />,
            darkMode : false,
            className : classes.self,
            userType : "customer",
            displayClass : false
        }
        this.menuRef  = React.createRef();
        this.boxRef  = React.createRef();
    }
    
    componentDidMount(){
        this.menuRef.current.onclick = (event)=>{
            let val = this.state.displayClass;
            this.setState({
                ...this.state,
                displayClass : !val
            })
        }
        this.boxRef.current.onclick = (event)=>{
            if(window.innerWidth <= 840){
                let val = this.state.displayClass;
                this.setState({
                    ...this.state,
                    displayClass : !val
                })
            }
           
        }
        window.onscroll = () => {
            if(document.documentElement.scrollTop >= 120 && !this.state.darkMode){
               this.setState({
                   logoImage : <Logo />,
                   className : classes.selfDark ,
                   darkMode : true
               })
            }else if(document.documentElement.scrollTop < 120 && this.state.darkMode){
                this.setState({
                    logoImage : <Logo />,
                    className : classes.self,
                    darkMode : false
                })
            }
        };
    }
    render(){
        const navBlock = <AuthContext.Consumer>
            {
                context => {
                    return context.userType==='customer' ? <Nav /> : <OwnerNav />
                }
            }
        </AuthContext.Consumer>
        let dc = this.state.displayClass ? classes.displayFixed : null;
    return(
        
        <div className = {this.state.className}>
           {this.state.logoImage}
           <div className = {`${classes.navContainer} ${dc}`} ref = {this.boxRef}>
           {this.state.displayClass ? <Logo /> : null}
           {navBlock}
            <Menu />
           </div>
           
            <svg className = {classes.menuIcon} ref = {this.menuRef}>
                <use xlinkHref = {`${sprite}#icon-menu`} ></use>
            </svg>
        </div>
    )
    }
};
export default Top;
