import { useEffect, useState } from "react";
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
        <>
            <td className="visually-hidden">{props.users.pid}</td>
            <td>{props.users.pid}</td>
            <td style={{ width: "20%" }}>
                <img
                    style={{ height: "130px", margin: "auto" }}
                    src={imgUrl}
                    alt=""
                />
            </td>
            <td style={{ width: "15%" }}>{props.users.breedtypeid.breedname}</td>
            <td>{props.users.age}</td>
            <td>{props.users.price}</td>

            <td>{props.users.breedtypeid.typeid.typename}</td>
        </>
    )
}
export default PetDisplay;