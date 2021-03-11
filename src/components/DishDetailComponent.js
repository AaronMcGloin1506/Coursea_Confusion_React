import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

export class DishDetail extends Component{


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
                    <ul>
                        <li>{comment.comment}</li>
                        <li>{comment.author} {comment.date}</li>
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
            if(this.props.dish !=null){
                return(
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
                                
                )
            }
            else {
                return(
                    <div></div>
                )
            }
        
    }
}