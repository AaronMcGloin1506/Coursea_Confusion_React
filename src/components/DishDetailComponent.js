import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,  Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control , LocalForm, Errors, controls } from 'react-redux-form'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length; // checks to see if value is greater than 0
const maxLength = (len) => (val) => !(val) || (val.length <= len); //insures that the length less than or equal to specified length 
const minLength = (len) => (val) => (val) && (val.length >= len); //insures that the length greater than or equal to specified length 




    function RenderDish({ dish }) {
            return(
                <Card>
                    <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
    }
    
    function RenderComments({ comments, addComment, dishId }) {

        
        if(comments !=null){
            const comment = comments.map((comment) =>{
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                    
                );
            })
            return(
                <div>
                    {comment}
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }
        
        
    }

    class CommentForm extends Component{

        constructor(props){
            super(props);
    
            this.state ={ 
                isModalOpen: false
            }
        
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit(values){
            this.toggleModal();
            alert('Current State is: ' + JSON.stringify(values));
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
                <div>
                <Button className="fa fa-pencil fa-lg text-secondary"  color="white" onClick={this.toggleModal}> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit} className="p-3">
                        <Row className="form-group">
                            <Label htmlfor="rating">Rating</Label>
                        </Row>
                        <Row className="form-group">
                            <Control.select model=".rating" id="rating" name="rating" 
                                className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                        </Row>

                        <Row className="form-group">
                            <Label htmlfor="author">Your Name</Label>
                        </Row>
                        <Row className="form-group">
                            <Control.text model=".author" id="author" name="author" 
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(2), maxLength: maxLength(15)
                                }} />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}    
                            />

                        </Row>

                        <Row className="form-group">
                            <Label htmlfor="comment">Comment:</Label>
                        </Row>
                        <Row className="form-group">
                            <Control.textarea rows={5} model=".comment" id="comment" name="comment" 
                                className="form-control" />
                        </Row>

                        <Row className="form-group">
                        <Col>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
            )
        }
    }
    
    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {/* dish */}
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {/* comments */}
                            <h4>Comments</h4>
                            <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id} />
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
    
    export default DishDetail;