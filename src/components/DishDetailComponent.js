import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export class DishDetail extends Component{

    componentDidMount(){
        console.log("Dish Component componentDidMount invoked")
    }

    componentDidUpdate(){
        console.log("Dish Component componentDidUpdate invoked")
    }

    renderDish(dish) {
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
    }
    
    renderComments(comments) {
        if(comments !=null){
            const comment = comments.map((comment) =>{
                return(
                    <ul key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </ul>
                    
                );
            })
            return(
                <div>{comment}</div>
            );
        } else {
            return(
                <div></div>
            )
        }
        
        
     }

    render(){
        console.log("Dish Component render invoked")
            if(this.props.dish !=null){
                return(
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                {/* dish */}
                                {this.renderDish(this.props.dish)}
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                {/* comments */}
                                <h4>Comments</h4>
                                {this.renderComments(this.props.dish.comments)}
                            </div>
                        </div>
                    </div>             
                )
            }
            else {
                return(
                    <div></div>
                )
            }
        
    }
}