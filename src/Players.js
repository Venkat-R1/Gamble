import React,{Component} from "react";
import Axios from 'axios';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import DataTable from "react-data-table-component";




const columns = [
      {
        name: "Name",
        selector: "name"
      },
      {
        name: "Level",
        selector: "level"
      },
      {
        name: "Avatar",
        cell:row =><img src={row.img} className="table-img" />
      },
      {
        name: "Bet",
        selector: "bet",
        sortable: true
      },
      {
        name: "Wins",
        selector: "wins"
      },
      {
        name: "Lost",
        selector: "lost"
      },
      {
        name: "Price",
        selector: "price",
        sortable: true
      }
];

const customStyles ={
  rows:{
    style:{
      backgroundColor:"#d0e8f2"
    }
  },
  headRow:{
    style:{
      backgroundColor:"#d0e8f2"
    }
  },
  pagination:{
    style:{
      backgroundColor:"#d0e8f2"
    }
  },
  heading:{
    style:{
      backgroundColor:"#d0e8f2"
    }
  }

}
var wins = new Array(30).fill(0);
var lost = new Array(30).fill(0);
  
export default class Player extends Component{

    constructor(props){
        super(props);
        this.state = {
            players:[],
            winner:'',
            losers:[],
            selectable:true,
            selectedRows:[],
            level:[]
        }
        this.onClick = this.onClick.bind(this);
        this.handelRowClick = this.handelRowClick.bind(this);
    }

     componentDidMount(){
        const data =[]
         Axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json")
         .then(res =>{
         this.setState({players:res.data})
        
        for(let i=0;i<this.state.players.length;i++){
            const Name = this.state.players[i].Name;
            const Price = this.state.players[i].Price;
            const Bet = this.state.players[i].Bet;
            const Img = this.state.players[i]["Profile Image"];
            const randomLvl = Math.floor(Math.random()*14) + 1;
            console.log(randomLvl)
            this.setState(prevState=>({level:[...prevState.level,randomLvl]}));
            data.push({
                "id":i,
                "name":Name,
                "price":Price,
                "bet":Bet,
                "img":Img,
                "wins":wins[i],
                "lost":lost[i],
                "level":this.state.level[i]
            })
        }
        this.setState({data:data})
        console.log(data)
      })
    }
  
    handelRowClick = state => {
      
      if(state.selectedCount >= 9){
        this.setState({selectable:false});
        
      }
      if(state.selectable < 9){
        this.setState({selectable:true})
      }
      this.setState({ selectedRows: state.selectedRows });
    }

    onClick = (e) =>{
      
      let number = Math.floor(Math.random()*9 +1);
      console.log(number);
      for(let i=0; i<9;i++){
        if(Number(this.state.selectedRows[i].bet) === number){
          const won = this.state.selectedRows[i].id;
          wins[won] += 1;
          const price = Number(this.state.selectedRows[i].price)*2
          this.setState(prevState =>({
            players:prevState.players.map(obj =>(obj.id === won? Object.assign(obj,{price:price}):obj))
          }));
          this.setState({winner:won},()=>{
            console.log(this.state);
            this.props.history.push({
              pathname: '/result',
              state: { winner:this.state.winner, players:this.state.selectedRows, winningNumber:number, wins:wins, lost:lost}
            })
          });
          
         
          
          console.log("winnner is " + this.state.selectedRows[i].name);
        }else{
          lost[this.state.selectedRows[i].id] += 1;
          this.setState(prevState =>({...prevState,lost}))
          this.setState(prevState=>({losers:[...prevState.losers,this.state.selectedRows[i]]}))
        }
      
      }
      
      
    }


    render(){
        return(
        <div>
        
            <div className="row">
            {/* selected players */}
              <div className="col-lg-2 selections">
                {this.state.selectedRows.map(selected =>(<h2>{selected.name}</h2>))}
                <button className="btn btn-dark button" onClick={this.onClick}>START</button>
              </div>
              <div className="col-lg-10">
                <h2 className ="heading">select playing 9</h2>
                <DataTableExtensions
                columns={columns}
                data={this.state.data}
                print={false}
                export ={false}
                              
                >
                  <DataTable
                    className="container"
                    keys="id"
                    noHeader
                    pagination
                    onSelectedRowsChange={this.handelRowClick}
                    selectableRows = {this.state.selectable }
                    customStyles={customStyles}
                  
                />
              </DataTableExtensions>
              </div>
            </div>
            
            
        </div>)
    }

}


  

  
      
  
     
  