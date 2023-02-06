import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import CustomerregistrationAPI from '../services/CustomerregistrationAPI';
import CustNavBar from './CustNavBar';
import PetDisplay from './PetDisplay';

const SearchPet = () => {

    const [petlist, setPetlist] = useState([]);
    const [ptype, setPtype] = useState(undefined);
    const [typelist, setTypelist] = useState([]);
    const [flag, setFlag] = useState(true);
    const [pets, setPets] = useState([]);
    const [message, setMessage] = useState('');



    const handleChange = (event) => {

        setPtype(event.target.value);
        setFlag(false);
        petlistdetails(event.target.value);
        console.log(event.target.value);
    }

    useEffect(() => {
        getallpetlist();
        reloadpettypelist();
        if (sessionStorage.getItem("role") == null) {
            window.location = "/"
        }

        return () => {
            console.log('search pet visited');
        }
    }, [])

    const getallpetlist = () => {
        CustomerregistrationAPI.getallpets().then((resp) => {
            setPetlist(resp.data);

        })
    }

    const reloadpettypelist = () => {
        CustomerregistrationAPI.fetchAllpettype().then((resp) => {

            setTypelist(resp.data)

            console.log(resp.data);
        });
    }

    const petlistdetails = (val) => {
        CustomerregistrationAPI.fetchAllpets(val).then((resp) => {

            setPets(resp.data)

            console.log(resp.data);
        });
    }

    const onAddtocart = pet => {
        console.log(pet);
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        let custid = cust.cid;
        let cart = {
            pid: pet.pid,
            totalprice: pet.price,
            breed: pet.breedtypeid.breedname,
            cid: custid
        };
        CustomerregistrationAPI.addcartitems(cart)
            .then(res => {
                setMessage("Order added successfully.")
                console.log(message, 'pet ID: ', cart.pid);

                setPets(pets.filter(pets => pets.pid !== cart.pid))
                setPetlist(petlist.filter(pets => pets.pid !== cart.pid))

            })
    }

    return (
        <div>
            <CustNavBar />
            <div className='container'>

                {typelist.length === 0 ? "" :
                    <Row className='justify-content-md-end'><Col md="auto">

                        <Form.Select style={{ width: "15rem" }} value={ptype} onChange={handleChange}>
                            <option className='text-center' selected disabled>Search for pet</option>
                            {typelist.map((typelist) => (<option key={typelist.typeid} value={typelist.typeid}>{typelist.typename}</option>))}
                        </Form.Select>
                    </Col></Row>

                }
            </div>
            <div className="container my-4">
                {pets.length === 0 ? " " :
                    <div>

                        <Row>
                            {
                                pets.map(
                                    users =>
                                        <Card className="mx-2 my-3 py-2" style={{ width: '16rem' }}>
                                            <Col key={users.pid}>

                                                <PetDisplay users={users}>
                                                </PetDisplay>
                                                <div className='my-2'>

                                                    <Button className='px-4' onClick={() => { onAddtocart(users) }}>add to cart</Button>
                                                </div>
                                            </Col>
                                        </Card>

                                )
                            }
                        </Row>
                    </div>
                }
            </div>{flag ?
                <div className="container my-4">
                    {petlist.length === 0 ? <h4>No Pets in Store</h4> :
                        <div>

                            <Row>
                                {
                                    petlist.map(
                                        users =>
                                            <Card className="mx-2 my-3 py-2" style={{ width: '16rem' }}>
                                                <Col key={users.pid}>

                                                    <PetDisplay users={users}>
                                                    </PetDisplay>
                                                    <div className='my-2'>
                                                        <Button className='px-4' onClick={() => { onAddtocart(users) }}>add to cart</Button>
                                                    </div>
                                                </Col>
                                            </Card>

                                    )
                                }
                            </Row>
                        </div>
                    }
                </div> : ''}
        </div>
    )
}

export default SearchPet
