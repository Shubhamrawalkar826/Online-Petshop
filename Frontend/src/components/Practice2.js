import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
function PetDisplay(props) {

    const data = props.users.image;
    const [imgUrl, setImgUrl] = useState();


    const getImg = async () => {
        const response = await fetch(`data:image/jpeg;base64,${data}`);
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            setImgUrl(base64data);
        };
    };

    useEffect(() => {
        getImg();
    }, []);

    return (
        <div  >

            <Card.Img className="pt-2" variant="top" style={{ height: "130px", width: "90%", margin: "auto" }} src={imgUrl} />
            <Card.Title>{props.users.breedtypeid.breedname}</Card.Title>
            <Card.Text>
                <h6>Age: {props.users.age} | Type: {props.users.breedtypeid.typeid.typename}</h6>
                <h6></h6>
                <h5>₹{props.users.price} </h5>
            </Card.Text>


        </div >
    )
}
export default PetDisplay;