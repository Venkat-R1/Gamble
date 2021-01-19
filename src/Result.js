import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
export default class Result extends Component{
    constructor(props){
        
        super(props);
        this.state={
            winner : this.props.location.state.winner,
            players : this.props.location.state.players,
            wins:this.props.location.state.wins,
            lost:this.props.location.state.lost,
            num:this.props.location.state.winningNumber
        }
        console.log(this.props.location.state);
    }
    render(){
        const fiveCards = [];
        for(let i=0;i<5;i++){
            fiveCards.push(this.state.players[i])
        }
        const fourCards = [];
        for(let j=5;j<9;j++){
            fourCards.push(this.state.players[j])
        }
        return(<div className="page2">
            
            <div className ="row">
                {fiveCards.map(player=>(
                    <div className="col-lg-2">
                        <div className = {this.state.winner == player.id ? "winner-card": "loser-card"}>
                                <img className="card-img" src={player.img} />
                                <p className="in">{player.name.substring(0,12)}</p>
                                <p className="in"> level &nbsp;{player.level}</p>
                                <p ><i class="fas fa-circle-notch pad"></i> {player.price}<i class="fas fa-trophy pad"></i>{this.state.wins[player.id]} </p>
                                <p> <i class="fas fa-arrow-up pad"></i>{Math.floor(Math.random()*5)+1}</p>
                                <p className={this.state.winner == player.id ? "winner-result": "loser-result"}>{this.state.winner ==player.id ? "Winner":"Lost"}</p>
                        </div>
                    
                    </div>))}
                
            </div>
            <div className="row circle1">
                <h1> {this.state.num} </h1>
            </div>
            <div className ="row">
                {fourCards.map(player=>(
                <div className="col-lg-2">
                    <div className = {this.state.winner == player.id ? "winner-card": "loser-card"}>
                                <img className="card-img" src={player.img} />
                                <p className="in">{player.name.substring(0,12)}</p>
                                <p className="in"> level &nbsp;{player.level}</p>
                                <p><i class="fas fa-circle-notch pad"></i> {player.price}<i class="fas fa-trophy pad"></i>{this.state.wins[player.id]} </p>
                                <p> <i class="fas fa-arrow-up pad"></i>{Math.floor(Math.random()*5)+1}</p>
                                <p className={this.state.winner == player.id ? "winner-result": "loser-result"}>{this.state.winner ==player.id ? "Winner":"Lost"}</p>
                    </div>
                </div>))}
                
            </div>
            
           
            <Link to="/"><button className="btn btn-dark button">BACK</button></Link>
        </div>)
        
    }
}