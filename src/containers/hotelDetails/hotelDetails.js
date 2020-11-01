import React from 'react';
import classes from './hotelDetails.css';
import Input from '../../components/input/input';
import sprite from '../../assets/svg/sprite.svg';
import Button from '../../components/buttons/styleTwo';
import Lists from '../../components/listItem/listItem';
import call from '../../call';
import Spinner from '../../assets/messageBox/sideSpinner/sideSpinner';
const listOfRoomService = ["Wifi" ,
"Air Conditioner",
"Newspaper",
"Food",
"Fans",
"Phone Service",
"Coffe Maker",
"Hanger",
"Private Bathroom",
"Television"];
const listOfHotelService =  ["Food and Beverage",
"Laundry",
"Parking",
"Alarm Service",
"Security",
"Resturant",
"Internet"];

const roomTypes = ["NON AC" , "AC" ,"3 STAR" , "4 STAR" , "5 STAR" , "DELUX" ];
let roomID = 1;
class HotelDetails extends React.Component{

    state = {
        imageUrls : [],
        uploadImages : [],
        hotelFacilities : listOfHotelService,
        roomFacilities : listOfRoomService,
        roomArray : [],
        fields : {
            propertyName : '',
            propertyType : '',
            location : {
                address : '',
                area : '',
                city : '',
                state : '',
                country : 'INDIA',
                points : {
                    type : 'Point',
                    coordinates : []
                }

            },
            amount : 0,
            discount : 0,
            hotelDescription : '',
            hotelStarRating : 0,
            roomType : '',
            propertyId : '',
            roomCount : 0,
            _id : ''
        },
        newHotel : true,
        spinner :false
    }
    componentDidMount(){
        if(this.props.hotelDetails){
           
            this.setState({
                        newHotel : this.props.newHotel,
                        imageUrls : this.props.hotelDetails.coverImage,
                        hotelFacilities : this.props.hotelDetails.hotelFacilitiesArray,
                        roomFacilities : this.props.hotelDetails.roomFacilitiesArray,
                        roomArray : this.props.roomArray,
                        fields : {
                        propertyName : this.props.hotelDetails.propertyName,
                        propertyType : this.props.hotelDetails.propertyType,
                        location : {
                            address : this.props.hotelDetails.location.address,
                            area : this.props.hotelDetails.location.area,
                            city : this.props.hotelDetails.location.city,
                            state : this.props.hotelDetails.location.state,
                            country : this.props.hotelDetails.location.country,
                            points : {
                                type : 'Point',
                                coordinates : [this.props.hotelDetails.location.points.coordinates[0],
                                            this.props.hotelDetails.location.points.coordinates[1]
                                            ]
                            }

                        },
                        amount : this.props.hotelDetails.amount,
                        discount : this.props.hotelDetails.discount,
                        hotelDescription : this.props.hotelDetails.hotelDescription,
                        hotelStarRating : this.props.hotelDetails.hotelStarRating,
                        roomType: this.props.hotelDetails.roomType,
                        roomCount: this.props.hotelDetails.roomCount,
                        propertyId : this.props.hotelDetails.propertyId,
                        _id  : this.props.hotelDetails._id
                        }
            })
        }
    }
    shouldComponentUpdate(nextProps , nextState){
        if(nextProps !== this.props){
                if(this.props.hotelDetails){
                    this.setState({
                        newHotel : this.props.newHotel,
                        imageUrls : this.props.hotelDetails.coverImage,
                        hotelFacilities : this.props.hotelDetails.hotelFacilitiesArray,
                        roomFacilities : this.props.hotelDetails.roomFacilitiesArray,
                        roomArray : this.props.roomArray,
                        fields : {
                        propertyName : this.props.hotelDetails.propertyName,
                        propertyType : this.props.hotelDetails.propertyType,
                        location : {
                            address : this.props.hotelDetails.location.address,
                            area : this.props.hotelDetails.location.area,
                            city : this.props.hotelDetails.location.city,
                            state : this.props.hotelDetails.location.state,
                            country : this.props.hotelDetails.location.country,
                            points : {
                                type : 'Point',
                                coordinates : [this.props.hotelDetails.location.points.coordinates[0],
                                            this.props.hotelDetails.location.points.coordinates[1]
                                            ]
                            }

                        },
                        amount : this.props.hotelDetails.amount,
                        discount : this.props.hotelDetails.discount,
                        hotelDescription : this.props.hotelDetails.hotelDescription,
                        hotelStarRating : this.props.hotelDetails.hotelStarRating,
                        roomType: this.props.hotelDetails.roomType,
                        roomCount: this.props.hotelDetails.roomCount,
                        propertyId : this.props.hotelDetails.propertyId,
                        _id  : this.props.hotelDetails._id
                        }
                    })
                }
                return true;
        }if(this.state !== nextState){
            return true
        }

        return true
    }


