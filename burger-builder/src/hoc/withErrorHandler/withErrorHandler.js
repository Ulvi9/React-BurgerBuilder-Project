import React,{Component} from 'react';
import Aux from "../Auxilliary/auxilliary";
import Modal from "../../components/UI/Modal/Modal"
const withErrorHandler = (WrappedComponent,axios) => {

    return class extends Component{
        state={
            error:null
        }
        componentWillMount() {
           axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
           axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            })
        };

        confirmedHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.confirmedHandler}>
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }

    }
};

export default withErrorHandler;
