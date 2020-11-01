import React from 'react';
import classes from './header.css';
import Top from './top/top';
import Bottom from './bottom/bottom';
class Header extends React.Component{
    
    state = {
        counter : 5
    }

    componentDidMount(){
    //   let ct = this.state.counter;
    //   this.setState({
    //       ...this.state,
    //       counter : ct + 1
    //   });
    
    }
    componentDidUpdate(){
       
    }

    render(){
        // console.log(this.state.counter + " -> >>");
       
        // setTimeout(() => {
        //     let ct = this.state.counter;
        //     if(this.state.counter>2){
        //         this.setState({
        //             counter : 1
        //         })
        //     }else{
        //     this.setState({
        //         counter : ct + 1
        //     })
        // }
        // },12000);

        return(
            <div  className = {classes.self}>
                <div  className = {classes.backgroundImage} ></div>
                <Top />
                <Bottom />
            </div>
        );
    }

}


export default Header;