    getListOfRoom = () => {
        let arr = listOfRoomService.filter((el, idx , ar) => {
            return this.state.roomFacilities.indexOf(el) === -1;
        })
        return arr.map((el, idx) => {
            return(
                <option key = {idx} value = {el}>{el}</option>
            )
        })
    }
    getListOfHotel = () => {
        let arr = listOfHotelService.filter((el, idx , ar) => {
            return this.state.hotelFacilities.indexOf(el) === -1;
        })
        return arr.map((el, idx) => {
            return(
                <option key = {idx} value = {el}>{el}</option>
            )
        })
    }
    addRoom = () => {
        let newRoom = {
            roomNo  : 0,
            roomType : "NON AC",
            discount : 0,
            amount : 0,
        };
        roomID++;
        let roomArray = this.state.roomArray;
        roomArray.push(newRoom);
        this.setState({
            ...this.state,
            roomArray 
        })
    }
    removeRoom = (id) => {
        let roomArray = this.state.roomArray;
        let pos = 0;
        // roomArray.forEach((el, idx) => {
        //     if(el.id == id){
        //       pos = idx;
        //       return;
        //     }
        // });
        roomArray.splice(id , 1);
        this.setState({
            ...this.state,
            roomArray
        })
    }

    roomDetailsChanged = (event , id , index) => {
        let roomDetails = this.state.roomArray;
        let val = event.target.value;
        if(this.state.newHotel){
        if(id === "roomType"){
            roomDetails[index].roomType = event.target.value;
        }else if(id === "discount" && val >= 0){
            roomDetails[index].discount = parseFloat(event.target.value)
        }else if(id === "amount" && val >= 0){
            roomDetails[index].amount = parseFloat(event.target.value)
        }else if(id === "roomNo" && val >= 1){
            roomDetails[index].roomNo = parseInt(event.target.value)
        }
        this.setState({
            ...this.state,
            roomArray : roomDetails
        })
        }
    }
    getRoomDetails = () => {
      
        return this.state.roomArray.map((el, idx) => {
            return (
                <div className = {classes.roomDetails} key= {idx}>
                        {this.state.newHotel ? <svg onClick = {()=>this.removeRoom(idx)}>
                            <use xlinkHref = {`${sprite}#icon-plus`}></use>
                        </svg> : null}
                        <div className = {classes.inputBox}>
                            <h2>Room Type</h2>
                            <select style = {{width:"100%" ,height : "4rem", fontSize : "1.6rem", borderColor : "rgb(172, 0, 37)"}}
                                onChange = {(event)=>this.roomDetailsChanged(event, "roomType", idx)}
                            >
                                <option>Select Room Type</option>
                                {
                                    roomTypes.map((item, id) => {
                                        return(
                                            <option value = {item} key = {id} selected = {el.roomType === item} >{item}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className = {classes.inputBox} >
                            <h2>Room No</h2>
                            <Input types = "number" changed = {(event)=>this.roomDetailsChanged(event, "roomNo", idx)} val = {this.state.roomArray[idx].roomNo}/>
                        </div>
                        <div className = {classes.inputBox}>
                            <h2>Amount</h2>
                            <Input types = "number" changed = {(event)=>this.roomDetailsChanged(event, "amount", idx)} val = {this.state.roomArray[idx].amount || this.state.roomArray[idx].price}/>
                        </div>
                        <div className = {classes.inputBox}>
                            <h2>Discount</h2>
                            <Input types = "number" changed = {(event)=>this.roomDetailsChanged(event, "discount", idx)} val = {this.state.roomArray[idx].discount}/>
                        </div>
                </div>
            )
        })
    }

    updateHotel = () => {
        this.setState({
            spinner : true
        })
        const form = new FormData();
        this.state.uploadImages.forEach(el => {
            form.append('uploadImages' , el);
        })
        
        call({
            method: "post",
            url: "/owner/update-hotel",
            data: {
                fields : this.state.fields,
                roomFacilities : this.state.roomFacilities,
                hotelFacilities : this.state.hotelFacilities,
                roomArray : this.state.roomArray
            },
            withCredentials : true
          }).then(res => {
            if(res.data.status === 'done'){
            call({
                method: "post",
                url: "/owner/upload-photos",
                data: form,
                headers : {
                    'content-type' : 'mulitpart/form-data'
                },
                withCredentials : true
              }).then(result => {
                  this.setState({
                      spinner : false
                  })
                  alert('Details Uploaded succesfully')
            }).catch(err => {
                this.setState({
                    spinner : false
                })
                alert("Error while uploading photo , refresh page or try after sometime")
            })
        }
        }).catch(err => {
            this.setState({
                spinner : false
            })
        })
    }

    
    imageUplaoded = (event)=>{
        let arr = [...this.state.uploadImages];
        for(let i = 0; i < event.target.files.length ;i++){
            arr.push(event.target.files[i]);
        }
        this.setState({
            ...this.state,
            uploadImages : arr
        })
    }
    deleteImage = (idx) => {
        let imageArr = this.state.uploadImages;
        imageArr.splice(idx , 1);
        this.setState({
            ...this.state,
            uploadImages : imageArr
        })
    }
    deleteImageUrls = (idx) => {
        let imageArr = this.state.imageUrls;
        imageArr.splice(idx , 1);
        this.setState({
            ...this.state,
            imageUrls : imageArr
        })
    }
    addValues = (event ,id) => {
        if(id === 'room' && event.target.value !== 'select'){
           let arr = [...this.state.roomFacilities];
            arr.push(event.target.value);
            this.setState({
                ...this.state,
                roomFacilities : arr
            })
        }else if(id === "hotel" && event.target.value !== 'select'){
            let arr = [...this.state.hotelFacilities];
            arr.push(event.target.value);
            this.setState({
                ...this.state,
                hotelFacilities : arr
            })
        }
    }
    removeValues = (idx , id)=>{
        if(id === 'room'){
            let arr = [...this.state.roomFacilities];
            arr.splice(idx, 1);
            this.setState({
                ...this.state,
                roomFacilities : arr
            })
        }else{
            let arr = [...this.state.hotelFacilities];
            arr.splice(idx, 1);
            this.setState({
                ...this.state,
                hotelFacilities : arr
            })
        }
    }


    valueChagned = (event , id) => {
        let val = event.target.value;
        if(id === 'propertyName'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    propertyName : val
                }
            })
        }else if(id === 'propertyType'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    propertyType : val
                }
            })
        }else if(id === 'hotelDescription'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                   hotelDescription : val
                }
            })
        }else if(id === 'roomType'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                  roomType : val
                }
            })
        }
        else if(id === 'amount'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    amount: val
                }
            })
        }else if(id === 'discount'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    discount : val
                }
            })
        }else if(id === 'rooms'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    roomCount : val
                }
            })
        }else if(id === 'address'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        address : val
                    }
                }
            })
        }else if(id === 'area'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        area : val
                    }
                }
            })
        }else if(id === 'city'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        city : val
                    }
                }
            })
        }else if(id === 'state'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        state : val
                    }
                }
            })
        }else if(id === 'lat'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        points : {
                            ...this.state.fields.location.points, 
                            coordinates : [this.state.fields.location.points.coordinates[0] , val]
                        }
                    }
                }
            })
        }else if(id === 'lng'){
            this.setState({
                ...this.state,
                fields : {
                    ...this.state.fields,
                    location : {
                        ...this.state.fields.location,
                        points : {
                            ...this.state.fields.location.points, 
                            coordinates : [val , this.state.fields.location.points.coordinates[1]]
                        }
                    }
                }
            })
        }
    }
    render(){
        const imageBlock = this.state.uploadImages.map((el , idx) => {
            return <img src = {el ? URL.createObjectURL(el) : el} onDoubleClick = {() =>this.deleteImage(idx)}></img>
        });
        const myImges = this.state.imageUrls.map((el , idx) => {
            return <img src = {el} onDoubleClick = {() =>this.deleteImageUrls(idx)}></img>
        });
        let roomFacilities = this.state.roomFacilities.map((el ,idx) => {
            return <Button doubleClicked = {()=>this.removeValues(idx , "room")}>{el}</Button>
        });
        let hotelFacilities = this.state.hotelFacilities.map((el ,idx) => {
            return <Button doubleClicked = {()=>this.removeValues(idx , "hotel")}>{el}</Button>
        });;
        return(
            <div className = {classes.self}>
                <h1>
                    Hotel Details
                </h1>
                <h2>Hotel Id  : {this.state.fields.propertyId}</h2>
                <h2>Kasha Membership Id : {this.state.fields._id}</h2>
                <div className = {classes.inputs}>
                    <h1>Details</h1>
                    <div className = {classes.inputBox}>
                        <h2>Hotel Name</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "propertyName")}  val = {this.state.fields.propertyName}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Property Type</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "propertyType")} val = {this.state.fields.propertyType}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Hotel Description</h2>
                        <textarea onChange = {(event) => this.valueChagned(event , "hotelDescription")} value = {this.state.fields.hotelDescription}></textarea>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Room Type</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "roomType")} val = {this.state.fields.roomType}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Amount</h2>
                        <Input types = "number" changed = {(event) => this.valueChagned(event , "amount")} val = {this.state.fields.amount}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Discount</h2>
                        <Input types = "number" changed = {(event) => this.valueChagned(event , "discount")} val = {this.state.fields.discount}/>
                    </div>



                    <div className = {classes.inputBox} >
                        <h2>Room Facilites<i>  (Select to add & Double click on list to delete )</i></h2>
                        <select onChange = {(event)=>this.addValues(event , "room")} name="SElect"
                            style = {{width:"100%" ,height : "4rem", fontSize : "1.6rem", borderColor : "rgb(172, 0, 37)"}}                        
                         >
                         <option value = "select">Select Room Facilites</option>
                           {this.getListOfRoom()}
                        </select>

                        {/* <Input types = "text" keyPressed = {(event) => this.addValues(event , "room")}/> */}
                    </div>
                    <div className = {classes.inputBox} style = {{marginBottom : "3rem"}}>
                        {roomFacilities}
                    </div>

                    <div className = {classes.inputBox}>
                        <h2>Hotel Facilites<i>(Select to add & Double click on list to delete )</i></h2>
                        {/* <Input types = "text" keyPressed = {(event) => this.addValues(event , "hotel")}/> */}
                        <select onChange = {(event)=>this.addValues(event , "hotel")} name="SElect"
                            style = {{width:"100%" ,height : "4rem", fontSize : "1.6rem", borderColor : "rgb(172, 0, 37)"}}                        
                         >
                         <option value = "select">Select Hotel Facilites</option>
                           {this.getListOfHotel()}
                        </select>
                    </div>



                    <div className = {classes.inputBox}>
                        {hotelFacilities}
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Total Rooms Available</h2>
                        <Input types = "number" changed = {(event) => this.valueChagned(event , "rooms")} val = {this.state.fields.roomCount}/>
                    </div>
                    <hr style = {{width : "100%" , marginTop : "3rem"}}/>
                    <h1 style = {{width : "50%" , border : "none"}}>Add Rooms <i>{this.state.newHotel ? null : "( Rooms Details cannot be updated )"}</i></h1>
                    <span className= {classes.addRoomIcon}>
                    {   this.state.newHotel ?  <svg onClick = {this.addRoom}>
                            <use xlinkHref = {`${sprite}#icon-plus`}></use>
                        </svg> : null}
                    </span>
                    {this.getRoomDetails()}
                    <h1>Address</h1>
                    <div className = {classes.inputBox}>
                        <h2>Address</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "address")} val = {this.state.fields.location.address}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Area</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "area")} val = {this.state.fields.location.area}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>City</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "city")} val = {this.state.fields.location.city}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>State</h2>
                        <Input types = "text" changed = {(event) => this.valueChagned(event , "state")} val = {this.state.fields.location.state}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Country</h2>
                        <Input types = "text" val = "INDIA"  val = {this.state.fields.location.country}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Latitude</h2>
                        <Input types = "number" changed = {(event) => this.valueChagned(event , "lat")} val = {this.state.fields.location.points.coordinates[1]}/>
                    </div>
                    <div className = {classes.inputBox}>
                        <h2>Longitude</h2>
                        <Input types = "number" changed = {(event) => this.valueChagned(event , "lng")} val = {this.state.fields.location.points.coordinates[0]}/>
                    </div>
                    {!this.props.register ? (<h1>Hotel Images</h1>) : null}
                    {!this.props.register ? 
                        (<div className = {classes.images}>
                        {myImges}
                        </div>) :
                        null
                    }
                    
                    {!this.props.register ? (<div className = {classes.inputBox}>
                        <h2>Upload Photo <i>(Double click on Image to delete)</i></h2>
                        <input type = "file" accept = "image/*" onChange = {this.imageUplaoded} multiple/>
                       
                    </div>) : null}

                    {!this.props.register ? (<div className = {classes.images}>
                        {imageBlock === null ? null : imageBlock}
                    </div>) : null}
                    {this.state.newHotel ? (
                        <Button buttonClicked = {()=>this.props.getData({
                            fields : this.state.fields,
                            uploadImages : this.state.uploadImages,
                            roomFacilities : this.state.roomFacilities,
                            hotelFacilities : this.state.hotelFacilities,
                            roomArray : this.state.roomArray
                        })}>
                           Register Hotel
                        </Button>
                    ) : (
                        <Button buttonClicked = {this.updateHotel}>
                            Update Details
                        </Button>
                    )}
                    
                </div>
                {this.state.spinner ? <Spinner /> : null}
            </div>
        )

    }

}


export default HotelDetails;