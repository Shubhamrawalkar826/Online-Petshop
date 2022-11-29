import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import CustomerregistrationAPI from '../services/CustomerregistrationAPI';
import CustNavBar from './CustNavBar'

export default class PetRegisteration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bredname: '',
            typelist: [],
            breedlist: [],
            pettypeid: null,
            breedid: null,
            price: null,
            image: null,
            age: null,
            custid: null,
            message: null
        };
        this.reloadpettypelist = this.reloadpettypelist.bind(this);
        this.breedtypelist = this.breedtypelist.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewBreed = this.addNewBreed.bind(this);
    }

    handleChange(event) {
        this.setState({
            pettypeid: event.target.value
        });
        this.breedtypelist(event.target.value);
    }

    componentDidMount() {
        if (sessionStorage.getItem("role") == null) {
            window.location = "/"
        }
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        this.setState({
            custid: cust.cid
        });
        this.reloadpettypelist();

    }

    reloadpettypelist() {
        CustomerregistrationAPI.fetchAllpettype().then((resp) => {
            this.setState({
                typelist: resp.data
            })
            console.log(resp.data);
        });
    }

    breedtypelist(id) {
        CustomerregistrationAPI.fetchAllbreedtype(id).then((resp) => {
            this.setState({
                breedlist: resp.data
            })
            console.log(resp.data);
        });
    }


    ownerreg = e => {

        e.preventDefault();

        var formData = new FormData();
        formData.append("image", document.getElementById("image").files[0])
        formData.append("breedtypeid", this.state.breedid)
        formData.append("typeid", this.state.pettypeid)
        formData.append("cid", this.state.custid)
        formData.append("age", this.state.age)
        formData.append("price", this.state.price)

        if (this.state.age === '') {
            toast.error("Please enter age", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        if (this.state.price === '') {
            toast.error("Please enter price", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }

        fetch('http://localhost:5010/savePet',
            {
                method: "POST", body: formData
            })
            .then((res) => {
                return res.json();
            }).then((res) => {
                this.setState({
                    message: 'registration successful.',
                    pettypeid: '',
                    breedid: '',
                    image: '',
                    age: '',
                    price: ''
                });
                console.log(res);
                toast.success('registration successful.');
            });


    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    addNewBreed(ptypeid) {
        if (this.state.bredname === '') {
            toast.error("Please enter breedname", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        console.log(ptypeid);
        let breedtypeinfo = {
            breedname: this.state.bredname,
            typeid: ptypeid
        }
        CustomerregistrationAPI.addbreedtype(breedtypeinfo).then((res) => {
            toast.success("Breed Added Successfully");
            console.log(res.data);
            this.setState({
                breedid: res.data.breedtypeid
            })
            console.log(res.data.breedtypeid);
        }).catch((error) => {
            console.log(error.response.data);
            toast.error(error.response.data, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
        })
    }

    render() {
        return (
            <div className='overflow-hidden'>
                <CustNavBar />
                <Container className='rounded bg-light pt-2' style={{ width: "30vw" }}><div>
                    <h4 className="mt-2">Pet Registration</h4>
                    {this.state.typelist.length === 0 ? <h4 className='text-light'>Nothing in database</h4> :
                        <Form>

                            <Form.Select value={this.state.pettypeid} onChange={this.handleChange}>
                                <option selected disabled>Select Pet Type</option>
                                {this.state.typelist.map((typelist) => (<option key={typelist.typeid} value={typelist.typeid}>{typelist.typename}</option>))}
                            </Form.Select>

                        </Form>
                    }
                    {this.state.breedlist.length === 0 ? <h6 className='text-light'>No pets in database</h6> :
                        <Form className='mt-4'>

                            <Form.Select name="breedid" value={this.state.breedid} onChange={this.onChange}>
                                <option selected disabled>Select Breed Type</option>
                                <option>other</option>
                                {this.state.breedlist.map((breedlist) => (<option key={breedlist.breedtypeid} value={breedlist.breedtypeid}>{breedlist.breedname}</option>))}
                            </Form.Select>

                        </Form>
                    }{this.state.breedid === "other" ? <Form><Form.Control className='my-2' name="bredname" type="text" value={this.state.bredname} onChange={this.onChange} placeholder="Enter new breedtype"></Form.Control><Button onClick={() => this.addNewBreed(this.state.pettypeid)}>Add new breed</Button></Form> : ""}</div>
                    <Form className="container bg-light my-4">
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control className="text-center" id="image" name="image" type="file" value={this.state.image} onChange={this.onChange} placeholder="choose image" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control className="text-center" name="age" type="number" value={this.state.age} onChange={this.onChange} placeholder="Enter Age" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control className="text-center" name="price" type="number" value={this.state.price} onChange={this.onChange} placeholder="Price" />
                        </Form.Group>
                        <h5 className="text-light">{this.state.message}</h5>
                        <Button className="mb-4" onClick={this.ownerreg} variant="primary" >
                            Register
                        </Button>
                        <ToastContainer />
                    </Form>
                </Container>
            </div>
        )
    }
}
