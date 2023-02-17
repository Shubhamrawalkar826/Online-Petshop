
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import PetownerregistrationAPI from '../services/PetownerregistrationAPI';
import CustNavBar from './CustNavBar'
import PetDisplay from './PetDisplay'
import Practice2 from './Practice2';

function ViewOwnerPets() {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState('');
    const [upid, setUpid] = useState('');

    useEffect(() => {
        reloadUsersList();
        if (sessionStorage.getItem("role") == null) {
            window.location = "/";
        }

        return () => {
            console.log('owner pets visited');
        }
    }, []);

    function reloadUsersList() {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        let custid = cust.cid;
        PetownerregistrationAPI.fetchAllOwnerPets(custid)
            .then((resp) => {

                setUsers(resp.data)
                setMessage("Owner pets rendered successfully")

                console.log(message);
            });
    }



    function onDeletePet(pid) {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            PetownerregistrationAPI.deleteOwnedPet(pid)
                .then(res => {
                    setMessage('Pet deleted successfully.');
                    console.log(message, 'Pet ID: ', pid);
                    setUsers(users.filter(users => users.pid !== pid));
                })
        } else
            console.log("request cancelled");
    }

    function handleClose() {
        setShow(false)
    }

    function handleshow(value) {
        setShow(true); setUpid(value);
    }

    function onChange(e) {
        setPrice(e.target.value);
    }

    function saveChanges(val, upid) {
        console.log(val, upid);
        PetownerregistrationAPI.updateOwnedPet(val, upid)
            .then(res => {
                setMessage('Pet updated successfully.');
                setPrice('');

                console.log(message, 'Pet ID: ', upid);
                reloadUsersList();
            })
        setShow(false);
    }

    return (
        <>
            <div className="pb-4" >
                <CustNavBar />
                {users.length === 0 ? <h3 className='text-light'>No Pets Sold yet</h3> :
                    <div> <h3 className='text-light'>Your Pets For Sell</h3>
                        <div className='mx-4'>
                            <Row>

                                {
                                    users.map(
                                        users =>
                                            <Card className="mx-2 my-2 py-2" style={{ width: '18rem' }}>
                                                <Col key={users.pid}>

                                                    <Practice2 users={users}>
                                                    </Practice2>
                                                    <div className='mt-2'>
                                                        <Button
                                                            onClick={() => { handleshow(users.pid) }}>update</Button><Button className="btn-danger mx-2" onClick={() => { onDeletePet(users.pid) }}>delete</Button>

                                                    </div>
                                                </Col>
                                            </Card>

                                    )
                                }</Row></div>
                    </div>
                }<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Updating price for Pid: {upid}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="number" className="form-control" placeholder="Enter Price " name="price" value={price} onChange={onChange} required />
                        <Button variant="primary" onClick={() => { saveChanges(price, upid) }}>
                            Save Changes
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ViewOwnerPets




